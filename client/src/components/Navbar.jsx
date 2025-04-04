import { GraduationCap, Store } from "lucide-react";
import React, { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DarkMode from "@/DarkMode";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "@/components/ui/separator"
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";




export const Navbar = () => {
        const {user} = useSelector(store=>store.auth )
        const [logoutUser, {data, isSuccess}] = useLogoutUserMutation()
        const navigate = useNavigate()
        const logoutHandler = async () => {
          await logoutUser()
        }

        useEffect(()=>{
          if(isSuccess){
            toast.success(data.message || "User Logout")
            navigate("/login")
          }
        },[isSuccess])
  return (
    <div className="h-16 dark:bg-[#0a0a0a] bg-white border-b dark:border-b-gray-200 top-0 left-0 right-0 duration-300 z-10">
      <div className="md:flex max-w-7xl mx-auto items-center justify-between gap-10 h-full hidden  ">
        <Link to="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <GraduationCap size={"30"}  className="text-purple-800 dark:text-white" />
          <h1 className="hidden md:block font-extrabold text-2xl font-sans text-purple-800 dark:text-white">
            trenning
          </h1>
        </div>
        </Link>
      {/* User icons and dark mode  */}
      <div className="flex items-center gap-8">
        { user ? (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Avatar>
  <AvatarImage src={user?.photoUrl ||"https://github.com/shadcn.png"}  className="cursor-pointer"/>
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link to="my-learning">My Learning</Link> </DropdownMenuItem>
              <DropdownMenuItem  > <Link to="profile"> Edit Profile</Link></DropdownMenuItem>
              <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
            <DropdownMenuSeparator />
            {
              user?.role === "instructor" && (
                <DropdownMenuItem><Link to="admin/dashboard">Dashboard</Link></DropdownMenuItem>
              )
            }
            </DropdownMenuContent>
          </DropdownMenu>      
        ):(
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={()=> navigate("/login")}>Login</Button>
                <Button className="bg-purple-800 hover:bg-purple-900" onClick={()=> navigate("/login")} >Signup</Button>
            </div>
        ) }
        <DarkMode/>
      </div>
      </div>
        {/* Mobile Responsive */}
        <div className="flex md:hidden items-center justify-between px-4 h-full">
            <h1 className="font-sans text-purple-800 dark:text-white text-2xl font-extrabold" >trenning</h1>
        <MobileNavbar/>
        </div>
    </div>
  );
};

const MobileNavbar = () => {
  const { role } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User Logout");
      navigate("/login");
    }
  }, [isSuccess]);
    return(

    <Sheet>
    <SheetTrigger asChild>
    <Button size={'icon'} className="rounded-full bg-gray-200 text-black hover:bg-gray-200" variant="outline">
            <Menu  size={'18'}/>
          </Button>
    </SheetTrigger>
    <SheetContent className="flex flex-col">
      <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <Link to="/">
        <SheetTitle className=" font-extrabold text-xl font-sans text-purple-800 dark:text-white">
        trenning
        </SheetTitle>
          </Link>    
        <DarkMode />
      </SheetHeader>
      <Separator className="mr-2"/>
      <nav className="flex flex-col space-y-4">
       <Link to="my-learning"> My Learning</Link>
        <Link to="profile"><span>Edit Profile</span></Link>
        <span onClick={logoutHandler}>Logout</span>
      </nav>
      {
        role === "instructor" && (
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit" onClick={()=>navigate('/admin/dashboard')}>Dashboard</Button>
        </SheetClose>
      </SheetFooter>
        )
      }
    </SheetContent>
  </Sheet>
    )
}