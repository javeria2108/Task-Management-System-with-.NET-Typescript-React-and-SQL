import { useForm } from "react-hook-form";
import { variables } from "../constants";

export function Login() {
  const { register, formState: { errors }, getValues, handleSubmit } = useForm({
    mode: "all"
  });

  const onSubmit = () => {
    console.log("submit");
    fetch(`${variables.API_URL}/api/account/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: getValues("username"),
        Password: getValues("password")
      })
    })
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(error => console.log(error));
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
      <p className="text-white pt-2 text-decoration-line: underline hover:cursor-pointer">New User? Click here to Register</p>
    </form>
  );
}
