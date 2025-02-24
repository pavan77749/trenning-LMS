import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Course from './Course'
import { Skeleton } from "@/components/ui/skeleton"
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'

const Profile = () => {
  const [name,setName ] = useState("");
  const [profilePhoto, setProfilePhoto] =useState("")

  const {data, isLoading,refetch} = useLoadUserQuery();
  const [updateUser,{data:updateUserData,isLoading:updateUserIsLoading,isError,error,isSuccess}] = useUpdateUserMutation();

  const onChangeHandler = (e)=> {
    const file = e.target.files?.[0];
    
    if(file) setProfilePhoto(file)
  }

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name",name);
    formData.append("profilePhoto", profilePhoto)
    await updateUser(formData)
  }

  useEffect(() => {
    refetch();
  }, []);

  useEffect(()=>{
    if(isSuccess){
      refetch();
      toast.success(data.message || "Profile Updated")
    }
    if(isError){
      toast.error(error.message || "Failed to Update profile")
    }
  }, [error, updateUserData, isSuccess, isError])

  
  const user = data && data.user;
  // console.log(user)

  return (
    <>{
      isLoading ? (<ProfileSkeleton />)  :  <div className='max-w-4xl mx-auto my-20 px-4'>
      <h1 className='font-bold text-2xl text-center md:text-left'>Profile</h1>
      <div className='  py-3 flex flex-col md:flex-row items-center md:items-start'>
        <div className='  flex flex-col md:flex-row '>
            <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"}  className="cursor-pointer"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <div className="mb-2">
              <h1 className='font-semibold font-sans text-gray-900 dark:text-gray-100 '>Name: <span className='font-normal text-gray-700 dark:text-gray-300'>{user.name}</span></h1>
            </div>
            <div className="mb-2">
              <h1 className='font-semibold font-sans text-gray-900 dark:text-gray-100 '>Email: <span className='font-normal text-gray-700 dark:text-gray-300'>{user.email}</span></h1>
            </div>
            <div className="mb-2">
              <h1 className='font-semibold font-sans text-gray-900 dark:text-gray-100 '>Role: <span className='font-normal text-gray-700 dark:text-gray-300'>{user.role.toUpperCase()}</span></h1>
            </div>
            <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-800">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label >
              Name
            </Label>
            <Input id="name" placeholder="Name" onChange={(e)=> setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label  >
              Profile Photo
            </Label>
            <Input type="file" accept="image/*" className="col-span-3" onChange={onChangeHandler} />
          </div>
        </div>
        <DialogFooter>
         <Button disabled={updateUserIsLoading} className="bg-purple-800" onClick={updateUserHandler}>
          {
      
            updateUserIsLoading ? ( <>
              <Loader2 className='animate-spin mr-2 h-4 w-4 '/> Please Wait
            </>
            ) : "Save Changes"
          
          }
         </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
          </div>
        </div>
      </div>
      <div >
        <h1 className="text-lg font-medium font-bold font-sans">Courses you're enrolled in</h1>
        <div className="grid  grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 my-4">
          {
            user?.enrolledCourses.length === 0 ? (<h1>You are not enrolled in any Course</h1> ) : (user?.enrolledCourses.map((course,index)=><Course course={course} key={course._id || index}/>)
          )}
        
        </div>
        </div>
    </div>
    }
    </>
   
  )
}

export default Profile

const ProfileSkeleton = () =>{
  return(

  <div className='max-w-4xl mx-auto my-20 px-4'>
  <Skeleton className='h-8 w-48 mb-6 mx-auto md:mx-0' />
  <div className='py-3 flex flex-col md:flex-row items-center md:items-start'>
    <div className='flex flex-col md:flex-row'>
      <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full mb-4" />
      <div className="md:ml-4 flex flex-col items-center md:items-start">
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-4 w-56 mb-2" />
        <Skeleton className="h-4 w-40 mb-4" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  </div>
  <div className="mt-8">
    <Skeleton className="h-6 w-64 mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 my-4">
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} className="h-48 w-full rounded-lg" />
      ))}
    </div>
  </div>
</div>
  )
}