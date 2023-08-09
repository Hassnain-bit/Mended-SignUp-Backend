import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';  
import logo from "../images/logo.svg";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the navigate object
  const navigate = useNavigate();

  const handleSignIn = () => {
    // const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sign-in successful
        const user = userCredential.user;
        console.log("User signed in:", user);
        // Additional actions after successful sign-in
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error during sign-in");
        // Handle the error (e.g., display a message to the user)
      });
  };
  return (
    <main>
      <section className="h-screen">
        <div className="h-full">
          {/* Left column container with background*/}
          <div className="h-full flex flex-col md:flex-row items-center">
            <div className="mb-12 md:mb-0 h-48 md:h-full w-full md:w-1/2 bg-black">
              <img
                className="mx-auto"
                style={{ width: "70%", height: "100%" }}
                src={logo}
                alt="logo"
              />
            </div>
            {/* Right column container */}
            <div className="mb-12 md:mb-0 w-full md:w-5/12 px-8 md:pr-0 md:pl-20">
              <form>
                {/*Sign in section*/}
                <div className="flex flex-row border-b border-neutral-300 pb-3 mb-6 items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-lg">Admin Panel Login</p>
                </div>

                {/* Email input */}
                <div className="relative mb-6">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" bg-neutral-100 w-full py-1 px-4 h-12 rounded-md  placeholder:text-[#00000080]"
                  />
                </div>
                {/* Password input */}
                <div className="relative mb-6">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" bg-neutral-100 w-full py-1 px-4 h-12 rounded-md  placeholder:text-[#00000080]"
                  />
                </div>

                {/* Login button */}
                <div className="text-center lg:text-left">
                  <button
                    type="button"
                    className="inline-block bg-black border-[1.5px] border-[#97D5D5] rounded-full px-10 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={handleSignIn}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminSignIn;
