import axios from 'axios'

const DetallesApi = axios.create({
    baseURL: 'https://repotesis.onrender.com/detalle/api/detalle'
})

export const createDetalle = (data) => DetallesApi.post('/', data) 

export const getAllDetalles = () => DetallesApi.get('/')


export const getDetalle = (id) => DetallesApi.get(`/${id}/`)


export const updateDetalle = (id, data) => DetallesApi.put(`/${id}/` , data)
