import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, userSchema } from "./types/UserSchema";
import { variables } from "../constants";
import { Link } from "react-router-dom";

export function Register(){
  const {register, formState:{errors}, getValues,handleSubmit}=useForm<userSchema>({
    mode:"all",
    resolver: zodResolver(UserSchema)})
  const onSubmit=()=>{
    console.log("submit");
    fetch(`${variables.API_URL}/api/account/register`,
      {
        method: "POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        Username: getValues("name"),
        Email:getValues("email"),
        Password:getValues("password")
      })
    }).then(res=>res.json()).then(result=>(console.log(result))).catch(error=>console.log(error))
  }
    return (
    <form onSubmit={handleSubmit(onSubmit) }
    className="flex flex-col m-auto mt-5 sm:mt-14 p-5 h-2/3 w-3/5 sm:w-2/5 bg-black rounded-xl items-center">
      <h1 className="text-center text-2xl sm:text-3xl text-white">Register</h1>
        <input {...register('name')}
        placeholder="Username"
        className="p-2 border rounded-xl w-3/5 mt-5"/>
        <span className=" text-red-500">{errors && errors.name?.message}</span>
        <input {...register("email")}
        placeholder="email"
        className="p-2 border rounded-xl w-3/5 mt-5"/>
        <span className=" text-red-500">{errors && errors.email?.message}</span>
        <input {...register('password')}
        type="password"
        placeholder="password"
        className="p-2 border rounded-xl w-3/5 mt-5"/>
         <span className=" text-red-500">{errors && errors.password?.message}</span> 
         <input {...register('confirmPassword')
          
         }
         type="password"
        placeholder="confirm password"
        className="p-2 border rounded-xl w-3/5 mt-5"/>
        <span className=" text-red-500">{errors && errors.confirmPassword?.message}</span>
         <button type="submit"
         className="mt-5 bg-pink rounded-lg p-2 w-1/3 text-white">Sign Up</button>
         <Link to='/login' className="text-white pt-2 text-decoration-line: underline hover:cursor-pointer">Already a user? Click here to sign in</Link> 
    </form>
  )
} 

