import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const [number, setNumber] = useState(0);
  const [searchQuery,setsearchQuery] = useState("");
  const navigate = useNavigate()

  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setsearchQuery("")
  }


  useEffect(() => {
    const target = 140; // Final number
    const duration = 2000; // Animation duration in milliseconds
    const increment = target / (duration / 16); // Increment per frame (assuming ~16ms per frame)

    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(interval);
        setNumber(target); // Set to target to ensure it ends at 140
      } else {
        setNumber(Math.floor(current)); // Update number with animation
      }
    }, 16); // 16ms for smooth animation (~60fps)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-gray-500 to bg-purple-800 dark:from-gray-800 dark:to-gray-900 py-4 text-center">
      <div className="max-w-3xl mx-auto ">
        <h1 className="text-white text-4xl font-bold mb-4 font-sans ">
          This is an online learning and teaching marketplace with over{" "}
          <span className="text-purple-950">{number}+</span>courses and 73
          thousands students
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover,Learn,and Upskill with our wide range of courses
        </p>
        <form
          onSubmit={searchHandler}
          className="flex  items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden mb-2 md:m-2"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 font-sans placeholder-gray-400 dark:placeholder-gray-50"
          ></Input>
          <Button type="submit" className="bg-purple-800 dark:bg-purple-900 text-white px-5 py-3 rounded-full hover:bg-purple-900 ">
            Search
          </Button>
        </form>
        <Button onClick={()=> navigate(`/course/search?query`)} className="bg-white dark:bg-gray-800 text-purple-800 rounded-full  hover:bg-gray-200 mt-2">
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
