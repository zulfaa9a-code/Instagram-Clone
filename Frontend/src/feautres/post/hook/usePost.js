//import {getFeed} from "../services/post.api"

import {useContext} from "react"
import { PostContext } from "../post.context"
import { getFeed, createPost } from "../services/post.api"
export const usePost =()=>
{
    const context = useContext(PostContext)
    const  { loading, setLoading, post,  setPost, feed,setFeed} = context
    
    const handleGetFeed = async()=>
    {
        setLoading(true)
        const data =await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }
    const handleCreatePost = async(imageFile, caption) =>
    {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([data.post,...feed]) // setting the new/latest post  first then rest of the posts
        setLoading(false)
    }
   return {
    loading,
    feed,
    post,
    handleGetFeed , 
    handleCreatePost
}
}