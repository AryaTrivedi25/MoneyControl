import React, {useState} from 'react'
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const SignUp = () => {
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if(password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }


    setError("");

    // Sign Up API logic here
    // On success, redirect to login or dashboard
  }
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-tl font-semibold text-black'> Create Account Now</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below</p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profile} setImage = {setProfile}></ProfilePhotoSelector>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value = {fullName}
              onChange = {({ target }) => setFullName(target.value)}
              label = "Full Name"
              placeholder = "Enter your full name"
              type = "text"
            />
            
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
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="btn-primary"
            >SignUp</button>

          <p className="text-xs text-slate-500 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </form>
      
      </div>

    </AuthLayout>
  )
}

export default SignUp