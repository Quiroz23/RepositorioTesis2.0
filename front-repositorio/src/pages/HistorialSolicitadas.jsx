import { useState, useEffect } from "react";
import { getAllPeticiones } from "../api/peticiones.api";

const HistorialSolicitadas = () => {
  const [historialPeticiones, setHistorialPeticiones] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllPeticiones();
        setHistorialPeticiones(res.data);
      } catch (error) {
        console.error("Error al cargar el historial de peticiones:", error);
      }
    };

    fetchData();
  }, []);

  const peticionesFiltradas = historialPeticiones.filter(
    (peticion) =>
      (filtroEstado ? peticion.estado === filtroEstado : true) &&
      (peticion.estado === "rechazado" || peticion.estado === "aprobado")
  );

  const handleFiltrarEstado = (estado) => {
    setFiltroEstado(estado);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Historial de Peticiones
      </h1>
      <div className="mb-4 text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => handleFiltrarEstado("aprobado")}
        >
          Aprobadas
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleFiltrarEstado("rechazado")}
        >
          Rechazadas
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
          onClick={() => handleFiltrarEstado(null)}
        >
          Mostrar Todas
        </button>
      </div>
      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
        <table className="min-w-max w-full table-auto hover:bg-gray-100 transition-colors duration-300">
          <thead>
            <tr className="bg-red-600 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-center">Nombre Tesis</th>
              <th className="py-3 px-6 text-center">Nombre Estudiante</th>
              <th className="py-3 px-6 text-center">Fecha de Solicitud</th>
              <th className="py-3 px-6 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {peticionesFiltradas.length > 0 ? (
              peticionesFiltradas.map((peticion, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100 hover:bg-gray-300" : "bg-white hover:bg-gray-400"}
                >
                  <td className="py-3 px-6 text-left">{peticion.id}</td>
                  <td className="py-3 px-6 text-center">
                    {peticion.nombre_tesis}
                  </td>
                  <td className="text-center">{peticion.nombre_usuario}</td>
                  <td className="py-3 px-6 text-center">
                    {peticion.fecha_creacion}
                  </td>
                  <td className="text-center">
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        peticion.estado === "aprobado"
                          ? "bg-green-200 text-green-600"
                          : peticion.estado === "rechazado"
                          ? "bg-red-200 text-red-600"
                          : "bg-yellow-200 text-yellow-600"
                      }`}
                    >
                      {peticion.estado === "aprobado"
                        ? "Aprobado"
                        : peticion.estado === "rechazado"
                        ? "Rechazado"
                        : "En Espera"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-5 text-center">
                  <p className="text-lg text-gray-500 font-bold">
                    No hay solicitudes disponibles en el historial.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialSolicitadas;
