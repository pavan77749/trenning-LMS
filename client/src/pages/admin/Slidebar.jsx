import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Slidebar = () => {
  return (
    <div className="flex ">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r-gray-300 dark:border-gray-700 dark:bg-slate-100 bg-[#f0f0f0] sticky top-0 h-screen ">
        <div className="space-y-4 mt-5  ">
          <Link
            to="dashboard"
            className="flex items-center gap-2 hover:text-purple-600 transition duration-75"
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>{" "}
          </Link>
          <Link
            to="course"
            className="flex items-center gap-2 hover:text-purple-600 transition duration-75"
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>{" "}
          </Link>
        </div>
      </div>
      <div className="flex-1 md:p-20 p-2 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Slidebar;
