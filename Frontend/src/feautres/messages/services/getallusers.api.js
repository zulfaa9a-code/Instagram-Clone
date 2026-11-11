import axios from "axios";
const api = axios.create({
     baseURL: "http://localhost:3000",
      withCredentials: true
})

export async function getallUsers() {
  const response = await api.get(
    "http://localhost:3000/users",
    {
      withCredentials: true
    }
  );
  return response.data;
}