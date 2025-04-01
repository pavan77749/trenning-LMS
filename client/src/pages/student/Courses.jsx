import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/cousreApi";

const Courses = () => {
  const {data,isLoading,isError} = useGetPublishedCourseQuery()
  
  if(isError) return <h1>Some error Occured while fetching courses</h1>
  return (
    <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="font-sans text-4xl text-center font-extrabold mb-10">Our Courses</h2>
            <div className="grid-cols-1 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {
                isLoading ? Array.from({length:8}).map((_,index) => (<CourseSkeleton key={index}/>)) : 
                data?.courses?.map((course,index) => <Course key={index} course={course}/>)
            }   
            </div>
        </div>
    </div>
  )
}

export default Courses

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

