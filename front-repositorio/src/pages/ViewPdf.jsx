import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';
import { getTesis, decryptTesis } from '../api/tesis.api';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ViewPdf = () => {
  const [numPages, setNumPages] = useState(1);
  const [dataTesis, setDataTesis] = useState(null);
  const [archivoUrl, setArchivoUrl] = useState(null);
  const [scrollPage, setScrollPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const params = useParams();

  useEffect(() => {
    async function loadTesisData() {
      try {
        if (params.idTesis) {
          const response = await getTesis(params.idTesis);
          console.log('datos', response.data);
          setDataTesis(response.data);
        }
      } catch (error) {
        console.error('Error al cargar los datos de la tesis:', error);
      }
    }

    loadTesisData();
  }, [params.idTesis]);

  useEffect(() => {
    async function decryptAndLoadPdf() {
      try {
        if (params.idTesis) {
          const blobUrl = await decryptTesis(params.idTesis);
          setArchivoUrl(blobUrl);
        }
      } catch (error) {
        console.error('Error al desencriptar la tesis:', error);
      }
    }

    decryptAndLoadPdf();
  }, [params.idTesis]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    const pageHeight = e.target.scrollHeight / numPages;
    const currentPage = Math.floor(scrollPosition / pageHeight) + 1;
    setScrollPage(currentPage);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  return (
    <div className="grid row-2 bg-gray-800 justify-center select:none rounded-md" onContextMenu={(e) => e.preventDefault()}>
      <div className="flex justify-center mt-4">
        <button onClick={handleZoomIn} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded">
          Zoom In
        </button>
        <button onClick={handleZoomOut} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded">
          Zoom Out
        </button>
      </div>
      <div className="flex justify-end">
        <p className="text-white">
          Página {scrollPage} de {numPages}
        </p>
      </div>

      {dataTesis ? (
        <>
          {/* Aquí puedes mostrar cualquier información adicional de la tesis, como el título o el autor */}
        </>
      ) : (
        <p>Cargando datos de la tesis...</p>
      )}
      <div className="w-full mt-1 overflow-scroll overflow-x-hidden h-[600px] mb-4" onScroll={handleScroll}>
        {archivoUrl ? (
          <>
            <Document file={archivoUrl} onLoadSuccess={onDocumentLoadSuccess} onContextMenu={(e) => e.preventDefault()} className="pdf-container">
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => {
                  return (
                    <Page
                      key={page}
                      className="mb-7 w-full"
                      onContextMenu={(e) => e.preventDefault()}
                      pageNumber={page}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      scale={zoomLevel}
                    />
                  );
                })}
            </Document>
          </>
        ) : (
          <p>Archivo no disponible</p>
        )}
      </div>
    </div>
  );
};

export default ViewPdf;
