import { useState } from "react";
import { updatePeticion } from "../api/peticiones.api"
import DetalleModal from "./DetalleModal";


export const PeticionesCard = ({ data }) => {

  const [ openModalSolicitar, setOpenModalSolicitar ] = useState(false)

  const handleAceptar = () => {
    const newData = { ...data, estado: 'aprobado' };
    updatePeticion(data.id, newData)
      .then((response) => {
        console.log("Petición aceptada:", response.data);
        // Agrega la lógica adicional que necesites
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al aceptar la petición:", error);
        // Maneja el error
      });
  }

  const handleRechazar = () => {
    const newData = { ...data, estado: 'rechazado'};
    updatePeticion(data.id, newData)
      .then((response) => {
        console.log("Petición rechazada:", response.data);
       
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al rechazar la petición:", error);
       
      });
    
  }

  const openModalS = () => {
    setOpenModalSolicitar(true);
  }

  const closeModalS = () => {
    setOpenModalSolicitar(false);
  }
  

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
        {data.nombre_usuario}
      </td>
      <td className="py-3 px-6 font-semibold">{data.nombre_tesis}</td>
     
      
      <td className="py-3 px-6 text-center">
        <span
          className={`py-1 px-3 rounded-full text-xs ${
            data.estado === "aprobado"
              ? "bg-green-200 text-green-600"
              : data.estado === "rechazado"
              ? "bg-red-200 text-red-600"
              : "bg-yellow-200 text-yellow-600"
          }`}
        >
          {data.estado === "aprobado"
            ? "Aprobado"
            : data.estado === "rechazado"
            ? "Rechazado"
            : "En Espera"}
        </span>
      </td>
      <td className="text-center font-semibold">{data.fecha_creacion}</td>
      <td className="text-center">
        <button className="bg-blue-600 text-white font-semibold p-2 rounded-2xl hover:bg-blue-400" onClick={openModalS}>Ver motivo</button>
        <DetalleModal isOpenModalS={openModalSolicitar} closeModalS={closeModalS} detalleTesis={data.mensaje} />
      </td>

      <td className="py-3 px-6 text-center flex justify-center gap-1">
        <button
          className="p-2 bg-green-600 text-sm text-white font-semibold rounded-lg hover:bg-green-400 flex justify-center items-center"
          onClick={handleAceptar}
        >
          Aceptar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="ml-1"
          >
            <path
              d="M4 12.6111L8.92308 17.5L20 6.5"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <button
          className="p-2 bg-red-600 text-sm text-white font-semibold rounded-lg hover:bg-red-400 flex justify-center items-center"
          onClick={handleRechazar}
        >
          Rechazar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 6.707a1 1 0 00-1.414 1.414L8.586 12 3.293 17.293a1 1 0 101.414 1.414L10 13.414l4.293 4.293a1 1 0 001.414-1.414L11.414 12l5.293-5.293a1 1 0 00-1.414-1.414L10 10.586 5.707 5.293a1 1 0 00-1.414 1.414z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};
