import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, userSchema } from "./types/UserSchema";
import { variables } from "../constants";

export function Register(){
  const {register, formState:{errors}, getValues,handleSubmit}=useForm<userSchema>({
    mode:"all",
    resolver: zodResolver(UserSchema)})
  const onSubmit=()=>{
    console.log("submit");
    fetch(`${variables.API_URL}/users`,
      {
        method: "POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        Name: getValues("name"),
        Email:getValues("email"),
        Password:getValues("password")
      })
    }).then(res=>res.json()).then(result=>(console.log(result))).catch(error=>console.log(error))
  }
    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')}
        placeholder="Username"/>
        <span>{errors && errors.name?.message}</span>
        <input {...register("email")}
        placeholder="email"/>
        <span>{errors && errors.email?.message}</span>
        <input {...register('password')}
        placeholder="password"/>
         <span>{errors && errors.password?.message}</span> 
         <input {...register('confirmPassword')
          
         }
        placeholder="confirm password"/>
        <span>{errors && errors.confirmPassword?.message}</span>
         <button type="submit">Sign Up</button>
    </form>
  )
}

