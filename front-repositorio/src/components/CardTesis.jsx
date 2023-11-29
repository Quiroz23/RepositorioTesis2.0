import {formatDate} from './utils/FormatDate';

const CardTesis = ({ titulo, creador, id, fecha, apellido}) => {

  const fechaFormateada = formatDate(fecha);

  return (
 
    <div className="bg-gray-200 hover:bg-red-200 transition-all p-4 my-2 rounded-md shadow-lg">
      <h2 className="text-xl font-semibold">Nombre tesis: {titulo}</h2>
      <p className="text-gray-600">Autor: {creador} {apellido}</p>  
      <p className="text-gray-600">Fecha: {fechaFormateada}</p>  
    </div>
  )
}

export default CardTesis
