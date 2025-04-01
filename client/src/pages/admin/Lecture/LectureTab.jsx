import {Card, CardDescription, CardHeader, CardTitle,CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import axios from "axios"
import { toast } from 'sonner'
import { Progress } from '@/components/ui/progress'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/features/api/cousreApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const MEDIA_API = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/v1/media` 
  : "https://trenning-lms.onrender.com/api/v1/media";

const LectureTab = () => {
    const navigate = useNavigate()
    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress,setMediaProgress] = useState(false);
    const [uploadProgress,setuploadProgress] = useState(0);
    const [btnDisable, setBtnDisable ] = useState(true);
    const params = useParams();
    const {courseId,lectureId} = params;

    const {data:lectureData} = useGetLectureByIdQuery(lectureId)
    const lecture = lectureData?.lecture;
    // console.log(lectureData)

    useEffect(()=>{
        if(lecture){
            setLectureTitle(lecture?.lectureTitle)
            setIsFree(lecture?.isPreviewFree)
            setUploadVideoInfo(lecture?.videoInfo)
        }
    },[lecture])

    const [removeLecture,{data:removeData ,isLoading:removeLoading, isSuccess:removeSuccess}] = useRemoveLectureMutation()
    const removeLectureHandler = async () => {
        await removeLecture({lectureId})
       
    }
    
    const [editLecture, {data,isLoading,error,isSuccess}] = useEditLectureMutation()
    const editLectureHandler = async () =>{

        await editLecture({lectureTitle,videoInfo:uploadVideoInfo,courseId,lectureId,isPreviewFree:isFree});
    }

    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Lecture updated successfully");
        }
        if(error){
            toast.error(error?.data?.message || "Failed to update lecture")
        }
    },[isSuccess,error])

    useEffect(()=>{
        if(removeSuccess){
            toast.success(removeData?.message || "Lecture removed successfully")
            navigate(`/admin/course/${courseId}/lecture`)
        }
    },[removeSuccess])

    //help to upload the file on the cloudinary
    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if(file){
            const formData = new FormData;
            formData.append("file",file);
            setMediaProgress(true);
            try {
                const res = await axios.post(`${MEDIA_API}/upload-video`,formData,{
                    onUploadProgress: ({loaded, total}) => {
                        const progress = ((loaded / total) * 100).toFixed(2);
                        setuploadProgress(parseFloat(progress));
                    }
                });
                if(res?.data?.success){
                    console.log(res)
                    setUploadVideoInfo({
                        videoUrl: res?.data?.data?.url, 
                        publicId: res?.data?.data?.public_id
                    })
                    setBtnDisable(false)
                    toast.success(res?.data?.message || "Video uploaded successfully");
                }
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message || "Video upload failed");
            }
            finally{
                setMediaProgress(false)
            }
        }
    }

  return (
    <Card>
        <CardHeader className="flex justify-between">
            <div>
                <CardTitle>Edit Lecture</CardTitle>
                <CardDescription> Make changes to your lecture here. Click save when you are done</CardDescription>
            </div>
            <div className='flex items-center gap-2'>
                <Button disabled={removeLoading} variant="destructive" onClick={removeLectureHandler}>
                    {
                        removeLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</> : "Remove Lecture"
                    }
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className='my-5'>
                <Label>Title</Label>
                <Input  type="text" placeholder="EX. Introduction to Javascript" value={lectureTitle} onChange={(e)=> setLectureTitle(e.target.value)}/>
            </div>
            <div className='my-5'>
                <Label>Video <span className='text-red-500'>*</span></Label>
                <Input  type="file" accept="video/*" onChange={fileChangeHandler} className="w-fit"/>
            </div>
            <div className="flex items-center space-x-2 my-5">
            <Switch id="airplane-mode" checked={isFree}  onCheckedChange={setIsFree}/>
            <Label htmlFor="airplane-mode">Is this video Free</Label>  
            </div>
            {
                mediaProgress && (
                    <div className='my-4'>
                        <Progress value={uploadProgress} />
                        <p>{uploadProgress}% uploaded</p>
                    </div>
                )
            }
            <div>
                <Button className="bg-purple-800" onClick={editLectureHandler} disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</> : "Update Lecture" }</Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default LectureTab