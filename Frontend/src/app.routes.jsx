import {createBrowserRouter } from 'react-router-dom'
import Login from './feautres/auth/pages/Login'
import CreatePost from './feautres/post/pages/CreatePost'
import Feed from './feautres/post/pages/Feed'
import Register from './feautres/auth/pages/Register'
import Inbox from './feautres/messages/pages/Inbox'
export const router = createBrowserRouter ([
    {
         path:"/" , element:<h1>Welcome to the App</h1>
    }, 
    {
        path:"/login", element:<Login />
    },
    {
        path:"/feed", element:<Feed />
    },
    {
    path:"/register" , element:<Register /> } , 
    {
        path:"/createpost" , element:<CreatePost/>
    },
    {
        path:"/inbox" , element:<Inbox />
    }
])