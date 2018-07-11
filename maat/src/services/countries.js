import axios from 'axios'
const baseUrl = 'http://restcountries.eu/rest/v2/all'

const getAll = () =>
    returnPayload(axios.get(baseUrl))

const returnPayload = (request) =>
    request.then(response => response.data)

export default { getAll }