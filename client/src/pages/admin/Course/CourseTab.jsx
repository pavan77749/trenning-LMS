import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation, useRemoveCourseMutation } from "@/features/api/cousreApi";
import { toast } from "sonner";
import { useEffect } from "react";


const CourseTab = () => {
  const params = useParams()

  const courseId = params.courseId;
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [previewThumbnail, setpreviewThumbnail] = useState("")

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  

  const navigate = useNavigate()

 // courseAPI call
 const [editCourse,{data,isLoading,isSuccess,isError,error}] = useEditCourseMutation();

  const selectCategory = (value) => {
    setInput({...input, category:value})
  }
  const selectCourseLevel = (value) => {
    setInput({...input, courseLevel:value})
  }

  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    // console.log(file)
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setpreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({formData,courseId});
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "Course Updated");
      navigate("/admin/course")
    }
    if(isError){
      toast.error(error.message || "Failed to Update Course")
    }
  },[isSuccess,error,isError])


  // fetch the course details
  const {data:courseByIdData,isLoading:courseByIdLoading,refetch} = useGetCourseByIdQuery(courseId);
  // const course = courseByIdData?.course;
  useEffect(()=>{
    if(courseByIdData?.course){
      const course = courseByIdData?.course
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      })
    
      
    }
  },[courseByIdData])

  //publish mutation
  const [publishCourse] = usePublishCourseMutation()

  const publishStatusHander = async(action) => {
    try {
      const response = await publishCourse({courseId,query:action});
      if(response.data){
        toast.success(response.data.message);
        refetch();
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to Publish or Unpublish course")
    }

  }


      const [removeCourse,{data:removeCourseData,isLoading:removeCourseLoading,isSuccess:removeCourseSuccess}] = useRemoveCourseMutation()
      const removeCourseHandler = async () => {
        await removeCourse({courseId})
      }

       useEffect(()=>{
              if(removeCourseSuccess){
                  toast.success(removeCourseData.message)
                  navigate("/admin/course")
              }
          },[removeCourseSuccess])

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic course Description </CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you are done
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={()=>publishStatusHander(courseByIdData?.course.isPublished ? "false" : "true")}>
            {courseByIdData?.course.isPublished ? "Unpublished" : "Published"}
          </Button>
          <Button className="bg-purple-800" onClick={removeCourseHandler}>{ removeCourseLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</> : "Remove Course"}</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-4">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              placeholder="Ex.FullStack Developer"
              value={input.courseTitle}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label>Sub Title</Label>
            <Input
              type="text"
              name="subTitle"
              placeholder="Ex.Best Course Placement Ready"
              value={input.subTitle}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Nextjs">Nextjs</SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                    <SelectItem value="CSS">CSS</SelectItem>
                    <SelectItem value="Fullstack">Fullstack</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Advance">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in INR</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="Ex. 199"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input type="file"  onChange={selectThumbnail} accept="image/*" className="w-fit"/>
            {
                previewThumbnail && (
                    <img src={previewThumbnail} className="w-64 my-2" alt="course thumbnail" />
                )
            }
          </div>
          <div className="gap-3 flex">
            <Button variant="outline" onClick={()=> navigate("/admin/course")}>Cancel</Button>
            <Button className="bg-purple-800 " disabled={isLoading} onClick={updateCourseHandler}>

          { isLoading ? (
            <>  <Loader2 className=" animate-spin mr-2 h-4 w-4"/> Please wait   </>
          ):  "Save "
       
          }  
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
