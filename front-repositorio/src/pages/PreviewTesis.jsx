import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTesis } from "../api/tesis.api";
import ImagenEjemplo from "../img/ImagenPortadaEjemplo.png";
import NewPeticion from "../components/NewPeticion";
import {formatDate} from '../components/utils/FormatDate';

const PreviewTesis = ({ userData }) => {
  const params = useParams();
  const [dataTesis, setDataTesis] = useState()
  const [ openModalSolicitar, setOpenModalSolicitar ] = useState(false)

  const openModalS = () => {
    setOpenModalSolicitar(true);
  }

  const closeModalS = () => {
    setOpenModalSolicitar(false);
  }

  useEffect(() => {
    async function loadTesisData() {
      if (params.idTesis) {
        try {
          const res = await getTesis(params.idTesis);
          setDataTesis(res.data);
        } catch (error) {
          console.error("Error al cargar los datos de la tesis:", error);
        }
      }
    }

    loadTesisData();
  }, [params.idTesis]);

  if (!dataTesis) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="m-3 px-20 py-10 h-[100%] bg-white rounded-xl shadow-lg flex content-center justify-center">
      <div className="  w-[70%] grid grid-cols-2 grid-rows-3 gap-5 justify-center content-center">
        <section className="row-span-2 col-span-1">
          <img
            src={ImagenEjemplo}
            className="w-full h-full bg-cover shadow-xl "
            alt=""
          />
        </section>
        <section className="flex flex-col pt-2 row-span-1 font-semibold">
          <h1 className="text-4xl font-bold pb-10 font-semibold">{dataTesis.titulo_tesis}</h1>
          <h2 className="text-lg font-semibold">
            Autor de la tesis: <span className="uppercase font-normal">{dataTesis.nombre_usuario} {dataTesis.apellido_paterno}</span> 
          </h2>
          <p className="text-lg">Año de creacion: <span className="font-normal">{formatDate(dataTesis.fecha_creacion)}</span></p>
          <p className="text-lg">
            Area academica:{" "}
            <span className="font-normal">
              Informatica y telecomunicaciones
            </span>{" "}
          </p>
          <p className="text-lg">Email: <span className="text-blue-800 font-normal cursor-pointer">{dataTesis.email_academico}</span></p>
        </section>
        <section className="flex justify-end items-end">
            <button className="h-10 w-full bg-red-600 rounded-lg shadow-sm hover:bg-red-400 text-white p-2" onClick={openModalS}>Solicitar Lectura</button>
            <NewPeticion isOpenModalS={openModalSolicitar} closeModalS={closeModalS} dataTesis={dataTesis} userData={userData} />
        </section>

      </div>
    </div>
  );
};

export default PreviewTesis;
