import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/cousreApi'
import { toast } from 'sonner'
import Lecture from './Lecture'


const CreateLecture = () => {
    const params = useParams()
    const courseId = params.courseId;
    const [lectureTitle,setLectureTitle] = useState()
  
    const navigate = useNavigate();

    const [createLecture,{data,isLoading,isSuccess,error}] = useCreateLectureMutation();

    const createLectureHandler = async () =>{
        await createLecture({lectureTitle,courseId})
    }

    // fetch the lecture details
    const {data:lectureData , isLoading:lectureLoading ,isError:lectureError,refetch} = useGetCourseLectureQuery(courseId)
    console.log(lectureData)
    useEffect(()=>{
        if(isSuccess){
            toast.success(data.message || "Lecture Title Created")
            refetch()
        }
        if(error){
            toast.error(error.message || "Failed to create lecture Title")
        }
    },[isSuccess,error])
  return (
    <div className='flex-1 mx-10'>
    <div className="mb-4">
        <h1 className='font-bold text-xl'>Lets add Lectures, and some basic details for your new Lectures</h1>
        <p className='font-semibold text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, iure?</p>
        <div className="space-y-4">
            <div className='mt-3'>
                <Label className="border border-none">Title</Label>
                <Input type="text" name="title" value={lectureTitle} onChange={(e)=>setLectureTitle(e.target.value)}  placeholder="Your Lecture Title Name"></Input>
            </div>
            
            <div className='gap-3 flex items-center'>
                <Button variant="outline" onClick={()=>navigate(`/admin/course/${courseId} `)}>Back to Course</Button>
                <Button className="bg-purple-800" disabled={isLoading} onClick={createLectureHandler}>
                   {
                    isLoading ? ( <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
                    Please Wait</>) : "Create Lecture"
                   }</Button>
            </div>
            <div className="mt-10">
                {
                    lectureLoading ? (<p>Lecture Loading....</p>) : lectureError ? (<p>Failed to Load Lecture</p>) : lectureData.lectures.length === 0 ? <p>No lecture available</p> : (
                        lectureData.lectures.map((lecture,index)=>(
                            <Lecture key={lecture._id} lecture={lecture} index={index} courseId={courseId}/>
                        ))
                    )
                    
                }
            </div>
        </div>
    </div>
</div>
  )
}

export default CreateLecture