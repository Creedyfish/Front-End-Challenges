import { useState } from "react";
import Image from "next/image";
export default function Step5({ setFormData, formData, setCurrentStep }: any) {
  const [popUp, setPopUp] = useState(true);
  const payment = formData.billing === "Monthly" ? "/mo" : "/yr";
  return (
    <>
      {popUp && (
        <div className="fixed right-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-45">
          <div className=" flex h-full  justify-center">
            <div className="flex flex-col gap-2 overflow-hidden rounded-lg bg-white">
              <div className="">
                <Image
                  src={"/images/bg-sidebar-mobile.svg"}
                  width={375}
                  height={172}
                  loading="lazy"
                  alt="Background Image"
                />
              </div>
              <div className="text-center text-2xl font-bold text-marine-blue">
                User Information
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center gap-2 text-sm text-cool-gray">
                  Name:{" "}
                  <div className="text-base font-medium text-marine-blue">
                    {formData.name}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-cool-gray">
                  Email:{" "}
                  <div className="text-base font-medium text-marine-blue">
                    {formData.email}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-cool-gray">
                  Phone:{" "}
                  <div className="text-base font-medium text-marine-blue">
                    {formData.phone}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-cool-gray">
                  Plan:{" "}
                  <div className="text-base font-medium text-marine-blue">
                    <div className="flex gap-4">
                      <div>{formData.plan}</div>
                      <div>
                        ${formData.price}
                        {payment}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-cool-gray">
                  Billing:{" "}
                  <div className="text-base font-medium text-marine-blue">
                    {formData.billing}
                  </div>
                </div>
                <div className="flex gap-2 text-sm text-cool-gray">
                  Addons:
                  <div className="flex flex-col text-base font-medium text-marine-blue">
                    {formData.addOns.map((addOn: any, index: number) => (
                      <div key={index} className="flex justify-between gap-4">
                        <div>{addOn.name} </div>
                        <div>
                          ${addOn.price}
                          {payment}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-marine-blue">
                  Total:{" "}
                  <div className="text-lg font-bold text-marine-blue">
                    ${formData.total}
                    {payment}
                  </div>
                </div>
                <div className="flex justify-center p-2">
                  <button
                    className="rounded-lg bg-marine-blue px-6 py-2 text-white hover:bg-purplish-blue"
                    onClick={() => setPopUp(false)}
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="relative flex h-full flex-col bg-white xs:max-w-[440px]">
        <div className="flex h-full -translate-y-24 flex-col items-center justify-center gap-4 rounded-lg bg-white  px-4 py-20 shadow-3xl shadow-light-blue xs:translate-y-0 xs:p-0 xs:py-8 xs:pt-4 xs:shadow-none">
          <div className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              className="h-14 w-14"
            >
              <g fill="none">
                <circle cx="40" cy="40" r="40" fill="#F9818E" />
                <path
                  fill="#E96170"
                  d="M48.464 79.167c.768-.15 1.53-.321 2.288-.515a40.04 40.04 0 0 0 3.794-1.266 40.043 40.043 0 0 0 3.657-1.63 40.046 40.046 0 0 0 12.463-9.898A40.063 40.063 0 0 0 78.3 51.89c.338-1.117.627-2.249.867-3.391L55.374 24.698a21.6 21.6 0 0 0-15.332-6.365 21.629 21.629 0 0 0-15.344 6.365c-8.486 8.489-8.486 22.205 0 30.694l23.766 23.775Z"
                />
                <path
                  fill="#FFF"
                  d="M40.003 18.333a21.58 21.58 0 0 1 15.31 6.351c8.471 8.471 8.471 22.158 0 30.63-8.47 8.47-22.156 8.47-30.627 0-8.47-8.472-8.47-22.159 0-30.63a21.594 21.594 0 0 1 15.317-6.35Zm9.865 15c-.316.028-.622.15-.872.344l-12.168 9.13-5.641-5.642c-1.224-1.275-3.63 1.132-2.356 2.356l6.663 6.663c.56.56 1.539.63 2.173.156l13.326-9.995c1.122-.816.43-2.993-.956-3.013a1.666 1.666 0 0 0-.17 0Z"
                />
              </g>
            </svg>
          </div>
          <div className="text-2xl font-bold text-marine-blue">Thank you!</div>
          <div className="text-center text-cool-gray">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at support@loremgaming.com
          </div>
        </div>
      </div>
    </>
  );
}
