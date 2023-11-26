import { useState } from "react";
import { createPeticion } from "../api/peticiones.api";

const NewPeticion = ({ isOpenModalS, closeModalS, dataTesis, userData }) => {
  const [motivoSolicitar, setMotivoSolicitar] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState(userData.nombre_usuario);

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
        className="modal-overlay absolute inset-0 bg-gray-500 -z-20 opacity-75 "
        onClick={closeModalS}
      ></div>
      <div
        className="modal-container mt-12 bg-white w-1/2 p-4 rounded-xl shadow-2xl h-[60%]"
      >
        <button
          className="absolute top-0 right-0 p-3"
          onClick={closeModalS}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
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
        <form className="flex flex-col pt-12 px-5" onSubmit={onSubmit}>
          <h2 className='text-3xl mb-5 font-semibold text-center mr-5'>Formulario para realizar solicitud tesis</h2>
          <hr />
          <div className='flex w-full mt-10'>
            <label htmlFor="" className='text-lg font-semibold mt-1'>Nombre solicitante</label>
            <input
              className='border w-[60%] p-1 ml-5 text-gray-500 rounded-sm shadow-lg'
              type="text"
              placeholder={nombreUsuario}
              value={nombreUsuario}
              disabled
            />
          </div>
          <div className='flex w-full mt-4'>
            <label htmlFor="" className='text-lg font-semibold mt-1 mr-9'>Tesis a solicitar</label>
            <input
              className='border w-[60%] p-1 ml-5 text-gray-500 rounded-sm shadow-lg'
              type="text"
              placeholder={dataTesis.titulo_tesis}
              value={dataTesis.titulo_tesis}
              disabled
            />
          </div>
          <div className='flex w-full mt-4'>
            <label htmlFor="" className='text-lg font-semibold mt-1 mr-4'>Motivo a solicitar</label>
            <textarea
              className='border w-[60%] p-1 ml-5'
              type="text"
              rows={3}
              placeholder={'a'}
              value={motivoSolicitar}
              onChange={(e) => setMotivoSolicitar(e.target.value)}
            ></textarea>
          </div>

          <section className='mt-12 flex items-center justify-center'>
            <button className='bg-red-600 text-white p-2 w-full rounded-lg shadow-lg'>Realizar solicitud</button>
          </section>
        </form>

        <section className="w-full mt-5">
        </section>
      </div>
    </div>
  );
}

export default NewPeticion;
