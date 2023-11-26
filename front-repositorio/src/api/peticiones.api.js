import axios from 'axios'

const PeticionesApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/peticiones/api/peticiones/'
})

export const getAllPeticiones = () => PeticionesApi.get('/')


export const getPeticion = (id) => PeticionesApi.get(`/${id}/`)

export const createPeticion = (peticion) => PeticionesApi.post('/', peticion)

export const updatePeticion = (id, peticion) => PeticionesApi.put(`/${id}/` , peticion)
