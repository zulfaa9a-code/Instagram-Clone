import axios from "axios";
const api = axios.create({
     baseURL: "http://localhost:3000",
      withCredentials: true
})
export async function register(username, email, password) {
     try {
  const response = await api.post(
    "/register",
    { 
      username,
      email,
      password
    })
     console.log("Register data:",
            username, email)
 return response.data  }
  catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }

 
}
export async function login(username, password) {
     try 
     {
          const response = await api.post("/login", {
            username,
            password
          });
          return response.data;
     }
     catch (error) {
          console.error("Error logging in user:", error);
           console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("ERROR:", error);
    throw error;
    
     }

}
export async function getMe() {
  const response = await axios.get(
    "http://localhost:3000/me",
    {
      withCredentials: true
    }
  );

  return response.data;
}