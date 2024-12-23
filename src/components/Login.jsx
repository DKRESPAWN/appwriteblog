import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); //both ek event hi hai
  const [error, setError] = useState("");

  const login = async (data) => {
    setError(""); //whenever we are setting login, always setError as empty
    try {
      const session = await authService.login(data); //tries to log in the user by calling authService.login(data), passing in the form data
      // If the login is successful, it returns a session object, which indicates that the user is authenticated.
      if (session) {
        //agar session hai to logged in hai
        const userData = await authService.getCurrentUser(); //If the session exists, this line fetches the logged-in user's data using authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData));
        //If userData is successfully retrieved, the function dispatches an action (authLogin) to update the global Redux store with the user's data.
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10 `}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all diration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          {/* handleSubmit ek method hai jaha hum apna method dete hain ki bhai hum ISS tarah se handle karna chaunga
        handleSubmit ab ek keyword banchuka hai kyuki ye hamare pass useForm se aya hai aur ye apne aap mein ek METHOD hai
        so please dont make your method named handleSubmit
        ---> handleSubmit ek event bhi hai*/}
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {/* this name inside register should be unique for each input.. for eg if this input is for email then use "email" */}
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
