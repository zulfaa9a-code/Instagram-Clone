import  {useState , useRef} from 'react'
import './create-post.scss'
import { usePost } from "../hook/usePost"
import {useNavigate} from 'react-router-dom'
const Usersetup = () => {

    const [name , setName] = useState("")
    const postImageInputFieldRef = useRef(null)
    const {loading , handleCreatePost} = usePost()
    const navigate = useNavigate()
   async function handleSubmit(e)
    {
        e.preventDefault()
        const file = postImageInputFieldRef.current.files[0]
       await  handleCreatePost(file,caption)
       navigate('/feed')
    }
    if(loading)
    {
        return(<h1>creating posts</h1>)
    }
  return (
    

  <main className="set-user">
    <h1>Setup your profile</h1>
    <div className="form-container">
        <form onSubmit={handleSubmit}>
            
            <input type="text" name="Name" id="name"
            onChange={(e)=>{setName(e.target.value)}}/>
            <label className="profile-img-label" htmlFor="postImage">Select Image </label>
            <input hidden type="file"  ref={postImageInputFieldRef} name="postimage" id="postImage" />
            <input type="text" name="caption" id="caption"
            onChange={(e)=>{setCaption(e.target.value)}}/>
            <button>Create Post</button>
        </form>
    </div>
  </main>
  )
}

export default Usersetup