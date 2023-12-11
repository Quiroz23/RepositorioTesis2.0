import axios from 'axios';

const TesisApi = axios.create({
    baseURL: 'https://repotesis.onrender.com/tesis/api/tesis/',
});

export const getAllTesis = () => TesisApi.get('/tesis/');
export const getTesis = (id) => TesisApi.get(`/tesis/${id}/`);
export const updateTesis = (id, tesis) => TesisApi.put(`/tesis/${id}/` , tesis)

export const addTesisWithFile = (data) => {
    const formData = new FormData();
    formData.append('archivo', data.archivo);
    formData.append('titulo_tesis', data.titulo_tesis);
    formData.append('area_academica', data.area_academica);
    formData.append('id_usuario', data.id_usuario);
    formData.append('nombre_usuario', data.nombre_usuario);
    formData.append('apellido_paterno', data.apellido_paterno);
    formData.append('email_academico', data.email_academico);
    formData.append('fecha_creacion', data.fecha_creacion);

    return TesisApi.post('/upload/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const decryptTesis = async (id) => {
    try {
        const response = await TesisApi.get(`/desencriptar_tesis/${id}/`, {
            responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        return blobUrl;
    } catch (error) {
        console.error('Error al desencriptar la tesis:', error);
        throw error;
    }
};