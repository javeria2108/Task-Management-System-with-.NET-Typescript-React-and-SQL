import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, userSchema } from "../Schemas/UserSchema";
import { Link } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/api/authApi"
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Register() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<userSchema>({
    mode: "all",
    resolver: zodResolver(UserSchema),
  });

  const [registerUser] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [apiErrors, setApiErrors] = useState<{ code: string; description: string }[]>([]);

  const onSubmit = async (data: userSchema) => {
    const { confirmPassword, ...userData } = data; // omit confirmPassword
    try {
      const user = await registerUser(userData).unwrap();
      dispatch(setUser({ id: user.Id, username: user.username, email: user.email }));
      console.log("User registered successfully: ", user.role);
      navigate("/layout");
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        console.error("Failed to register user: ", (err as { data: any }).data);
        setApiErrors((err as { data: { code: string; description: string }[] }).data);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col m-auto mt-5 sm:mt-14 p-5 h-2/3 w-3/5 sm:w-2/5 bg-black rounded-xl items-center"
    >
      <h1 className="text-center text-2xl sm:text-3xl text-white">Register</h1>
      <input
        {...register("username")}
        placeholder="Username"
        className="p-2 border rounded-xl w-3/5 mt-5"
      />
      <span className=" text-red-500">
        {errors && errors.username?.message}
      </span>
      <input
        {...register("email")}
        placeholder="email"
        className="p-2 border rounded-xl w-3/5 mt-5"
      />
      <span className=" text-red-500">{errors && errors.email?.message}</span>
      <input
        {...register("password")}
        type="password"
        placeholder="password"
        className="p-2 border rounded-xl w-3/5 mt-5"
      />
      <span className=" text-red-500">
        {errors && errors.password?.message}
      </span>
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="confirm password"
        className="p-2 border rounded-xl w-3/5 mt-5"
      />
      <span className=" text-red-500">
        {errors && errors.confirmPassword?.message}
      </span>
      <button
        type="submit"
        className="mt-5 bg-green rounded-lg p-2 w-1/3 text-white"
      >
        Sign Up
      </button>
      {apiErrors && apiErrors.length > 0 && (
        <div className="text-red-500 p-2">
          {apiErrors.map((error, index) => (
            <p key={index}>{error.description}</p>
          ))}
        </div>
      )}
      <Link
        to="/login"
        className="text-white pt-2 text-decoration-line: underline hover:cursor-pointer"
      >
        Already a user? Click here to sign in
      </Link>
    </form>
  );
}
