 
const CardTesisPerfilPage = ({ tesis }) => {

    const [id, titulo_tesis, nombre_usuario, fecha_creacion ] = tesis

    if (!tesis || !tesis.length) {
        return (
          <div className="mt-4">
            <p>No hay tesis disponibles para mostrar.</p>
          </div>
        );
      }

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{titulo_tesis}</h2>
      <p className="text-gray-600 mb-2">ID: {id}</p>
      <p className="text-gray-600 mb-2">Autor: {nombre_usuario}</p>
      <p className="text-gray-600 mb-2">Fecha: {fecha_creacion}</p>
      <p className="text-gray-800">Descripción:</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

export default CardTesisPerfilPage;
