import { useEffect, useState } from "react";
import { getAllPeticiones } from "../api/peticiones.api";
import { PeticionesCard } from "../components/PeticionesCard";

export const ListTesis = () => {
  const [peticiones, setPeticiones] = useState(null);

  useEffect(() => {
    async function loadPeticionesData() {
      const rest = await getAllPeticiones();
      console.log(rest.data);
      setPeticiones(rest.data);
    }
    loadPeticionesData();
  }, []);

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
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* Aquí se pueden agregar las filas con datos de las solicitudes */}

            {peticiones && peticiones.length > 0 ? (
              peticiones.map((resultado, index) => (
                <PeticionesCard data={resultado} key={index} />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-5 text-center">
                  <p className="text-lg text-gray-500 font-bold">
                    No hay solicitudes disponibles.
                  </p>
                </td>
              </tr>
            )}

            {/* Agregar más filas según sea necesario */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
