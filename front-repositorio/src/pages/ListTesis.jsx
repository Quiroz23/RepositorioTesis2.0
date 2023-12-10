import { useEffect, useState } from "react";
import { getAllPeticiones } from "../api/peticiones.api";
import { PeticionesCard } from "../components/PeticionesCard";



export const ListTesis = () => {
  const [peticiones, setPeticiones] = useState(null);

  useEffect(() => {
    async function loadPeticionesData() {
      const rest = await getAllPeticiones();
      setPeticiones(rest.data);
    }
    loadPeticionesData();
  }, [])

  const peticionesEnEspera = peticiones ? peticiones.filter(peticion => peticion.estado === "enEspera") : null;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Administración de Solicitudes
      </h1>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre Usuario</th>
              <th className="py-3 px-6 text-left">Nombre Tesis</th>
              <th className="py-3 px-6 text-center">Estado</th>
              <th className="py-3 px-6 text-center">Fecha de solicitud</th>
              <th className="py-3 px-6 text-center">Motivo solicitud</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
           

            {peticionesEnEspera && peticionesEnEspera.length > 0 ? (
              peticionesEnEspera.map((resultado, index) => (
                <PeticionesCard data={resultado} key={index} />
              ))
            )  : (
              <tr>
                <td colSpan="6" className="py-5 text-center">
                  <p className="text-lg text-gray-500 font-bold">
                    No hay solicitudes disponibles.
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
