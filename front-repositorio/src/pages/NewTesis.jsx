import { useState } from "react";
import toast from "react-hot-toast"; // Esta importacion nos permite crear alertas
import { addTesisWithFile } from "../api/tesis.api";
import { createDetalle } from "../api/detalleTesis.api";


const NewTesis = ({ userData }) => {
  const [fecha, SetFecha] = useState("");
  const [tituloTesis, SetTituloTesis] = useState("");
  const [archivoTesis, SetArchivoTesis] = useState("");

  const {
    id,
    apellido_paterno,
    area_academica,
    nombre_usuario,
    email_academico,
  } = userData || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedFecha = new Date(fecha).toISOString().split('T')[0];
    
    
    // Validacion formulario
    if ([fecha, tituloTesis, archivoTesis].includes("")) {
      toast.error("Todos los datos son necesarios", {
        position: "top-center",
      });
    } else {
      try {
        const response = await addTesisWithFile({
          archivo: archivoTesis,
          titulo_tesis: tituloTesis,
          area_academica: area_academica,
          id_usuario: id,
          nombre_usuario: nombre_usuario,
          apellido_paterno: apellido_paterno,
          email_academico: email_academico,
          fecha_creacion: formattedFecha,
          // Agrega otros campos según tu modelo Django
        });

        toast.success("Se ha subido exitosamente", {
          position: "top-center",
        });

        console.log("Tesis agregada con éxito:", response.data)

        const idTesis = response.data.id

        console.log('Id de la tesis',idTesis)


        if (idTesis) {
          const detalleRespost = await createDetalle({
            id_Usuario: id, 
            id_tesis: idTesis,
            titulo_tesis: tituloTesis,
            nombre_autor: nombre_usuario,
            mensaje: '',
            estado: 'enEspera',
          });
        
          console.log('Detalle tesis agregado con éxito', detalleRespost.data);
        } else {
          console.error('El idTesis es nulo o indefinido.');
          // Puedes manejar este caso, mostrar un mensaje de error, etc.
        }

        // const detalleRespost = await createDetalle({
        //   id_Usuario: id,
        //   id_tesis: idTesis,
        //   titulo_tesis: tituloTesis,
        //   nombre_autor: nombre_usuario,
        //   mensaje:'',
        //   estado:'enEspera',
        // })
        // console.log('Detalle tesis agregado con exito',detalleRespost.data)

      } catch (error) {
        
        console.error("Error al agregar la tesis:", error);
        toast.error("Error al subir la tesis", {
          position: "top-center",
        });
      }
    }
  };

  const handleArchivoChange = (evento) => {
    // Cambiado para manejar el archivo en sí en lugar del valor del campo
    const nuevoArchivo = evento.target.files && evento.target.files[0];
    SetArchivoTesis(nuevoArchivo);
  };

  return (
    <div className="flex justify-center items-center w-[100%] h-screen ">
      <form
        action=""
        className="w-[50%] h-[65%] rounded-xl shadow-md p-7  bg-white"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-3xl font-bold pt-5 pl-4 text-red-950">
          Ingresar Tesis
        </h2>
        <section className="grid grid-rows-4 grid-cols-2 gap-3 pt-5 pb-5 ">
        <input
            type="text"
            placeholder="Nombre Usuario"
            className="bg-gray-200 hover:bg-red-100 text-red-950 custom-placeholder-color font-medium rounded-md pl-4 outline-none"
            value={nombre_usuario}
          />
          <input
            type="text"
            placeholder="Apellido Materno"
            className="bg-gray-200 hover:bg-red-100 custom-placeholder-color font-medium rounded-md pl-4 outline-none text-red-950 "
            value={apellido_paterno}
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-200 hover:bg-red-100 custom-placeholder-color font-medium rounded-md pl-4 outline-none text-red-950 "
            value={email_academico}
          />
          <input
            type="text"
            placeholder="Área tesis"
            className="bg-gray-200 hover:bg-red-100 text-md custom-placeholder-color font-medium rounded-md pl-4 outline-none text-red-950 "
            value={area_academica}
          />
            <input
              type="text"
              placeholder="Ingrese título tesis"
              className="col-span-1 bg-gray-200 placeholder:text-gray-400 hover:bg-red-100 placeholder:font-normal custom-placeholder-color rounded-md pl-4 focus:outline-none focus:ring-0 focus:outline-red-500"
              value={tituloTesis}
              onChange={(e) => SetTituloTesis(e.target.value)}
            />
          <input
            type="date"
            placeholder="Fecha tesis"
            className="bg-gray-200 hover:bg-red-100 rounded-md px-3 text-red-950 font-normal focus:outline-none focus:ring-0 focus:outline-red-500"
            value={fecha}
            onChange={(e) => SetFecha(e.target.value)}
          />
          <input
            type="file"
            accept=".pdf"
            placeholder=""
            className="col-span-2 text-md text-slate-500
            file:mr-4 file:py-4 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-red-50 file:text-red-700
            hover:file:bg-red-200"
            onChange={handleArchivoChange} // Cambiado para manejar archivos
          />
        </section>
        <section className="flex justify-center">
          <input
            type="submit"
            className="bg-red-600 text-white p-4 rounded-full hover:bg-gray-700 px-12 font-semiboldbold"
          />
        </section>
      </form>
    </div>
  );
};

export default NewTesis;
