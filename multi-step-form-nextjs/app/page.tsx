"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Step1 from "./components/Step1";

const Step2Schema = z.object({
  plan: z.enum(["Arcade", "Advanced", "Pro"]),
  billing: z.enum(["Monthly", "Yearly"]),
});

type Step2Fields = z.infer<typeof Step2Schema>;

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
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

function Step2({ setFormData, formData, setCurrentStep }: any) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<Step2Fields>({
    resolver: zodResolver(Step2Schema),
  });

  const billing = watch("billing") ? "Monthly" : "Yearly";

  const savedData: SubmitHandler<Step2Fields> = (data: any) => {
    setFormData({ ...formData, ...data, billing: billing });

    // setFormData({ ...formData, ...data });
    // setCurrentStep((prev: number) => prev + 1);
  };

  return (
    <form
      className="bg-white flex flex-col rounded-md px-6 py-6 -translate-y-24 shadow-light-blue shadow-3xl gap-4"
      onSubmit={handleSubmit(savedData)}
    >
      <div className="flex text-2xl font-bold text-marine-blue">
        Select your plan
      </div>
      <div className="flex text-cool-gray">
        You have the option of monthly or yearly billing.{" "}
      </div>
      <div>
        <input
          {...register("plan")}
          name="plan"
          id="arcade"
          className="peer hidden"
          type="radio"
          value="Arcade"
          defaultChecked
        />
        <label
          htmlFor="arcade"
          className="flex rounded-md peer-checked:outline outline-1 outline-purplish-blue"
        >
          <div className="grid grid-cols-[max-content_1fr] p-3 gap-x-3">
            <div className="flex items-center">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <g fill="none" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" fill="#FFAF7E" />
                  <path
                    fill="#FFF"
                    fill-rule="nonzero"
                    d="M24.995 18.005h-3.998v5.998h-2v-5.998H15a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h9.995a1 1 0 0 0 1-1v-9.995a1 1 0 0 0-1-1Zm-5.997 8.996h-2v-1.999h2v2Zm2-11.175a2.999 2.999 0 1 0-2 0v2.18h2v-2.18Z"
                  />
                </g>
              </svg>
            </div>
            <div className=" ">
              <div className="font-bold text-marine-blue">Arcade</div>
              <div>
                {billing === "Monthly" ? <div>$9/mo</div> : <div>$90/yr</div>}
              </div>
            </div>
            {billing === "Monthly" ? null : (
              <>
                {" "}
                <div></div>
                <div className="text-marine-blue text-sm font-medium">
                  2 months free
                </div>
              </>
            )}
          </div>
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
        <label
          htmlFor="advanced"
          className="peer-checked:outline outline-1 outline-purplish-blue"
        >
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
        <label
          htmlFor="pro"
          className="peer-checked:outline outline-1 outline-purplish-blue"
        >
          Pro
        </label>
      </div>
      <div>
        <input {...register("billing")} type="checkbox" />
      </div>
      {/* <div className="flex gap-6">
        <div>
          <input
            {...register("billing")}
            id="monthly"
            name="billing"
            className="peer hidden"
            type="radio"
            defaultChecked
            value={"Monthly"}
          />
          <label htmlFor="monthly" className="peer-checked:bg-slate-950">
            Monthly
          </label>
        </div>
        <label htmlFor="monthly">sdasdsd</label>
        <div>
          <input
            {...register("billing")}
            name="billing"
            id="yearly"
            className="peer hidden"
            type="radio"
            value={"Yearly"}
          />
          <label htmlFor="yearly" className="peer-checked:bg-slate-950">
            Yearly
          </label>
        </div>
      </div> */}
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
