import axios from 'axios'

const axiosMoralis = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_MORALIS_URL}`,
  headers: {
    accept: 'application/json',
    'X-API-Key': `${process.env.NEXT_PUBLIC_MORALIS_API}`
  },
})

export {
  axiosMoralis
}
