import './App.css'
import { Button } from "@/components/ui/button"
import Login from './pages/Login'
import { Navbar } from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router-dom'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[{
      path:"/",
      element:
      <>
      <HeroSection />
      {/* Courses  */}
      </>
    },{
      path:'login',
      element:<Login/>
    }]
  }
])

function App() {

  return (
   <>
   <main>
    <RouterProvider router={appRouter}/>
   </main>
   </>
  )
}

export default App
