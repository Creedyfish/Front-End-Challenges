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
function page() {
  const steps = [1, 2, 3, 4];
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(3);
  console.log(formData);
  return (
    <main className="flex text-base h-full w-full xs:justify-center xs:items-center min-w-[376px]">
      <div className="xs:p-10 p-0 xs:flex relative">
        <div className="absolute flex w-full justify-center items-center gap-5 p-6 text-white font-medium">
          {steps.map((step) => (
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
        <div className="flex flex-col items-center w-full h-full gap-3 bg-white p-4">
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
        </div>
      </div>
    </main>
  );
}

export default page;
// import Step1 from "./components/Step1";
// import Step2 from "./components/Step2";
// import Step3 from "./components/Step3";

// export default function Home() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({});

//   const steps = { 1: Step1, 2: Step2, 3: Step3, 4: Step1 };

//   useEffect(() => {
//     console.log(formData);
//   }, [formData, currentStep]);

//   return (
//     <main className="flex text-base h-full w-full  xs:justify-center xs:items-center ">
//       <div className="xs:p-10 p-0 xs:flex">
//         <div className="absolute flex w-full justify-center items-center gap-5 p-6 text-white font-medium">
//           {Object.keys(steps).map((step) => (
//             <div
//               key={step}
//               className={`rounded-full text-sm border-[1px] w-8 h-8 flex items-center justify-center text-center ${
//                 Number(step) === currentStep
//                   ? "bg-light-blue text-marine-blue border-light-blue"
//                   : ""
//               }`}
//               onClick={() => setCurrentStep(Number(step))}
//             >
//               {step}
//             </div>
//           ))}
//         </div>
//         <Image
//           className="xs:hidden"
//           width={375}
//           height={172}
//           src={"images/bg-sidebar-mobile.svg"}
//           alt="Mobile-SideBar"
//         />
//         <Image
//           className="xs:block hidden"
//           width={375}
//           height={172}
//           src={"images/bg-sidebar-desktop.svg"}
//           alt="Desktop-SideBar"
//         />
//         <div className="flex flex-col w-full h-full gap-3 bg-white p-4">
//           {currentStep === 1 && (
//     <section>
//     <Step1
//       setFormData={setFormData}
//       formData={formData}
//       setCurrentStep={setCurrentStep}
//     />
//   </section>
// )}
// {currentStep === 2 && (
//   <section>
//     <Step2
//       setFormData={setFormData}
//       formData={formData}
//       setCurrentStep={setCurrentStep}
//     />
//   </section>
// )}
// {currentStep === 3 && (
//   <section>
//     ThIRD STEP
//     <input type="text" className="bg-slate-400" />
//     <button
//       type="button"
//       className="bg-red-500"
//       onClick={() => setCurrentStep((prev: number) => prev - 1)}
//     >
//       Back
//     </button>
//   </section>
// )}
//         </div>
//       </div>
//     </main>
//   );
// }
