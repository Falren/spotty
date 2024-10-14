import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routeList } from './routes.jsx'


export const AppRouter = () => {
  return <RouterProvider router={createBrowserRouter(routeList)}></RouterProvider>
}


