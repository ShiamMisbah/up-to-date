"use client";

import React from "react";
import Image from "next/image";
import LoginForm from "@/app/components/forms/LoginForm";
import Link from "next/link";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="container flex flex-col lg:flex-row lg:justify-center lg:gap-10 items-center justify-center bg-mainBg m-auto py-12.5">
      <div className="lg:flex-2 lg:max-w-[45%]">
        <Image
          src="/images/login.png"
          alt="Login"
          width={1269}
          height={1240}
          className="w-full"
        />
      </div>
      <div className=" w-full px-3 text-center lg:flex-1 lg:max-w-104">
        <div className="bg-white w-full mt-7.5 p-12 flex flex-col">
          <div className="mx-18 mb-4.5">
            <Image
              src="/images/logo.svg"
              alt="Login"
              width={158}
              height={33}
              className="w-full"
            />
          </div>
          <h4 className="text-textColor mb-2 text-md">Welcome Back</h4>
          <h2 className="text-mainTextColor text-[22px] mb-12.5">
            Login to your account
          </h2>
          <LoginForm />
          <h3 className="text-sm text-textGray">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Create New Account
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default page;
