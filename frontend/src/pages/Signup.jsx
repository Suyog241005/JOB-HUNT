import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: "",
  });
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-fray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Sign Up</h1>

        <div className="my-2">
          <Label htmlFor="">Full Name</Label>
          <Input
            type="text"
            placeholder="John"
            value={input.fullName}
            onChange={changeEventHandler}
            name="fullName"
          />
        </div>

        <div className="my-2">
          <Label htmlFor="">Email</Label>
          <Input
            type="text"
            placeholder="John@gmail.com"
            value={input.email}
            onChange={changeEventHandler}
            name="email"
          />
        </div>

        <div className="my-2">
          <Label htmlFor="">Phone Number</Label>
          <Input
            type="text"
            placeholder="1234567890"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            name="phoneNumber"
          />
        </div>

        <div className="my-2">
          <Label htmlFor="">Password</Label>
          <Input
            type="password"
            placeholder="****"
            value={input.password}
            onChange={changeEventHandler}
            name="password"
          />
        </div>
        <div className="flex items-center justify-between">
          <RadioGroup className={"flex items-center space-x-2 my-2"}>
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
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              accept="imgae/*"
              type="file"
              className={"cursor-pointer"}
              onChange={changeFileHandler}
            />
          </div>
        </div>
        <Button type="submit" className="w-full my-4 bg-gray-800 text-white">
          Signup
        </Button>
        <span className="text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
