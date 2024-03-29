// Importing necessary libraries and components
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

// Defining the validation schema for Step 2 using zod
export const Step2Schema = z.object({
  plan: z.enum(["Arcade", "Advanced", "Pro"]),
  billing: z.enum(["Monthly", "Yearly"]),
  price: z.number(),
});

// Defining the type for the fields in Step 2
type Step2Fields = z.infer<typeof Step2Schema>;
type fields = {
  plan: "Arcade" | "Advanced" | "Pro";
  billing: "Monthly" | "Yearly";
};

// Step2 component
export default function Step2({ setFormData, formData, setCurrentStep }: any) {
  // Initializing the form with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors, isValid },
  } = useForm<Step2Fields>({
    defaultValues: {
      plan: formData.plan || "Arcade",
      billing: formData.billing || "Monthly",
      price: 9,
    },
    resolver: zodResolver(Step2Schema), // Using zod for form validation
  });
  // Watching the values of the plan, billing, and price fields
  const plan = watch("plan");
  const billing = watch("billing");
  const price = watch("price");
  // Function to calculate the price based on the selected plan and billing cycle
  const calculatePrice = ({ plan, billing }: fields) => {
    // Defining the price for each plan and billing cycle
    const prices = {
      Arcade: {
        Monthly: 9,
        Yearly: 90,
      },
      Advanced: {
        Monthly: 12,
        Yearly: 120,
      },
      Pro: {
        Monthly: 15,
        Yearly: 150,
      },
    };

    return setValue("price", prices[plan][billing]);
  };
  // Function to handle form submission
  const savedData: SubmitHandler<Step2Fields> = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep((prev: number) => prev + 1);
  };
  // Function to handle changes in the billing cycle
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("billing", e.target.checked ? "Yearly" : "Monthly");
  };
  register("billing");
  // Using useEffect to recalculate the price whenever the plan or billing cycle changes
  useEffect(() => {
    calculatePrice({ billing, plan });
  }, [billing, plan]);
  return (
    <>
      <form
        id="step2"
        className="relative flex h-full flex-col bg-white xs:min-w-[440px]   "
        onSubmit={handleSubmit(savedData)}
      >
        <div className="flex h-full -translate-y-24 flex-col gap-4 rounded-lg bg-white  px-4 py-8 shadow-3xl shadow-light-blue xs:translate-y-0 xs:p-0 xs:pt-4 xs:shadow-none">
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold text-marine-blue">
              Select your plan
            </div>
            <div className="flex text-cool-gray">
              You have the option of monthly or yearly billing.{" "}
            </div>
          </div>
          <div className="flex h-full flex-col gap-2 xs:grid xs:grid-cols-3">
            <div className="">
              <input
                {...register("plan")}
                name="plan"
                id="arcade"
                className="peer hidden"
                type="radio"
                value={"Arcade"}
              />
              <label
                htmlFor="arcade"
                className="flex rounded-md outline outline-1 outline-light-gray peer-checked:outline-purplish-blue"
              >
                <div className="grid grid-cols-[max-content_1fr]  flex-col gap-x-3 p-3 xs:flex ">
                  <div className="flex items-center xs:h-20 xs:w-24 xs:items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      className=""
                    >
                      <g fill="none" fillRule="evenodd">
                        <circle cx="20" cy="20" r="20" fill="#FFAF7E" />
                        <path
                          fill="#FFF"
                          fillRule="nonzero"
                          d="M24.995 18.005h-3.998v5.998h-2v-5.998H15a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h9.995a1 1 0 0 0 1-1v-9.995a1 1 0 0 0-1-1Zm-5.997 8.996h-2v-1.999h2v2Zm2-11.175a2.999 2.999 0 1 0-2 0v2.18h2v-2.18Z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className=" ">
                    <div className="font-bold text-marine-blue">Arcade</div>
                    <div className="text-sm text-cool-gray">
                      {billing === "Monthly" ? (
                        <div className="">$9/mo</div>
                      ) : (
                        <div className="">$90/yr</div>
                      )}
                    </div>
                  </div>
                  {billing === "Monthly" ? null : (
                    <>
                      {" "}
                      <div></div>
                      <div className="text-sm font-medium text-marine-blue">
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
                className="flex rounded-md outline outline-1 outline-light-gray peer-checked:outline-purplish-blue"
              >
                <div className="grid grid-cols-[max-content_1fr] flex-col gap-x-3  p-3 xs:flex">
                  <div className="flex h-full w-full items-center xs:h-20 xs:w-24 xs:items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                    >
                      <g fill="none" fillRule="evenodd">
                        <circle cx="20" cy="20" r="20" fill="#F9818E" />
                        <path
                          fill="#FFF"
                          fillRule="nonzero"
                          d="M25.057 15H14.944C12.212 15 10 17.03 10 19.885c0 2.857 2.212 4.936 4.944 4.936h10.113c2.733 0 4.943-2.08 4.943-4.936S27.79 15 25.057 15ZM17.5 20.388c0 .12-.108.237-.234.237h-1.552v1.569c0 .126-.138.217-.259.217H14.5c-.118 0-.213-.086-.213-.203v-1.583h-1.569c-.126 0-.217-.139-.217-.26v-.956c0-.117.086-.213.202-.213h1.584v-1.554c0-.125.082-.231.203-.231h.989c.12 0 .236.108.236.234v1.551h1.555c.125 0 .231.083.231.204v.988Zm5.347.393a.862.862 0 0 1-.869-.855c0-.472.39-.856.869-.856.481 0 .87.384.87.856 0 .471-.389.855-.87.855Zm1.9 1.866a.86.86 0 0 1-.87-.852.86.86 0 0 1 .87-.855c.48 0 .87.38.87.855a.86.86 0 0 1-.87.852Zm0-3.736a.862.862 0 0 1-.87-.854c0-.472.39-.856.87-.856s.87.384.87.856a.862.862 0 0 1-.87.854Zm1.899 1.87a.862.862 0 0 1-.868-.855c0-.472.389-.856.868-.856s.868.384.868.856a.862.862 0 0 1-.868.855Z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className=" ">
                    <div className="font-bold text-marine-blue">Advanced</div>
                    <div className="text-sm text-cool-gray">
                      {billing === "Monthly" ? (
                        <div className="">$12/mo</div>
                      ) : (
                        <div className="">$120/yr</div>
                      )}
                    </div>
                  </div>
                  {billing === "Monthly" ? null : (
                    <>
                      {" "}
                      <div></div>
                      <div className="text-sm font-medium text-marine-blue">
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
                id="pro"
                className="peer hidden"
                type="radio"
                value="Pro"
              />
              <label
                htmlFor="pro"
                className="flex rounded-md outline outline-1 outline-light-gray peer-checked:outline-purplish-blue"
              >
                <div className="grid grid-cols-[max-content_1fr] flex-col gap-x-3 p-3 xs:flex">
                  <div className="flex items-center xs:h-20 xs:w-24 xs:items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                    >
                      <g fill="none" fillRule="evenodd">
                        <circle cx="20" cy="20" r="20" fill="#483EFF" />
                        <path
                          fill="#FFF"
                          fillRule="nonzero"
                          d="M26.666 13H13.334A3.333 3.333 0 0 0 10 16.333v7.193a3.447 3.447 0 0 0 2.14 3.24c1.238.5 2.656.182 3.56-.8L18.52 23h2.96l2.82 2.966a3.2 3.2 0 0 0 3.56.8 3.447 3.447 0 0 0 2.14-3.24v-7.193A3.333 3.333 0 0 0 26.666 13Zm-9.333 6H16v1.333a.667.667 0 0 1-1.333 0V19h-1.333a.667.667 0 0 1 0-1.334h1.333v-1.333a.667.667 0 1 1 1.333 0v1.333h1.333a.667.667 0 1 1 0 1.334Zm7.333 2a2.667 2.667 0 1 1 0-5.333 2.667 2.667 0 0 1 0 5.333ZM26 18.333a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className=" ">
                    <div className="font-bold text-marine-blue">Pro</div>
                    <div className="text-sm text-cool-gray">
                      {billing === "Monthly" ? (
                        <div className="">$15/mo</div>
                      ) : (
                        <div className="">$150/yr</div>
                      )}
                    </div>
                  </div>
                  {billing === "Monthly" ? null : (
                    <>
                      {" "}
                      <div></div>
                      <div className="text-sm font-medium text-marine-blue">
                        2 months free
                      </div>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-5">
            <div
              className={`${
                billing === "Monthly" ? ` text-marine-blue` : `text-cool-gray`
              } text-sm font-medium`}
            >
              Monthly
            </div>
            <label
              htmlFor="billing"
              className="relative h-[18px] w-9 rounded-full bg-marine-blue"
            >
              <input
                id="billing"
                type="checkbox"
                onChange={handleChange}
                className="peer sr-only"
                checked={billing === "Yearly"}
                value={"Yearly"}
              />
              <span className="absolute left-1 top-[3px] h-3 w-3 rounded-full bg-white transition-all duration-100 ease-in-out peer-checked:translate-x-4"></span>
            </label>
            <div
              className={`${
                billing !== "Monthly" ? ` text-marine-blue` : `text-cool-gray`
              } text-sm font-medium`}
            >
              Yearly
            </div>
          </div>
        </div>

        <div className="flex h-full w-full justify-end  ">
          <div className="flex w-full items-end justify-between ">
            <button
              type="button"
              onClick={(e) => setCurrentStep((prev: any) => prev - 1)}
              className="bottom-0 flex rounded-md px-4 py-2 text-sm font-medium text-cool-gray "
            >
              Go Back
            </button>{" "}
            <button
              type="submit"
              form="step2"
              className="bottom-0 flex rounded-lg bg-marine-blue px-4 py-2 text-base text-white"
            >
              Next Step
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
