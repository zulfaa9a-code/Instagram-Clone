import {RouterProvider} from 'react-router'
import {router} from './app.routes'
import "./feautres/shared/global.scss"
/* import AppRoutes from './AppRoutes'


import {AuthProvider} from './feautres/auth/auth.context' */
import { PostContextProvider } from './feautres/post/post.context'
const App = () => {
  return (
    <PostContextProvider>
            <RouterProvider router={router} />
        </PostContextProvider>
  )
}

export default App