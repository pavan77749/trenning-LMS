import React,{useEffect} from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useGetCreatroCourseQuery } from '@/features/api/cousreApi'
import { Edit } from 'lucide-react'
import { Badge } from '@/components/ui/badge'


const CourseTable = () => {
    const {data,isLoading,refetch} = useGetCreatroCourseQuery();

    const navigate = useNavigate()

     useEffect(() => {
        refetch();
      }, []);
  return (
    <div>
        <Button onClick={()=> navigate('create')} >Create a new Course</Button>
        <Table className="mt-4">
      <TableCaption>A list of your recent courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[500px] ">Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          data?.courses.map((course)=>(
          <TableRow key={course._id} >
            <TableCell className="font-medium">{course?.courseTitle}</TableCell>
            <TableCell>{course?.coursePrice || "NA"}</TableCell>
            <TableCell><Badge > {course?.isPublished ? <span className='bg-green-400'>Published</span> : "Draft"}</Badge></TableCell>
            <TableCell className="text-right"><Button variant="ghost" onClick={()=>navigate(`${course._id}`)}><Edit/></Button></TableCell>
          </TableRow>
          ))
        }
   
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
    </div>
  )
}

export default CourseTable