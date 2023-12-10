const getOpciones = (rol, idUser) => {
    let opciones = {
      titulo: 'Ingresa de forma correcta',
      home: `/homeDashboard/${idUser}`,
      enlace1: ['Ingresa de forma correcta', '/'],
      enlace2: ['Ingresa de forma correcta', '/'],
      enlaceView: ['Ingresa de forma correcta', '/'],
      enlacePerfil: ['Ingresa de forma correcta', '/'], 
    };
  
    if (rol === 'estudiante') {
        opciones.titulo = 'Estudiante';
        opciones.enlace1[0] = 'Agregar Tesis'
        opciones.enlace1[1] = `/New-tesis/${idUser}`
        opciones.enlace2[0] = 'Mis tesis'
        opciones.enlace2[1] = `/Perfil/${idUser}`
        opciones.enlaceView[0] = 'Solicitudes realizadas'
        opciones.enlaceView[1] = `/ViewTesis/${idUser}`
        opciones.enlacePerfil[0] = 'Perfil'
        opciones.enlacePerfil[1] = `/Perfil/${idUser}`
    } else if (rol === 'profesor') {
        opciones.titulo = 'Profesor';
        opciones.enlace1[0] = 'Administrar Tesis';
        opciones.enlace1[1] = `/AdministrarTesis/${idUser}` // - Arreglar url
        opciones.enlace2[0] = 'Enviar mensaje'
        opciones.enlace2[1] = `/Perfil/${idUser}` // - Arreglar url
        opciones.enlacePerfil[0] = 'Perfil'
        opciones.enlacePerfil[1] = `/Perfil/${idUser}`
        opciones.enlaceView[0] = 'Historial de tesis'
        opciones.enlaceView[1] = `/ViewTesis/${idUser}`
    } else if (rol === 'jefeCarrera') {
        opciones.titulo = 'Jefe de carrera';
        opciones.enlace1[0] = 'Administrar Solicitudes';
        opciones.enlace1[1] = `/ListTesis/${idUser}` ; // - Arreglar url
        opciones.enlace2[0] = 'Enviar mensajes'
        opciones.enlace2[1] = `/Perfil/${idUser}`// - Arreglar url
        opciones.enlacePerfil[0] = 'Perfil'
        opciones.enlacePerfil[1] = `/Perfil/${idUser}` 
        opciones.enlaceView[0] = 'Historial de solicitudes'
        opciones.enlaceView[1] = `/HistorialSolicitudes/${idUser}`
    }
  
    return opciones;
  };


export default getOpciones