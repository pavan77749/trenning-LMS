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


const CourseDetail = () => {
  const enrolled = true;
  return (
    <div className="space-y-5">
      <div className="bg-[#2d2f31] text-white">
        <div className="max-w-7xl mx-auto py-8 md:px-8 flex flex-col gap-2 ">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg">Course Subtitle</p>
          <p>
            Created By{" "}
            <span className="text-[#c0c4fc] italic">Pavan Gupta</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last Updated 11-2-2025</p>
          </div>
          <p>Students enrolled: 10 </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-3 py-8 md:px-8 flex flex-col gap-2 lg:flex-row justify-between">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="text-xl font-bold md:text-2xl">Course Description</h1>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
            tempore ad nam quasi, molestias omnis magnam maxime temporibus
            maiores consectetur assumenda iste cupiditate! Perferendis
            consectetur odio maxime magnam animi minima doloribus, explicabo cum
            quis repellat veniam culpa nam vel dicta quod dolorem repudiandae
            praesentium vitae quae cumque consequuntur rem sit!
          </p>
          <Card>
            <CardHeader>
              <CardTitle> Course Content</CardTitle>
              <CardDescription>4 lectures</CardDescription>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>
                      {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                    </span>
                    <p>lecture title</p>
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
               React Player Video Player
              </div>
              <h1>Lecture Title</h1>
              <Separator className="my-2"/>
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className=" flex justify-between p-4">
                {
                  enrolled ? <Button className="w-full cursor-pointer">Continue Course</Button> : <BuyCourseButton className="w-full cursor-pointer"/>
                }
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
