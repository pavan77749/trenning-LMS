import React from 'react'
import Course from './Course'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"


const Mylearning = () => {
    const isLoading = false;
    const myLearningCourses =  [2];
  return (
    <div className='max-w-4xl mx-auto my-10 px-4 md:px-0'>
        <h1 className='font-extrabold text-2xl'>My Learning</h1>
        <div className="my-5 ">
        {
          isLoading ? ( <CourseSkeleton/> ) :  myLearningCourses.length === 0 ? ( <p className='font-medium text-xl '>You are not enrolled in any Course</p>) : 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {
              [1,2].map((course,index)=><Course key={index}/>) 
            }
          </div>

        }
        </div>
    </div>
  )
}

export default Mylearning

const CourseSkeleton = () =>{
    return (
        <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg w-[300px]">
      <Skeleton className="h-36 w-full" /> {/* Thumbnail skeleton */}
      <CardContent className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-4/5" /> {/* Course title skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar skeleton */}
            <Skeleton className="h-4 w-24" /> {/* Creator name skeleton */}
          </div>
          <Skeleton className="h-5 w-16 rounded-full" /> {/* Badge skeleton */}
        </div>
        <Skeleton className="h-6 w-20" /> {/* Price skeleton */}
      </CardContent>
    </Card>
    )
}