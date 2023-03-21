import axios from 'axios'

const TOKEN = "cgc6m31r01qsquh3fbl0cgc6m31r01qsquh3fblg"

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})