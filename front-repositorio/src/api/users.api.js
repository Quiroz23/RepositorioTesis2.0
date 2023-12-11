import axios from 'axios'

const UsuariosApi = axios.create({
    baseURL: 'https://repotesis.onrender.com/users/api/usuarios/'
})

export const getAllUsers = () => UsuariosApi.get('/')

export const getUser = (id) => UsuariosApi.get(`/${id}/`)



const TesisApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/users/api/tesis/'
})

export const getAllTesis = () => TesisApi.get('/')

export const getTesis = (id) => TesisApi.get(`/${id}/`)

export const createTesis = (tesis) => TesisApi.post('/', tesis)