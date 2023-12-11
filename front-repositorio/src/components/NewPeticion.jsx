import { useState } from "react";
import { createPeticion } from "../api/peticiones.api";

const NewPeticion = ({ isOpenModalS, closeModalS, dataTesis, userData }) => {
  const [motivoSolicitar, setMotivoSolicitar] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState(userData ? userData.nombre_usuario : '');


  const onSubmit = async () => {
    try {
      const newPeticion = {
        nombre_tesis: dataTesis.titulo_tesis,
        nombre_usuario: nombreUsuario,
        mensaje: motivoSolicitar,
        estado: "enEspera",
        id_Usuario: userData.id,
        id_tesis: dataTesis.id
      };

      const response = await createPeticion(newPeticion);

      console.log('Petition created successfully:', response.data);

    } catch (error) {
      console.error('Error creating petition:', error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center ${
        isOpenModalS ? "" : "hidden"
      }`}
    >
      <div
        className="modal-overlay absolute inset-0 -z-20 bg-red-900 opacity-50 "
        onClick={closeModalS}
      ></div>
      <div
        className="modal-container mt-12 w-[50%] h-[65%] rounded-xl shadow-md p-7  bg-white"
      >
        <button
          className="absolute top-0 right-0 p-3"
          onClick={closeModalS}
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
        <form className="grid grid-rows-4 grid-cols-2 " onSubmit={onSubmit}>
          <h2 className='col-span-2 text-3xl font-semibold text-center mr-5 '>Solicitud de lectura de tesis</h2>
          <div className='col-span-2 flex'>
            <label htmlFor="" className='text-lg font-semibold'>Nombre solicitante:</label>
            <input
              className='border w-[60%] h-[50%] p-1 ml-5 shadow-lg hover:bg-red-100 focus:outline-none focus:ring-0 focus:outline-red-500 rounded-md'
              type="text"
              placeholder={nombreUsuario}
              value={nombreUsuario}
              disabled
            />
          </div>
          <div className='col-span-2 flex w-full'>
            <label htmlFor="" className='text-lg font-semibold  mr-9'>Tesis a solicitar:</label>
            <input
              className='border w-[60%] h-[50%] p-1 ml-5 shadow-lg hover:bg-red-100 focus:outline-none focus:ring-0 focus:outline-red-500 rounded-md'
              type="text"
              placeholder={dataTesis.titulo_tesis}
              value={dataTesis.titulo_tesis}
              disabled
            />
          </div>
          <div className='col-span-2 flex w-full'>
            <label htmlFor="" className='text-lg font-semibold  mr-7'>Motivo solicitud:</label>
            <textarea
              className='border w-[60%] p-1 ml-4 hover:bg-red-100 focus:outline-none focus:ring-0 focus:outline-red-500 rounded-md'
              type="text"
              rows={3}
              placeholder={'Solicito esta tesis...'}
              value={motivoSolicitar}
              onChange={(e) => setMotivoSolicitar(e.target.value)}
            ></textarea>
          </div>

          <section className='mt-10 col-span-2 flex justify-center'>
            <button className='bg-red-600 text-white px-12 p-3 w-80% rounded-full hover:bg-gray-700 font-semibold'>Realizar solicitud</button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default NewPeticion;
