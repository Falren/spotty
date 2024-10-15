import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import { useAuth } from '@/provider/authProvider'
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { Chat, Login } from '@/pages';

const Routes = () => {
  const { token } = useAuth()
  const routesForPublic = [
    {
      path: '/about',
      elemt: <div>About</div>
    }
  ]
  const routesForAuthenticatedOnly = [
    { 
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/chat',
          element: <Chat/>
        }
      ]
    }
  ]
  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: <Link to='/login'>Login</Link>
    },
    {
      path: '/login',
      element: <Login/>
    }
  ]

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(token ? routesForAuthenticatedOnly : routesForNotAuthenticatedOnly),
  ])

  return <RouterProvider router={router}></RouterProvider>
}


export default Routes
