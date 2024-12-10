/* eslint-disable */

// components/Login.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaPaperPlane } from "react-icons/fa";
import { LoginType } from "@/@types";
import { useAuth } from "@/lib/auth-provider";
import { useDispatch } from "react-redux";

function Login(): JSX.Element {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
    // rememberMe: false,
  });

  const { login, loading } = useAuth();

  const handleInputChange = (valueType: string, value: string | boolean) => {
    setFormData({ ...formData, [valueType]: value });
  };

  const submitForm = async (values: LoginType) => {
    if (loading) return;
    try {
      const success = await login(values);
      if (success !== null) {
        router.push("/dashboard");
        //dispatch(setUserDetails({user: success, isAuthenticated :true}));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div
          className="hidden lg:flex items-center justify-center flex-1 bg-black text-black"
          style={{
            backgroundImage: 'url("/images/hero-login.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-md text-center">
            <Image
              src={"login.svg"}
              alt="login icon"
              width={450}
              height={450}
              className="select-none"
            />
          </div>
        </div>
        <div
          className="bg-[#020202] flex flex-1 items-center justify-center"
          style={{
            backgroundImage: 'url("/images/corner-bg-login.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "top left",
          }}
        >
          <div className="max-w-md w-full p-6">
            <Image
              src="logo.svg"
              alt="Company Logo"
              width={100}
              height={100}
              className="w-full pr-5 select-none"
            />
            <h1 className="text-3xl font-semibold mb-6 text-white text-center select-none">
              Sign In
            </h1>
            <h1 className="text-sm font-semibold mb-8 text-gray-300 text-center select-none">
              Sign in to Access the HR Department Management System
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm(formData);
              }}
              style={{ position: "relative", top: "-1rem" }}
            >
              <Input
                onChange={(e) => handleInputChange("email", e.target.value)}
                isClearable
                label="Email"
                placeholder="Email"
                className="w-full my-4 border-2 rounded-xl overflow-hidden"
              />
              <Input
                onChange={(e) => handleInputChange("password", e.target.value)}
                label="Password"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <FaEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full my-4 border-2 rounded-xl overflow-hidden"
              />

              <Checkbox defaultSelected className="mb-2">
                <div className="text-sm text-gray-300">Remember me</div>
              </Checkbox>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                style={{
                  backgroundColor: "#0c57fa",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  border: "0px",
                }}
              >
                Login
              </Button>
            </form>
            <div className="mt-4 text-sm text-gray-300 text-center">
              <p className="select-none">or with</p>
            </div>
            <div className="mt-4 flex flex-row items-center justify-between gap-2">
              <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
                <Button
                  type="button"
                  className="w-full flex justify-center items-center gap-2"
                  startContent={<FcGoogle className="text-lg" />}
                >
                  Sign In with Google
                </Button>
              </div>
              <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
                <Button
                  type="button"
                  className="w-full flex justify-center items-center gap-2"
                  startContent={<FaPaperPlane className="text-lg" />}
                >
                  Sign In with Lark
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
