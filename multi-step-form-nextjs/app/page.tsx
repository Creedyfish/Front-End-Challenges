"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [1, 2, 3, 4];

  return (
    <main className="flex text-base h-full w-full  xs:justify-center xs:items-center ">
      <div className="xs:p-10 p-0 xs:flex">
        <div className="absolute flex w-full justify-center items-center gap-5 p-6 text-white font-medium">
          {steps.map((step) => (
            <div
              key={step}
              className={`rounded-full text-sm border-[1px] w-8 h-8 flex items-center justify-center text-center ${
                step === currentStep
                  ? "bg-light-blue text-marine-blue border-light-blue"
                  : ""
              }`}
              onClick={() => setCurrentStep(step)}
            >
              {step}
            </div>
          ))}
        </div>
        <Image
          className="xs:hidden"
          width={375}
          height={172}
          src={"images/bg-sidebar-mobile.svg"}
          alt="Mobile-SideBar"
        />
        <Image
          className="xs:block hidden"
          width={375}
          height={172}
          src={"images/bg-sidebar-desktop.svg"}
          alt="Desktop-SideBar"
        />
        <div className="flex flex-col w-full h-full gap-3 bg-white p-4">
          <div className="bg-white flex flex-col rounded-md px-6 py-6 -translate-y-24 shadow-light-blue shadow-3xl gap-4">
            <div className="flex text-2xl font-bold text-marine-blue">
              Personal Info
            </div>
            <div className="flex text-cool-gray">
              {" "}
              Please provide your name, email address, and phone
            </div>
            <div className="flex flex-col">
              <div className="text-marine-blue text-sm">Name</div>
              <input
                className="text-lg py-2 px-7 w-full  placeholder-cool-gray  border-[1px] rounded-md"
                type="text"
                required={true}
                placeholder="e.g. Stephen King"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-marine-blue text-sm">Email Address</div>
              <input
                className="text-lg py-2 px-7 w-full placeholder-cool-gray border-[1px] rounded-md"
                type="text"
                required={true}
                placeholder="e.g. stephenking@lorem.com"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-marine-blue text-sm">Phone Number</div>
              <input
                className="text-lg py-2 px-7 w-full  placeholder-cool-gray  border-[1px] rounded-md"
                type="text"
                required={true}
                placeholder="e.g. +1 234 567 890"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="flex text-base text-white bottom-0 rounded-md px-4 py-2 bg-marine-blue">
              Next Step
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
