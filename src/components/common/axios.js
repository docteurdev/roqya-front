import Axios from 'axios'
export const axios= Axios.create({baseURL: "http://localhost:3001/",
headers:{Auth:"interaction with roqya-backend"},
timeout: 3000
})