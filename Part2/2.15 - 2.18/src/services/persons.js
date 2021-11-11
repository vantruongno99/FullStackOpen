import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(res=>res.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(res=>res.data)
}

const update = (person) => {
  return axios
      .put(`${baseUrl}/${person.id}`, person)
      .then(response => response.data)
}

const Delete = (id) =>{
  return axios
  .delete(`${baseUrl}/${id}`)
  .then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update ,
  Delete : Delete
}