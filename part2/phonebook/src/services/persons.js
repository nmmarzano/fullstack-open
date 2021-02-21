import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newPerson => axios.post(baseUrl, newPerson).then(response => response.data)

const update = (id, newPerson) => axios.put(`${ baseUrl }/${ id }`, newPerson).then(response => response.data)

const deleteOne = (id) => axios.delete(`${ baseUrl }/${ id }`).then(response => response.data)

export default {
    getAll,
    create,
    update,
    deleteOne,
}