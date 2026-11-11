import React from 'react'
import '../styles/form.scss'
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
const Register = () => {
  const navigate = useNavigate()
  const {loading , handleRegister} = useAuth()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  async function handleSubmit(e){
    e.preventDefault()   
    await handleRegister(username , email , password)
    navigate('/usersetup') 
  }
  if (loading)
  {
    return <h1> Loading ...</h1>
  }
  return (
    <main>
      <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input onInput={(e)=> {setUsername(e.target.value)}}
          type="text" name='username' placeholder="Username" value={username} />
          <input onInput={(e)=> {setEmail(e.target.value)}}
          type="email" name='email' placeholder="Email" value={email} />
          <input onInput={(e)=> {setPassword(e.target.value)}}
          type="password" name='password' placeholder="Password" value={password} />
          <button type="submit" >Register</button>
        </form>
        <p>Already have an account? <Link to="/login" className='link-ac'>Login</Link></p>
      </div>
    </main>
  )
}

export default Register