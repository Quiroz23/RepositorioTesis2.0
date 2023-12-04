import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllTesis } from "../api/tesis.api";

const PerfilPage = ({ userData, opciones }) => {
  const [tesis, setTesis] = useState([]);

  useEffect(() => {
    async function loadTesis() {
      try {
        const res = await getAllTesis();
        console.log('Respuesta de getAllTesis:', res.data);
        setTesis(res.data);
      } catch (error) {
        console.error('Error al obtener tesis:', error);
      }
    }
    loadTesis();
  }, []);

  const tesisUser = tesis.filter((tesis) => tesis.id_usuario === userData.id);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded-md p-4 shadow-md">
        <div className="flex items-center">
        <svg fill="#000000" width="70px" height="70px" viewBox="-8 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" />
          </svg>
          <h2 className="text-2xl font-semibold pl-2 pt-5">{userData?.nombre_usuario}</h2>
        </div>
        <section className="pt-4 px-2">
          <p>Tipo de cuenta: <span className="font-semibold">{opciones.titulo}</span></p>
          <p className="text-blue-600 underline flex pt-2">
            <svg width="16px" height="16px" className="mt-[6px] mr-[6px]" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#130a92">
              <rect x="0" fill="none" width="20" height="20"></rect>
              <path d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79zm6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17-.3.41-.11.87.13 1.07"></path>
            </svg>
            {userData?.email_academico}
          </p>
        </section>
      </div>

      <div className="max-w-md mx-auto mt-4 bg-white rounded-md p-4 shadow-md">
        <h3 className="text-xl font-semibold">Mis tesis</h3>

        <div className="mt-2">
          {tesisUser.length > 0 ? (
            tesisUser.map((tesis) => (
              <div key={tesis.id} className="tesis-card my-2 p-4 rounded-md shadow-lg grid grid-cols-4">
                <section className="col-span-3">
                  <h3 className="text-lg font-semibold">{tesis.titulo_tesis}</h3>
                  <p className="text-gray-600">Fecha de creación: {tesis.fecha_creacion}</p>
                </section>

                <section className="flex items-center justify-end">
                  <button className="bg-blue-600 text-white font-bold p-2 rounded-md hover:bg-blue-400">
                    <Link to={`/leer-tesis/${userData.id}/${tesis.id}`}>Leer Tesis</Link>
                  </button>
                </section>
              </div>
            ))
          ) : (
            <div className="text-gray-600">No hay tesis agregadas aún. <Link className="underline text-blue-600 font-semibold" to={opciones.enlace1[1]}>Agregar Tesis</Link></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
