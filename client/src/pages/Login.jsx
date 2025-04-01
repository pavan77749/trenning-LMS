import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate()

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData)
  };
  
  useEffect(()=>{
    if(registerIsSuccess && registerData){
      toast.success(registerData?.message || 'Signup successfully')
    }
    if(registerError){
      toast.error(registerError?.data?.message || 'Signup Failed')
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData?.message || 'Login successfully')
      navigate("/")
    }
    if(loginError){
      toast.error(loginError?.data?.message || 'Login Failed')
    }

  },[
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError
  ])

  return (
    <div className="flex items-center w-full justify-center mt-5">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-white font-extrabold text-2xl">Signup</CardTitle>
              <CardDescription>
                Join us today! Fill in your details and click Sign Up to get
                started:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  placeholder="Eg. John Deo"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="name"
                  value={signupInput.name}
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Eg. john12@gmail.com"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="email"
                  value={signupInput.email}
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  placeholder="Eg. pa$swo123rd"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="password"
                  value={signupInput.password}
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")} className="bg-purple-800 hover:bg-purple-900 text-white w-full">
               {
                registerIsLoading ? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                  </>
                ) : "Signup"
               }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login" >
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-white font-extrabold text-2xl">Login</CardTitle>
              <CardDescription>
                Welcome back! 👋 Enter your details below to access your
                account:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  placeholder="Eg. john12@gmail.com"
                  onChange={(e) => changeInputHandler(e, "login")}
                  name="email"
                  value={loginInput.email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  type="password"
                  placeholder="Eg. pa$swo123rd"
                  onChange={(e) => changeInputHandler(e, "login")}
                  name="password"
                  value={loginInput.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")} className="bg-purple-800 hover:bg-purple-900 text-white w-full" >{loginIsLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</>) :"Login" } </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
