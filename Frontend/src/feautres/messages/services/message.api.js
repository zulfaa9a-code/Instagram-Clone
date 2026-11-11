import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3000/api/messages', // adjust to your server
    withCredentials: true, // if you use cookie-based auth
})

export const getConversation = async (userId) => {
    const { data } = await api.get(`/${userId}`)
    return data.messages
}

export const sendMessage = async (receiverId, text) => {
    const { data } = await api.post(`/${receiverId}`, { text })
    return data.message
}

  