"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Step1Schema = z.object({
  name: z.string().min(1, { message: "This Field is Required" }),
  email: z
    .string()
    .min(1, { message: "This Field is Required" })
    .email({ message: "Please enter a valid Email" }),
  phone: z
    .string()
    .min(1, { message: "This Field is Required" })
    .transform((data) => Number(data)),
});

const Step2Schema = z.object({
  plan: z.enum(["Arcade", "Advanced", "Pro"]),
  billing: z.enum(["Monthly", "Yearly"]),
});

type Step1Fields = z.infer<typeof Step1Schema>;
type Step2Fields = z.infer<typeof Step2Schema>;

export default function Home() {
  const [currentStep, setCurrentStep] = useState(2);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const steps = { 1: Step1, 2: Step2, 3: Step1, 4: Step1 };
  console.log(formData);
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
        <div className="flex items-center justify-between">
          <div className="text-marine-blue text-sm">Name</div>
          {errors.name?.message && (
            <div className="text-xs text-strawberry-red">
              {errors.name.message}
            </div>
          )}
        </div>

        <input
          {...register("name")}
          className={`text-lg py-2 px-7 w-full  placeholder-cool-gray  border-[1px] rounded-md ${
            errors.name && "border-red-500"
          }`}
          type="text"
          placeholder="e.g. Stephen King"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="text-marine-blue text-sm">Email Address</div>{" "}
          {errors.email?.message && (
            <div className="text-xs text-strawberry-red">
              {errors.email.message}
            </div>
          )}
        </div>

        <input
          className={`text-lg py-2 px-7 w-full placeholder-cool-gray border-[1px] rounded-md ${
            errors.email && "border-red-500"
          }`}
          {...register("email")}
          type="text"
          placeholder="e.g. stephenking@lorem.com"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="text-marine-blue text-sm">Phone Number</div>
          {errors.phone?.message && (
            <div className="text-xs text-strawberry-red">
              {errors.phone.message}
            </div>
          )}
        </div>

        <input
          {...register("phone")}
          className={`text-lg py-2 px-7 w-full  placeholder-cool-gray  border-[1px] rounded-md ${
            errors.phone && "border-red-500"
          }`}
          type="number"
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
    // setCurrentStep((prev: number) => prev + 1);
  };
  return (
    <form
      className="bg-white flex flex-col rounded-md px-6 py-6 -translate-y-24 shadow-light-blue shadow-3xl gap-4"
      onSubmit={handleSubmit(savedData)}
    >
      <div>
        <input
          {...register("plan")}
          name="plan"
          id="arcade"
          className="peer hidden"
          type="radio"
          value="Arcade"
        />
        <label htmlFor="arcade" className="peer-checked:bg-slate-950">
          Arcade
        </label>
      </div>
      <div>
        <input
          {...register("plan")}
          name="plan"
          id="advanced"
          className="peer hidden"
          type="radio"
          value="Advanced"
        />
        <label htmlFor="advanced" className="peer-checked:bg-slate-950">
          Advanced
        </label>
      </div>
      <div>
        <input
          {...register("plan")}
          name="plan"
          id="pro"
          className="peer hidden"
          type="radio"
          value="Pro"
        />
        <label htmlFor="pro" className="peer-checked:bg-slate-950">
          Pro
        </label>
      </div>
      <div className="flex gap-6">
        <div>
          <input
            {...register("billing")}
            id="monthly"
            name="billing"
            className="peer hidden"
            type="radio"
            value="Monthly"
          />
          <label htmlFor="monthly" className="peer-checked:bg-slate-950">
            Monthly
          </label>
        </div>
        <div>
          <input
            {...register("billing")}
            name="billing"
            id="yearly"
            className="peer hidden"
            type="radio"
            value="Yearly"
          />
          <label htmlFor="yearly" className="peer-checked:bg-slate-950">
            Yearly
          </label>
        </div>
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
          // onClick={(e) => setCurrentStep((prev: any) => prev - 1)}
          // (e) => setCurrentStep((prev: any) => prev + 1)
          className="flex text-base text-white bottom-0 rounded-md px-4 py-2 bg-marine-blue"
        >
          Go Back
        </button>
      </div>
    </form>
  );
}
