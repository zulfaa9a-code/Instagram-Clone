import { createContext, useState } from 'react'
import { AuthProvider }from '../auth/auth.context'
export const PostContext = createContext()

export const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState(null)
  const [feed, setFeed] = useState([])

  return (
    <AuthProvider> 
    <PostContext.Provider
      value={{
        loading,
        setLoading,
        post,
        setPost,
        feed,
        setFeed
      }}
    >
      {children}
    </PostContext.Provider>  </AuthProvider>
  )
}