import axios from 'axios'
import { saveItem } from './storage'

const BASE_URL = 'https://share-your-iftar-backend.herokuapp.com/api'

export async function login(email, password) {
  let response

  try {
    response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    })
    const data = response.data

    if (response.status === 200) {
      const user = data.data.user
      const token = data.data.token

      // Storing user info and token in localStorage
      saveItem("userToken", token)
      saveItem("user", JSON.stringify(user))
    }

    return data
  }
  catch (error) {
    console.log('error: ', error.response)
    return error.response.data
  }
}
