
import { useState, useEffect } from "react";
import { getAllDetalles, updateDetalle } from "../api/detalleTesis.api";
import { CardDetallesTesis } from "../components/CardDetallesTesis";

const AdministrarTesis = ({ userData }) => {
  const [tesisList, setTesisList] = useState([]);

  useEffect(() => {
    async function loadTesis() {
      const rest = await getAllDetalles();
      console.log(rest.data);
      setTesisList(rest.data);
    }
    loadTesis();
  }, [])

  console.log(userData)

  return (
    <div className="m-5 bg-gray-300 p-20 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8">Administrar Tesis</h2>

      <table className="min-w-full bg-white border border-gray-300 shadow-lg">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="py-2 px-4 border-b text-center">Título Tesis</th>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Estado</th>
            <th className="py-2 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tesisList.map((tesis, index) => (
          <CardDetallesTesis data ={tesis} key={index} id_user={userData.id}/> 
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdministrarTesis;
