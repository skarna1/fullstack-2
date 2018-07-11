import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>
    returnPayload(axios.get(baseUrl))

const create = (newObject) =>
    returnPayload(axios.post(baseUrl, newObject))

const update = (id, newObject) =>
    returnPayload(axios.put(`${baseUrl}/${id}`, newObject))

const remove = (id) =>
    returnPayload(axios.delete(`${baseUrl}/${id}`))

const returnPayload = (request) =>
    request.then(response => response.data)


export default { getAll, create, update, remove }