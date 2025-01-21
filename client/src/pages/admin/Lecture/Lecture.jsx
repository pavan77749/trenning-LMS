import React from "react";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
    const navigate = useNavigate()
    const goToUpdateLecture = () => {
        navigate(`/admin/course/${courseId}/lecture/${lecture._id}`)
    }

  return (
    <div className="flex items-center justify-between bg-[#f7f9fa] dark:bg-[#1f1f1f] px-4 py-2 rounded-md my-2">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        Lecture - {index+1}  {lecture.lectureTitle}
      </h1>
      <Edit
        onClick={goToUpdateLecture}
        size={20}
        className="cursor-pointer  text-gray-600 dark:text-gray-300 hover:text-purple-800 dark:hover:text-purple-400"
      />
    </div>
  );
};

export default Lecture;
