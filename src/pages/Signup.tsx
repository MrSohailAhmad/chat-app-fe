import { useState } from "react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import AuthLayout from "./AuthLayout";

const SignUp = () => {
  const signup = useAuthStore((state: any) => state.login);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      console.log("formData", formData);

      const response = await signup(formData);
      console.log("res", response);
      if (response) {
        toast.success("Signup successfully");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error?.message || "An error occurred"
      );
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen sm:flex sm:flex-row-reverse mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            {/* <img src="" className="mb-3" /> */}
            <h1 className="mb-3 font-bold text-4xl">Hi ? Welcome to the App</h1>
            <p className="pr-3">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign Up </h3>
              <p className="text-gray-500">Please sign up your account.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Name
                </label>
                <input
                  className=" w-full text-black px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Email
                </label>
                <input
                  className=" w-full text-black px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  placeholder="mail@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  className="w-full content-center text-black px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  placeholder="Enter your password"
                />
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-green-400 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div> */}
              <div>
                <button
                  onClick={handleSubmit}
                  className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <Link to="/login" className="cursor-pointer hover:text-green-500">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
export default SignUp;

// STARTER CODE FOR THE SIGNUP COMPONENT
// import GenderCheckbox from "./GenderCheckbox";

// const SignUp = () => {
// 	return (
// 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Sign Up <span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form>
// 					<div>
// 						<label className='label p-2'>
// 							<span className='text-base label-text'>Full Name</span>
// 						</label>
// 						<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' />
// 					</div>

// 					<div>
// 						<label className='label p-2 '>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
// 						<input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Enter Password'
// 							className='w-full input input-bordered h-10'
// 						/>
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Confirm Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Confirm Password'
// 							className='w-full input input-bordered h-10'
// 						/>
// 					</div>

// 					<GenderCheckbox />

// 					<a className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
// 						Already have an account?
// 					</a>

// 					<div>
// 						<button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default SignUp;
