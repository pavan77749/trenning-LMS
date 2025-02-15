import React from "react";
import { BadgeInfo, PlayCircle, Lock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import BuyCourseButton from "@/components/BuyCourseButton";
import { useParams , useNavigate} from "react-router-dom";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import ReactPlayer from "react-player";



const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate()
  const {data,isLoading,error,isError} = useGetCourseDetailWithStatusQuery(courseId);

  if(isLoading) return <h1>Loading...</h1>
  if(isError) return <h1>{error.data.message || "Failed to load course details"}</h1>
  const {course,purchased} = data;

  const handleContinueCourse = () => {
    if(purchased){
      navigate(`/course-progress/${courseId}`)
    }
  }

  return (
    <div className="space-y-5">
      <div className="bg-[#2d2f31] text-white">
        <div className="max-w-7xl mx-auto py-8 md:px-8 flex flex-col gap-2 ">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-lg">{course?.subTitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#c0c4fc] italic">{course?.creator?.name}</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last Updated {course?.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudent.length} </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-3 py-8 md:px-8 flex flex-col gap-2 lg:flex-row justify-between">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="text-xl font-bold md:text-2xl">Course Description</h1>
          <p className="text-sm" dangerouslySetInnerHTML={ {__html:course.description} }/>
           
          
          <Card>
            <CardHeader>
              <CardTitle> Course Content</CardTitle>
              <CardDescription>{course?.lectures.length}lectures</CardDescription>
              <CardContent className="space-y-3">
                {course.lectures.map((lecture, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>
                      {lecture?.isPreviewFree  ? <PlayCircle size={14} /> : <Lock size={14} />}
                    </span>
                    <p>{lecture?.lectureTitle}</p>
                  </div>
                ))}
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className="w-full lg:w-1/3 ">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
               {/* React Player Video Player */}
              <ReactPlayer
              width="100%"
              height={"100%"}
              url={course?.lectures[0].videoUrl}
              controls={true}
              />
              </div>
              <h1>{course?.courseTitle}</h1>
              <Separator className="my-2"/>
              <h1 className="text-lg md:text-xl font-semibold">Course Price: {course?.coursePrice}</h1>
            </CardContent>
            <CardFooter className=" flex justify-between p-4">
                {
                  purchased ? <Button className="w-full cursor-pointer" onClick={handleContinueCourse}>Continue Course</Button> : <BuyCourseButton className="w-full cursor-pointer" courseId={courseId}/>
                }
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
