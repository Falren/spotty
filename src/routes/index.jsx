import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { Login } from '@/pages';
import { useAuth } from '../contexts/auth_context.js';
import { ChatWindow } from '../pages/ChatWindow.jsx';

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
          element: <ChatWindow/>
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
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router}></RouterProvider>
}


export default Routes
