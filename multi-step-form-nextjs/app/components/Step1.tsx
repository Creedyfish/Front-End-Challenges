import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

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

type Step1Fields = Partial<z.infer<typeof Step1Schema>>;

export default function Step1({ setFormData, formData, setCurrentStep }: any) {
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
      phone: formData.phone?.toString(),
    },
    resolver: zodResolver(Step1Schema),
  });
  const savedData: SubmitHandler<Step1Fields> = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep((prev: number) => prev + 1);
  };
  return (
    <>
      <form
        id="step1"
        className="bg-white flex flex-col rounded-md px-6 py-6 -translate-y-24 shadow-light-blue shadow-3xl gap-4"
        onSubmit={handleSubmit(savedData)}
      >
        <div className="flex flex-col">
          <div className="flex text-2xl font-bold text-marine-blue">
            Personal Info
          </div>
          <div className="flex text-cool-gray">
            Please provide your name, email address, and phone.
          </div>
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
              errors.name && "border-strawberry-red"
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
              errors.email && "border-strawberry-red"
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
              errors.phone && "border-strawberry-red"
            }`}
            type="number"
            placeholder="e.g. +1 234 567 890"
          />
        </div>
      </form>
      <div className="flex w-full justify-end">
        <button
          type="submit"
          form="step1"
          className="flex text-base text-white bottom-0 rounded-md px-4 py-2 bg-marine-blue"
        >
          Next Step
        </button>
      </div>
      <DevTool control={control} />
    </>
  );
}
