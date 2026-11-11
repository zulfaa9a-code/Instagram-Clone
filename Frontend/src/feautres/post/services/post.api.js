import axios from "axios"
const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function getFeed()
{
    const response = await api.get('/posts/feed')
    return response.data
}
export async function createPost(imageFile , caption)
{
    const formData = new FormData()
    formData.append("imgUrl",imageFile )
     formData.append('caption',caption )
    const response = await api.post("/posts",formData)
    return response.data
}