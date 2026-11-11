import { useEffect } from 'react'
import "./feed.scss"
import { useNavigate } from 'react-router-dom'
import  Nav  from '../../shared/components/Nav'
import Post from "../components/Post"
import {usePost}  from "../hook/usePost"
import { createPost } from '../services/post.api'
const Feed = ({user, post}) => {
    function createPost()
    {
         navigate('/createpost')
    }
    const navigate = useNavigate()
    const {feed, handleGetFeed, loading} = usePost()
    useEffect(()=>
    {
        handleGetFeed()
    },[])
     if (loading ||!feed)
     {
        return (<main><h1>Loading Feed...</h1></main>)
     }
     console.log(feed)
  return (
    <main className='feed-page'>
        <Nav />
        <div className="feed">
            <div className="logo">
            <img className='logo-img' src="./instagram-1.png"></img>
        <button className='create-posts' onClick={createPost}>Create Post</button>
        </div>
            <div className="posts">
               {feed.map(post=>{
                return <Post 
                key={post._id} user={post.user} post ={post} />
               })}
                
            </div>
        </div>
    </main>
  )
}

export default Feed