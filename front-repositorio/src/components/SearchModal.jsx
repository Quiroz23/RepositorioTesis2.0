import  { useEffect, useState } from "react";
import { getAllTesis } from "../api/tesis.api";
import CardTesis from "./CardTesis";
import { Link } from 'react-router-dom'
const SearchModal = ({ isOpen, onClose, userData}) => {

  const [ searchTesis, setSearchTesis ] = useState()
  const [ tesisAll, setTesisAll ] = useState()
  const [resultadosDeBusqueda, setResultadosDeBusqueda] = useState([]);


  useEffect(() => {
    async function loadTesis() {
      try {
        const res = await getAllTesis();
        console.log('Respuesta de getAllTesis:', res.data);
        setTesisAll(res.data);
      } catch (error) {
        console.error('Error al obtener tesis:', error);
      }
    }
    loadTesis();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (searchTesis !== '' && Array.isArray(tesisAll)) {
      const resultados = tesisAll.filter((tesis) => {

        const titulo = tesis.titulo_tesis &&
          tesis.titulo_tesis.toLowerCase().includes(searchTesis.toLowerCase());

        const creador = tesis.nombre_usuario &&
          tesis.nombre_usuario.toLowerCase().includes(searchTesis.toLowerCase());

        const fecha = tesis.fecha_creacion &&
          tesis.fecha_creacion.includes(searchTesis);

        return titulo || creador || fecha;
      });
  
      setResultadosDeBusqueda(resultados);
      console.log('Resultados de la búsqueda:', resultados);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center  ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="modal-overlay absolute inset-0 -z-20 bg-red-900 opacity-50 "
        onClick={onClose}
      >

      </div>
      <div 
      className="modal-container mt-12 bg-white w-1/2 p-4 rounded-xl shadow-2xl h-[80%]">
        <button 
        className="absolute top-0 right-0 p-3" 
        onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white bg-red-500 rounded-full hover:bg-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          </button>
          <form onSubmit={handleSubmit} className="flex justify-center pt-12">
            <input 
            type="text" 
            placeholder="Titulo Tesis/Nombre Autor/ Mes o Año" 
            className="w-[60%]  bg-gray-100 outline-red-700 rounded-full text-center text-gray-800 text-lg placeholder:text-md font-semibold custom-placeholder-gray outline-none hover:bg-red-600 transition duration-300 hover:" 
            value={searchTesis} 
            onChange={(e) => setSearchTesis(e.target.value)}  
            />
            <button 
            type="submit" 
            className="bg-red-600 hover:bg-gray-700 transition-all duration-300  text-white p-2 rounded-full ml-3">
              <svg 
              width="38px" 
              height="38px" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none">
                <path 
                fill="#ffffff" 
                fillRule="evenodd" 
                d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"></path>
              </svg>
            </button>
          </form>

          <div className="mt-2 overflow-y-scroll h-[70%] no-scrollbar">
            <section className="w-full y-full mt-5 ">
            
              {resultadosDeBusqueda.map((resultado, index) => (
                <Link to={`/PreviewTesis/${userData.id}/${resultado.id}` } key={index}>
                  <CardTesis  titulo={resultado.titulo_tesis} creador={resultado.nombre_usuario} apellido={resultado.apellido_paterno} fecha={resultado.fecha_creacion} id={resultado.id} />
                </Link>
              ))}
            
            
            
              {resultadosDeBusqueda.length === 0 && (
                <p className="text-black text-xl  text-center">No se encontraron resultados acorde a tu busqueda.</p>
              )}
            </section>
          </div>
      </div>
    </div>
  );
};

export default SearchModal;
