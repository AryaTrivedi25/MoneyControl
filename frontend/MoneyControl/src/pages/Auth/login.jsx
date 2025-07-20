import React, { useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //Handle login 
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if(password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if(!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    //Login API
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {email, password});

      const {token, user} = response.data;

      if(token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch (error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <AuthLayout>
      <div className="lg:w[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome !</h3>
        <p className="text-xs text-slate-70 mt-[5px] mb-6">Please Enter you Login Details</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="Enter your email"
            type="email"

          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder=""
            type="password"

          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="btn-primary"
            >Login</button>

          <p className="text-xs text-slate-500 mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up here
            </span>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login;