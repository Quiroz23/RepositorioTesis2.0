
// La función para formatear la fecha
export function formatDate(fecha) {
    const dateObject = new Date(fecha);
  
    // Obteniendo los componentes de la fecha
    const dia = dateObject.getDate().toString().padStart(2, '0'); // Día con dos dígitos
    const mes = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Mes (los meses comienzan desde 0 en JavaScript)
    const año = dateObject.getFullYear();
  
    // Formateando la cadena en el formato dd-mm-yyyy
    const fechaFormateada = `${dia}-${mes}-${año}`;
  
    return fechaFormateada;
  }