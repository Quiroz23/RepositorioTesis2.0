import { useEffect, useState } from "react";
import { getAllPeticiones } from "../api/peticiones.api";
import { useParams, useNavigate } from "react-router-dom";

const SolicitudesRealizadas = () => {
  const [solicitudesAll, setSolicitudesAll] = useState([]);
  const [solicitudesFiltradas, setSolicitudesFiltradas] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSolicitudes() {
      try {
        const res = await getAllPeticiones();

        if (Array.isArray(res.data)) {
          console.log(res.data);

          const filtradas = res.data.filter((solicitud) => {
            console.log("Comparando:", solicitud.id_Usuario, params.id);
            return solicitud.id_Usuario.toString() === params.id.toString();
          });
          console.log("Solicitudes filtradas:", filtradas);
          setSolicitudesAll(res.data);
          setSolicitudesFiltradas(filtradas);
        } else {
          console.error("La respuesta no es una lista de objetos:", res.data);
        }
      } catch (error) {
        console.error("Error al obtener solicitudes:", error);
      }
    }

    loadSolicitudes();
  }, [params.id]);

  const handleLeerTesis = (idTesis) => {

    navigate(`/leer-tesis/${params.id}/${idTesis}`);
  };

  return (
    <div className="p-6">
    <div className="container bg-white rounded-md p-4">
      <h2 className="text-4xl font-bold mb-14 mt-3">Solicitudes Realizadas</h2>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
        {solicitudesFiltradas.map((solicitud) => (
          <div
            key={solicitud.id}
            className={`${
              solicitud.estado === "aprobado"
                ? "bg-green-100"
                : solicitud.estado === "enEspera"
                ? "bg-yellow-100"
                : solicitud.estado === "rechazado"
                ? "bg-red-200"
                : "bg-white"
            } p-6 rounded-md shadow-md`}
          >
            <p className="font-semibold">ID: {solicitud.id} </p>
            <h3 className="text-xl mb-2">
              Titulo:{" "}
              <span className="font-bold">{solicitud.nombre_tesis}</span>{" "}
            </h3>
            <p className=" font-semibold">
              Autor de la tesis: {solicitud.nombre_usuario}
            </p>

            <p
              className={`font-semibold ${
                solicitud.estado === "aprobado"
                  ? "text-green-600"
                  : solicitud.estado === "enEspera"
                  ? "text-yellow-600"
                  : solicitud.estado === "rechazado"
                  ? "text-red-600"
                  : "" // Puedes agregar más condiciones según sea necesario
              }`}
            >
              Estado: {solicitud.estado}
            </p>
            <div className="flex justify-end">
              {solicitud.estado === "aprobado" && (
                <button 
                className="bg-red-700 text-white px-5 py-3 mt-2 rounded-xl hover:bg-gray-800"
                onClick={() => handleLeerTesis(solicitud.id_tesis)}
                >
                  Leer Tesis
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SolicitudesRealizadas;
