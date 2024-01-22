"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Step1Schema = z.object({
  email: z.string().email({ message: "Please enter a valid Email" }),
});
const Step2Schema = z.object({
  password: z
    .string()
    .min(2, { message: "Password must have a minimum of 2 characters" }),
});

type Step1Fields = z.infer<typeof Step1Schema>;
type Step2Fields = z.infer<typeof Step2Schema>;

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const steps = { 1: Step1, 2: Step2, 3: Step1, 4: Step1 };

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
              // onClick={() => setCurrentStep(Number(step))}
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
          {/* <form
            className="bg-white flex flex-col rounded-md px-6 py-6 -translate-y-24 shadow-light-blue shadow-3xl gap-4"
           
          > */}
          {steps[currentStep as keyof typeof steps]({
            setFormData,
            formData,
            setCurrentStep,
            // register,
            // setCurrentStep,
            // watchInputs,
            // errors,
          })}
          {/* </form> */}
        </div>
      </div>
    </main>
  );
}

function Step1({ setFormData, formData, setCurrentStep }: any) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Step1Fields>({
    resolver: zodResolver(Step1Schema),
  });
  const savedData: SubmitHandler<Step1Fields> = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep((prev: number) => prev + 1);
  };
  return (
    <form
      className="bg-white flex flex-col rounded-md px-6 py-6 -translate-y-24 shadow-light-blue shadow-3xl gap-4"
      onSubmit={handleSubmit(savedData)}
    >
      <div className="flex text-2xl font-bold text-marine-blue">
        Personal Info
      </div>
      <div className="flex text-cool-gray">
        Please provide your name, email address, and phone
      </div>
      <div className="flex flex-col">
        <div className="text-marine-blue text-sm">Name</div>
        <input
          className="text-lg py-2 px-7 w-full  placeholder-cool-gray  border-[1px] rounded-md"
          type="text"
          placeholder="e.g. Stephen King"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-marine-blue text-sm">Email Address</div>
        <input
          className="text-lg py-2 px-7 w-full placeholder-cool-gray border-[1px] rounded-md"
          {...register("email")}
          type="text"
          placeholder="e.g. stephenking@lorem.com"
        />
        {errors.email?.message && <p>{errors.email.message}</p>}
      </div>
      <div className="flex flex-col">
        <div className="text-marine-blue text-sm">Phone Number</div>
        <input
          className="text-lg py-2 px-7 w-full  placeholder-cool-gray  border-[1px] rounded-md"
          type="text"
          placeholder="e.g. +1 234 567 890"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          // disabled={Object.values(watchInputs).some((value) => !value)}
          // onClick={(e) => setCurrentStep((prev: any) => prev + 1)}
          // (e) => setCurrentStep((prev: any) => prev + 1)
          className="flex text-base text-white bottom-0 rounded-md px-4 py-2 bg-marine-blue"
        >
          Next Step
        </button>
      </div>
    </form>
  );
}

function Step2({ setFormData, formData, setCurrentStep }: any) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Step2Fields>({
    resolver: zodResolver(Step2Schema),
  });
  const savedData: SubmitHandler<Step2Fields> = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep((prev: number) => prev + 1);
  };
  return (
    <form
      className="bg-white flex flex-col rounded-md px-6 py-6 -translate-y-24 shadow-light-blue shadow-3xl gap-4"
      onSubmit={handleSubmit(savedData)}
    >
      <div>
        <input
          {...register("password")}
          className="text-lg py-2 px-7 w-full placeholder-cool-gray border-[1px] rounded-md"
          type="text"
          placeholder="e.g. stephenking@lorem.com"
        ></input>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          // disabled={Object.values(watchInputs).some((value) => !value)}
          // onClick={(e) => setCurrentStep((prev: any) => prev + 1)}
          // (e) => setCurrentStep((prev: any) => prev + 1)
          className="flex text-base text-white bottom-0 rounded-md px-4 py-2 bg-marine-blue"
        >
          Next Step
        </button>
        <button
          type="button"
          // disabled={Object.values(watchInputs).some((value) => !value)}
          onClick={(e) => setCurrentStep((prev: any) => prev - 1)}
          // (e) => setCurrentStep((prev: any) => prev + 1)
          className="flex text-base text-white bottom-0 rounded-md px-4 py-2 bg-marine-blue"
        >
          Go Back
        </button>
      </div>
    </form>
  );
}
