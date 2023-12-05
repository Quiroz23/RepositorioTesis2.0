import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllTesis, updateTesis } from "../api/tesis.api";

const AdministrarTesis = ({ userData }) => {
  const [tesisList, setTesisList] = useState([]);

  useEffect(() => {
    async function loadTesis() {
      const rest = await getAllTesis();
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
            <th className="py-2 px-4 border-b text-center">Email</th>
            <th className="py-2 px-4 border-b text-center">Estado</th>
            <th className="py-2 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tesisList.map((tesis, index) => (
            <tr
              key={index}
              className={`transition-all hover:bg-red-300 font-semibold`}
            >
              <td className="py-2 px-4 border-b text-center">
                {tesis.titulo_tesis}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {tesis.nombre_usuario}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {tesis.email_academico}
              </td>
              <td className={"py-2 px-4 border-b text-center font-semibold"}>
                <p
                  className={`inline-block px-2 py-1 rounded-full ${
                    tesis.estado ? "bg-green-400" : "bg-red-400 "
                  }`}
                >
                  {tesis.estado ? "Aprobada" : "Rechazada"}
                </p>
              </td>
              <td className="py-2 px-4 border-b text-center flex items-center justify-center">
                <Link
                  to={
                    userData && userData.id
                      ? `/leer-tesis/${userData.id}/${tesis.id}`
                      : "/leer-tesis/"
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 inline-block mr-1"
                  >
                    <path d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21" />
                  </svg>
                  Ver
                </Link>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md mr-2">
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="#ffffff"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                    className="w-6 h-6 inline-block mr-1"
                  >
                    <path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z" />
                    <path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z" />
                    <path d="M328 340.8l32-31.2 348 348-32 32z" />
                  </svg>
                  Rechazar
                </button>

                <button className="bg-green-600 text-white px-3 py-1 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 inline-block mr-1"
                  >
                    <path d="M8.5 12.5L10.5 14.5L15.5 9.5" />
                    <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" />
                  </svg>
                  Aprobar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdministrarTesis;
