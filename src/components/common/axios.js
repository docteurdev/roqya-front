import Axios from 'axios'
export const axios= Axios.create({baseURL: "https://roqya.up.railway.app/",
headers:{Auth:"interaction with roqya-backend"},
timeout: 3000
})