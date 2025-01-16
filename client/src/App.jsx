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
import Profile from './pages/student/Profile'
import Slidebar from './pages/admin/Slidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/Course/CourseTable'
import AddCourse from './pages/admin/Course/AddCourse'

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
    },
    {
      path:'profile',
      element:<Profile/>
    },

    // admin routes 
    {
      path:"admin",
      element:<Slidebar/>,
      children:[
        {
        path:"dashboard",
        element:<Dashboard/>
      },
        {
        path:"course",
        element:<CourseTable/>
      },
      {
        path:"course/create",
        element:<AddCourse/>
      }
    ]
    }
    
  ],
  
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
