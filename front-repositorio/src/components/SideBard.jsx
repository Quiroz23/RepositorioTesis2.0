import { Link } from "react-router-dom"



const SideBard = ({ opciones }) => {
  return (
    <div className='flex flex-col justify-between bg-white rounded-md'>
        <section className='flex flex-col text-lg font-semibold '>
            <Link to={opciones.enlace} className='w-[97%] ml-1 bg-red-700 p-3 text-white hover:bg-white hover:text-black mb-4 rounded-md'>Área Personal</Link>
            <Link to={opciones.enlace1[1]} className='w-[97%] ml-1 bg-gray-200 p-3 hover:bg-red-600 hover:text-white rounded-md '>{opciones.enlace1[0]}</Link>
            <Link to={opciones.enlace} className='w-[97%] ml-1 bg-gray-200 p-3 hover:bg-red-600 hover:text-white mt-1 rounded-md '>Buscar tesis</Link>
            <Link to={'#'} className='w-[97%] ml-1 bg-gray-200 p-3 hover:bg-red-600 hover:text-white mt-1 rounded-md '>Mis peticiones</Link>
            <Link to={opciones.enlacePerfil[1]} className='w-[97%] ml-1 bg-gray-200 p-3 hover:bg-red-600 hover:text-white mt-1 rounded-md '>{opciones.enlacePerfil[0]}</Link>
        </section>
    </div>
  )
}

export default SideBard
