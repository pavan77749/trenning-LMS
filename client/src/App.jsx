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
import EditCourse from './pages/admin/Course/EditCourse'
// Fix the import path - use correct case
import CreateLecture from './pages/admin/Lecture/CreateLecture'
import EditLecture from './pages/admin/Lecture/EditLecture'
import CourseDetailed from './pages/student/CourseDetail'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import {AuthenticatedUser, ProtectedRoute,AdminRoute} from './components/ProtectedRoute'
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtectedRoute'
import { ThemeProvider } from './components/ThemeProvider'

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
      element:<AuthenticatedUser><Login/></AuthenticatedUser>
    },
    {
      path:'my-learning',
      element: <ProtectedRoute><Mylearning/></ProtectedRoute> 
    },
    {
      path:'profile',
      element:<ProtectedRoute><Profile/></ProtectedRoute>
    },
    {
      path:'course/search',
      element:<ProtectedRoute><SearchPage/></ProtectedRoute>
    },
    {
      path:'course-detail/:courseId',
      element:<ProtectedRoute><CourseDetailed/></ProtectedRoute>
    },
    {
      path: "course-progress/:courseId",
      element: (
        <ProtectedRoute>
          <PurchaseCourseProtectedRoute>
          <CourseProgress />
          </PurchaseCourseProtectedRoute>
        </ProtectedRoute>
      ),
    },
    

    // admin routes 
    {
      path:"admin",
      element:<AdminRoute><Slidebar/></AdminRoute>,
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
      },
      {
        path:"course/:courseId",
        element:<EditCourse/>
      },
      {
        path:"course/:courseId/lecture",
        element:<CreateLecture/>
      },
      {
        path:"course/:courseId/lecture/:lectureId",
        element:<EditLecture/>
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
    <ThemeProvider>
    <RouterProvider router={appRouter}/>
    </ThemeProvider>
   </main>
   </>
  )
}

export default App
