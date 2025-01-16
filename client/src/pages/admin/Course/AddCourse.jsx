import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button' 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCreateCourseMutation } from '@/features/api/cousreApi'
import { toast } from 'sonner'

const AddCourse = () => {
    const [courseTitle, setCourseTitle] = useState("")
    const [category, setCategory] = useState("")
    const [createCourse, {data,isLoading,error,isSuccess}] = useCreateCourseMutation()

    const navigate = useNavigate()
    const createCourseHandler = async() => {
        await createCourse({courseTitle,category})
    }

    const getSelectedCategory = (value) =>{
        setCategory(value)
    }

    useEffect(()=>{
      if(isSuccess){
        toast.success(data?.message || "Course Created Successfully")
        navigate("/admin/course");
      }
      
    },[isSuccess,error])

  return (
    <div className='flex-1 mx-10'>
        <div className="mb-4">
            <h1 className='font-bold text-xl'>Lets add course, and some basic details for your Course</h1>
            <p className='font-semibold text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, iure?</p>
            <div className="space-y-4">
                <div className='mt-3'>
                    <Label className="border border-none">Title</Label>
                    <Input type="text" name="title" value={courseTitle} onChange={(e)=> setCourseTitle(e.target.value)} placeholder="Your course Name"></Input>
                </div>
                <div>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="nextjs">Nextjs</SelectItem>
          <SelectItem value="javascript">Javascript</SelectItem>
          <SelectItem value="html">HTML</SelectItem>
          <SelectItem value="css">CSS</SelectItem>
          <SelectItem value="fullstack">Fullstack</SelectItem>
          <SelectItem value="docker">Docker</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
                </div>
                <div className='gap-3 flex items-center'>
                    <Button variant="outline" onClick={()=>navigate("/admin/course")}>Back</Button>
                    <Button className="bg-purple-800" disabled={isLoading} onClick={createCourseHandler}>
                       {
                        isLoading ? ( <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
                        Please Wait</>) : "Create"
                       }</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddCourse