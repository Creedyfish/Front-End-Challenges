"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";

import Test from "./components/test";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(2);
  const [formData, setFormData] = useState({});

  const steps = { 1: Step1, 2: Step2, 3: Step1, 4: Step1 };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <main className="flex text-base h-full w-full  xs:justify-center xs:items-center ">
      <div className="xs:p-10 p-0 xs:flex">
        <div className="absolute flex w-full justify-center items-center gap-5 p-6 text-white font-medium">
          {Object.keys(steps).map((step) => (
            <div
              key={step}
              className={`rounded-full text-sm border-[1px] w-8 h-8 flex items-center justify-center text-center ${
                Number(step) === currentStep
                  ? "bg-light-blue text-marine-blue border-light-blue"
                  : ""
              }`}
              onClick={() => setCurrentStep(Number(step))}
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
          {steps[currentStep as keyof typeof steps]({
            setFormData,
            formData,
            setCurrentStep,
          })}
        </div>
      </div>
    </main>
  );
}
