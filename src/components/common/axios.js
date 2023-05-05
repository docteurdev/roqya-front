import Axios from 'axios'
export const axios= Axios.create({baseURL: "https://roq-back-production.up.railway.app/",
//headers:{Auth:"interaction with roqya-backend"},
timeout: 3000
})