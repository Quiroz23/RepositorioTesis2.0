import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
import { getTesis } from "../api/tesis.api";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ViewPdf = () => {
  const [numPages, setNumPages] = useState(1); // Establecer un valor inicial según sea necesario
  const [pageNumber, setPageNumber] = useState(1);
  const [dataTesis, setDataTesis] = useState(null);
  const [archivoUrl, setArchivoUrl] = useState(null);
  const params = useParams(); // Obtén los parámetros de la URL

  useEffect(() => {
    async function loadTesisData() {
      try {
        if (params.idTesis) {
          const response = await getTesis(params.idTesis);
          console.log("datos", response.data);
          setDataTesis(response.data);
          const urlSinCodificar = decodeURIComponent(response.data.archivo);
          const urlFinal = encodeURI(urlSinCodificar);
          setArchivoUrl(urlFinal);
        }
      } catch (error) {
        console.error("Error al cargar los datos de la tesis:", error);
      }
    }

    loadTesisData();
  }, [params.idTesis]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      {dataTesis ? (
        <>
          <h2>{dataTesis.titulo_tesis}</h2>
          <p>Autor: {dataTesis.nombre_usuario}</p>
        </>
      ) : (
        <p>Cargando datos de la tesis...</p>
      )}
      <h2>Documento</h2>
      <div className="flex justify-center">
        {archivoUrl ? (
          <>
            <Document file={archivoUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                onClick={handlePrevPage}
              >
                Página Anterior
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                onClick={handleNextPage}
              >
                Página Siguiente
              </button>
            </div>
          </>
        ) : (
          <p>Archivo no disponible</p>
        )}
      </div>

      <p className="mt-2">
        Página {pageNumber} de {numPages}
      </p>
    </div>
  );
};

export default ViewPdf;
