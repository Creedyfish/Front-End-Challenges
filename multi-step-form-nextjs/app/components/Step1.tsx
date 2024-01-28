import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Defining the validation schema for Step 1 using zod
export const Step1Schema = z.object({
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
// Defining the type for the fields in Step 1
type Step1Fields = Partial<z.infer<typeof Step1Schema>>;
// Step1 component
export default function Step1({ setFormData, formData, setCurrentStep }: any) {
  // Initializing the form with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<Step1Fields>({
    defaultValues: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone?.toString(), // Setting the default values from formData
    },
    resolver: zodResolver(Step1Schema), // Using zod for form validation
  });
  // Function to handle form submission
  const savedData: SubmitHandler<Step1Fields> = (data: any) => {
    setFormData({ ...formData, ...data }); // Saving the form data
    setCurrentStep((prev: number) => prev + 1); // Moving to the next step
  };
  return (
    <>
      <form
        id="step1"
        className=" flex h-full flex-col bg-white xs:min-w-[440px]"
        onSubmit={handleSubmit(savedData)}
      >
        <div className="flex -translate-y-24 flex-col gap-4 rounded-lg bg-white  px-4 py-8 shadow-3xl shadow-light-blue xs:translate-y-0 xs:p-0 xs:pt-4 xs:shadow-none">
          <div className="flex flex-col gap-2">
            <div className="flex text-2xl font-bold text-marine-blue">
              Personal Info
            </div>
            <div className="flex text-cool-gray">
              Please provide your name, email address, and phone.
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="text-sm text-marine-blue">Name</div>
              {errors.name?.message && (
                <div className="text-xs text-strawberry-red">
                  {errors.name.message}
                </div>
              )}
            </div>

            <input
              {...register("name")}
              className={`w-full rounded-lg border-[1px] py-2  pl-7  text-lg placeholder-cool-gray ${
                errors.name && "border-strawberry-red"
              }`}
              type="text"
              placeholder="e.g. Stephen King"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="text-sm text-marine-blue">Email Address</div>{" "}
              {errors.email?.message && (
                <div className="text-xs text-strawberry-red">
                  {errors.email.message}
                </div>
              )}
            </div>

            <input
              className={`w-full rounded-lg border-[1px] py-2 pl-7 text-lg placeholder-cool-gray ${
                errors.email && "border-strawberry-red"
              }`}
              {...register("email")}
              type="text"
              placeholder="e.g. stephenking@lorem.com"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="text-sm text-marine-blue">Phone Number</div>
              {errors.phone?.message && (
                <div className="text-xs text-strawberry-red">
                  {errors.phone.message}
                </div>
              )}
            </div>

            <input
              {...register("phone")}
              className={`w-full rounded-lg border-[1px] py-2  pl-7  text-lg placeholder-cool-gray ${
                errors.phone && "border-strawberry-red"
              }`}
              type="number"
              placeholder="e.g. +1 234 567 890"
            />
          </div>
        </div>
        <div className="flex h-full w-full justify-end  ">
          <div className="flex items-end ">
            {" "}
            <button
              type="submit"
              form="step1"
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
