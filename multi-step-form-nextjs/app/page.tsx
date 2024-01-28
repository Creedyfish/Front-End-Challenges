"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";

export default function Page() {
  const steps = {
    1: "YOUR INFO",
    2: "SELECT PLAN",
    3: "ADD-ONS",
    4: "SUMMARY",
  };
  const [formData, setFormData] = useState({});
  const [final, setFinal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  console.log(formData);
  return (
    <main className="flex text-base h-full w-full xs:justify-center xs:items-center min-w-[376px] xs:min-w-[800px]">
      <div className="xs:p-4 0 xs:flex bg-white rounded-lg xs:shadow-2xl xs:drop-shadow-xl xs:shadow-light-blue ">
        <div className="relative xs:w-[30%]">
          <div className="absolute flex xs:flex-col xs:items-start w-full justify-center items-center gap-4 p-8 text-white font-medium">
            {Object.entries(steps).map(([step, value]) => (
              <div key={step} className="flex items-center gap-4">
                <div
                  className={`rounded-full text-sm border-[1px] w-8 h-8 flex items-center justify-center text-center select-none ${
                    Number(step) === currentStep
                      ? "bg-light-blue text-marine-blue border-light-blue"
                      : ""
                  }`}
                >
                  {step}
                </div>
                <div className="hidden xs:block">
                  <div className="text-xs font-normal text-cool-gray">
                    STEP {step}
                  </div>
                  <div className="text-sm font-medium text-white tracking-widest">
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
            className="xs:block hidden"
            width={375}
            height={172}
            src={"images/bg-sidebar-desktop.svg"}
            alt="Desktop-SideBar"
          />
        </div>
        <div className="xs:w-[70%]">
          <div className="flex justify-center items-center w-full h-full  bg-white p-4">
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
