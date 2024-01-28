"use client";
// Importing necessary libraries and components
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
// Page component
export default function Page() {
  // Defining the steps of the process
  const steps = {
    1: "YOUR INFO",
    2: "SELECT PLAN",
    3: "ADD-ONS",
    4: "SUMMARY",
  };
  // Using useState to manage the form data, the final state, and the current step
  const [formData, setFormData] = useState({});
  const [final, setFinal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  // Logging the form data to the console
  console.log(formData);
  // The component returns a JSX element
  return (
    <main className="flex h-full w-full min-w-[376px] text-base xs:min-w-[800px] xs:items-center xs:justify-center">
      <div className="rounded-lg bg-white xs:flex xs:p-4 xs:shadow-2xl xs:shadow-light-blue xs:drop-shadow-xl ">
        <div className="relative xs:w-[30%]">
          <div className="absolute flex w-full items-center justify-center gap-4 p-8 font-medium text-white xs:flex-col xs:items-start">
            {Object.entries(steps).map(([step, value]) => (
              <div key={step} className="flex items-center gap-4">
                <div
                  className={`flex h-8 w-8 select-none items-center justify-center rounded-full border-[1px] text-center text-sm ${
                    Number(step) === currentStep
                      ? "border-light-blue bg-light-blue text-marine-blue"
                      : ""
                  }`}
                >
                  {step}
                </div>
                <div className="hidden xs:block">
                  <div className="text-xs font-normal text-cool-gray">
                    STEP {step}
                  </div>
                  <div className="text-sm font-medium tracking-widest text-white">
                    {value}
                  </div>
                </div>
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
            className="hidden xs:block"
            width={375}
            height={172}
            src={"images/bg-sidebar-desktop.svg"}
            alt="Desktop-SideBar"
          />
        </div>
        <div className="xs:w-[70%]">
          <div className="flex h-full w-full items-center justify-center  bg-white p-4">
            {currentStep === 1 && (
              <Step1
                setFormData={setFormData}
                formData={formData}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 2 && (
              <Step2
                setFormData={setFormData}
                formData={formData}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 3 && (
              <Step3
                setFormData={setFormData}
                formData={formData}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 4 && (
              <Step4
                setFormData={setFormData}
                formData={formData}
                setCurrentStep={setCurrentStep}
                setFinal={setFinal}
                final={final}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
