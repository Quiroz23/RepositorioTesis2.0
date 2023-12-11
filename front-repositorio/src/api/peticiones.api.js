import axios from 'axios'

const PeticionesApi = axios.create({
    baseURL: 'https://repotesis.onrender.com/peticiones/api/peticiones/'
})

export const getAllPeticiones = () => PeticionesApi.get('/')


export const getPeticion = (id) => PeticionesApi.get(`/${id}/`)

export const createPeticion = (peticion) => PeticionesApi.post('/', peticion)

export const updatePeticion = (id, peticion) => PeticionesApi.put(`/${id}/` , peticion)
