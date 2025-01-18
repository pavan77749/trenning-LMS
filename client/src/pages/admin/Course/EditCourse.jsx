import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl ">
          Add Detail information about Course
        </h1>
        <Link to="lecture">
          <Button className="hover:text-purple-800" variant="link">Go to lecture Page</Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  );
};

export default EditCourse;