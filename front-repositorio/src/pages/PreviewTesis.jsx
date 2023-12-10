import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTesis } from "../api/tesis.api";
import ImagenEjemplo from "../img/ImagenPortadaEjemplo.png";
import NewPeticion from "../components/NewPeticion";
import { formatDate } from "../components/utils/FormatDate";
import { getAllPeticiones } from "../api/peticiones.api";

const PreviewTesis = ({ userData }) => {
  const { idTesis, id } = useParams();
  const [dataTesis, setDataTesis] = useState(null);
  const [openModalSolicitar, setOpenModalSolicitar] = useState(false);
  const [peticionesUsuario, setPeticionesUsuario] = useState([]);



  const openModalS = () => {
    setOpenModalSolicitar(true);
  };

  const closeModalS = () => {
    setOpenModalSolicitar(false);
  };

  useEffect(() => {
    const loadTesisData = async () => {
      try {
        const res = await getTesis(idTesis);
        setDataTesis(res.data);
      } catch (error) {
        console.error("Error al cargar los datos de la tesis:", error);
      }
    };

    if (idTesis) {
      loadTesisData();
    }
  }, [idTesis]);

  useEffect(() => {
    const loadPeticionesData = async () => {
      try {
        const res = await getAllPeticiones();
        console.log("Respuesta de getAllPeticiones:", res.data);

        // Convierte idTesis e id a números si es necesario
        const idTesisNumber = parseInt(idTesis, 10);
        const idNumber = parseInt(id, 10);

        // Filtra las peticiones con las condiciones correctas
        const peticiones = res.data.filter(
          (peticion) =>
            peticion.id_tesis === idTesisNumber && peticion.id_Usuario === idNumber
        );

        setPeticionesUsuario(peticiones);
      } catch (error) {
        console.error("Error al cargar las peticiones:", error);
      }
    };

    if (idTesis && id) {
      loadPeticionesData();
    }
  }, [idTesis, id]);

  console.log(peticionesUsuario);

  const isJefeCarreraOProfesor =
    userData &&
    (userData.rol_usuario === "jefeCarrera" ||
      userData.rol_usuario === "profesor");

  if (!dataTesis) {
    return <p>Cargando datos de la tesis...</p>;
  }

  return (
    <div className="m-3 px-20 py-10 h-[100%] bg-white rounded-xl shadow-lg flex content-center justify-center">
      <div className="w-[70%] grid grid-cols-2 grid-rows-3 gap-5 justify-center content-center">
        <section className="row-span-2 col-span-1">
          <img
            src={ImagenEjemplo}
            className="w-full h-full bg-cover shadow-xl"
            alt=""
          />
        </section>
        <section className="flex flex-col pt-2 row-span-1 font-semibold">
          <h1 className="text-4xl pb-10 font-semibold">
            {dataTesis.titulo_tesis}
          </h1>
          <h2 className="text-lg font-semibold">
            Autor de la tesis:{" "}
            <span className="uppercase font-normal">
              {`${dataTesis.nombre_usuario} ${dataTesis.apellido_paterno}`}
            </span>
          </h2>
          <p className="text-lg">
            Año de creación:{" "}
            <span className="font-normal">
              {formatDate(dataTesis.fecha_creacion)}
            </span>
          </p>
          <p className="text-lg">
            Área académica:{" "}
            <span className="font-normal">
              Informática y telecomunicaciones
            </span>{" "}
          </p>
          <p className="text-lg">
            Email:{" "}
            <span className="text-blue-800 font-normal cursor-pointer">
              {dataTesis.email_academico}
            </span>
          </p>
        </section>
        <section className="flex justify-end items-end">
          {isJefeCarreraOProfesor ? (
            <Link
              to={`/leer-tesis/${userData.id}/${dataTesis.id}`}
              className="h-10 w-full text-center bg-blue-600 rounded-lg shadow-sm hover:bg-blue-400 text-white p-2"
            >
              Leer
            </Link>
          ) : (
            <>
              {peticionesUsuario.length === 0 ? (
                <button
                  className="h-10 w-full bg-red-600 rounded-lg shadow-sm hover:bg-red-400 text-white p-2"
                  onClick={openModalS}
                >
                  Solicitar Lectura
                </button>
              ) : (
                <p className="text-lg text-gray-500 font-bold">
                  Ya has solicitado lectura para esta tesis.
                </p>
              )}
              <NewPeticion
                isOpenModalS={openModalSolicitar}
                closeModalS={closeModalS}
                dataTesis={dataTesis}
                userData={userData}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default PreviewTesis;
