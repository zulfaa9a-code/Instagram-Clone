import React from 'react'
import '../styles/form.scss'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
const Login = () => {
 
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const {handleLogin , loading} = useAuth()
  const navigate = useNavigate()
  if (loading)
{
    return <div>Loading...</div>
}
  async function handleSubmit(e){ 
      e.preventDefault()
     await  handleLogin(username, password) 
     navigate('/feed')  
    }
    if (loading)
    {
      return (<main>
        <h1> Loading</h1>
      </main>)
    }

  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name='username' 
                    placeholder="Username" 
                    value={username}
                    onInput={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    name='password' 
                    placeholder="Password" 
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register" className='link-ac'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login