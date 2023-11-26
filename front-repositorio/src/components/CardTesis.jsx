
const CardTesis = ({ titulo, creador, id}) => {
  return (
 
    <div className="bg-gray-200 hover:bg-gray-300 transition-all p-4 my-2 rounded-md shadow-lg">
      <h2 className="text-xl font-semibold">Nombre tesis: {titulo}</h2>
      <p className="text-gray-600">Propietario de la tesis: {creador}</p>  
    </div>
  )
}

export default CardTesis
