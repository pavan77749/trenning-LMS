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
import { useNavigate } from "react-router-dom";

const CourseTab = () => {
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

  const isLoading = false;
  const isPublished = true;
  const navigate = useNavigate()

  const selectCategory = (value) => {
    setInput({...input, category:value})
  }
  const selectCourseLevel = (value) => {
    setInput({...input, courseLevel:value})
  }

  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    console.log(file)
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setpreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = () => {
    console.log(input)
  }
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
          <Button variant="outline">
            {isPublished ? "Unpublished" : "Published"}
          </Button>
          <Button className="bg-purple-800">Remove Course</Button>
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
