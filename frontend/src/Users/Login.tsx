import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { variables } from "../constants";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from '../redux/api/apiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/AuthSlice';
import { setUser } from '../redux/slices/UserSlice';
import { LoginSchema, loginSchema } from "./types/UserSchema";

export function Login() {
  const { register, formState: { errors }, handleSubmit } = useForm<loginSchema>({
    mode: "all",
    resolver: zodResolver(LoginSchema)
  });

  const [loginUser, { isLoading, isSuccess, isError, error }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data: loginSchema) => {
    try {
      const response = await loginUser(data).unwrap();
      dispatch(setCredentials({ token: response.token }));
      dispatch(setUser({ username: response.username, email: response.email }));
      console.log('User logged in successfully', response);
    } catch (err) {
      console.error('Failed to log in user: ', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col m-auto mt-5 sm:mt-14 p-5 h-2/3 w-3/5 sm:w-2/5 bg-black rounded-xl items-center">
      <h1 className="text-center text-2xl sm:text-3xl text-white">Login</h1>
      
      <input {...register('username')}
        placeholder="Username"
        className="p-2 border rounded-xl w-3/5 mt-5" />
      <span className="text-red-500">{errors.username?.message?.toString()}</span>
      
      <input {...register('password')}
        type="password"
        placeholder="Password"
        className="p-2 border rounded-xl w-3/5 mt-5" />
      <span className="text-red-500">{errors.password?.message?.toString()}</span>
      
      <button type="submit"
        className="mt-5 bg-pink rounded-lg p-2 w-1/3 text-white">Login</button>
        <Link to='/' className="text-white pt-2 text-decoration-line: underline hover:cursor-pointer">New user? Click here to register</Link> 
    </form>
  );
}
