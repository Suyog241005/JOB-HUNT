import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";


const Login = () => {
  const [input, setInput] = useState({
      email: "",
      password: "",
      role: "student",
    });
    const {loading} = useSelector(state=> state.auth);
    const navigate=useNavigate();
    const dispatch = useDispatch();
  
    const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
      console.log(input);
      
    };
  
  
   
  const submitHandler = async (e) => {
    e.preventDefault();
       

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    }finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-fray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Login</h1>

        

        <div className="my-2">
          <Label htmlFor="">Email</Label>
          <Input type="text"
            placeholder="John@gmail.com"
            value={input.email}
            onChange={changeEventHandler}
            name="email"/>
        </div>


        <div className="my-2">
          <Label htmlFor="">Password</Label>
          <Input type="password"
            placeholder="****"
            value={input.password}
            onChange={changeEventHandler}
            name="password"/>
        </div>
        <div className="flex items-center justify-between">
          <RadioGroup
            className={"flex items-center space-x-2 my-2"}
          >
            <div className="flex items-center space-x-2">
              <Input
                type={"radio"}
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className={"cursor-pointer"}
                id="r1"
              />
              <Label htmlFor="r1" className={"cursor-pointer"}>
                Student
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
               type={"radio"}
               value="recruiter"
               name="role"
               checked={input.role === "recruiter"}
               onChange={changeEventHandler}
               className={"cursor-pointer"}
               id="r2"
              />
              <Label htmlFor="r2" className={"cursor-pointer"}>
                Recruiter
              </Label>
            </div>
          </RadioGroup>
          
        </div>


{
  loading ? <Button className="w-full my-4 bg-gray-800 text-white" ><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button> :         <Button type="submit" className="w-full my-4 bg-gray-800 text-white">Login</Button>

}

        <span className="text-sm">Don't have an account? <Link to={"/signup"} className="text-blue-600">Signup
        </Link></span>
      </form>
    </div>
  );
};

export default Login;
