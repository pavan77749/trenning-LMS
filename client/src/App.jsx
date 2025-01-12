import './App.css'
import { Button } from "@/components/ui/button"
import Login from './pages/Login'
import { Navbar } from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router-dom'
import Courses from './pages/student/Courses'
import Mylearning from './pages/student/Mylearning'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[{
      path:"/",
      element:
      <>
      <HeroSection />
      <Courses />
      </>
    },{
      path:'login',
      element:<Login/>
    },
    {
      path:'my-learning',
      element:<Mylearning/>
    }
  ]
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
