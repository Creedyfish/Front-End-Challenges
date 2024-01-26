import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

export const Step3Schema = z.object({
  addOns: z.array(
    z.union([
      z.object({
        name: z.literal("Online service"),
        price: z.enum(["1", "10"]),
      }),
      z.object({
        name: z.literal("Larger storage"),
        price: z.enum(["2", "20"]),
      }),
      z.object({
        name: z.literal("Customizable Storage"),
        price: z.enum(["2", "20"]),
      }),
    ])
  ),
});

type Step3Fields = z.infer<typeof Step3Schema>;

export default function Step3({ setFormData, formData, setCurrentStep }: any) {
  const billing = formData.billing || "Yearly";
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,

    control,
    formState: { errors, isValid },
  } = useForm<Step3Fields>({
    defaultValues: {
      // addOns: [
      //   {
      //     name: "Online service",
      //     price: billing === "Monthly" ? "1" : "10",
      //   },
      //   {
      //     name: "Larger storage",
      //     price: billing === "Monthly" ? "2" : "20",
      //   },
      // ],
    },
    resolver: zodResolver(Step3Schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addOns",
  });

  const addOns = watch("addOns");

  const savedData: SubmitHandler<Step3Fields> = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep((prev: number) => prev + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = addOns?.findIndex((addOn) => addOn.name === e.target.id) || 0;
    if (e.target.checked) {
      append({
        name: e.target.id,
        price: billing === "Monthly" ? "1" : "10",
      });
    } else {
      remove(index);
    }
  };

  console.log(addOns);

  return (
    <>
      <form
        className="bg-white flex flex-col rounded-md px-6 py-6 -translate-y-24 shadow-light-blue shadow-3xl gap-4"
        onSubmit={handleSubmit(savedData)}
      >
        <div className="flex text-2xl font-bold text-marine-blue">
          Pick add-ons
        </div>
        <div className="flex text-cool-gray">
          Add-ons help enhance your gaming experience.
        </div>

        <div>
          <label
            htmlFor="online"
            className="flex checkbox-label rounded-md outline outline-1 outline-light-gray "
          >
            <div className="flex items-center p-3 gap-x-3">
              <div className="flex items-center">
                <input
                  {...register("addOns", { value: [] })}
                  name="addOns"
                  id="Online service"
                  className="rounded-checkbox checked:accent-purplish-blue w-5 h-5 border-[1px] border-light-gray border-solid"
                  type="checkbox"
                  onChange={handleChange}
                />
              </div>
              <div className=" ">
                <div className="font-bold text-marine-blue">Online service</div>
                <div className="text-sm text-cool-gray">
                  <div className="">Access to multiplayer games</div>
                </div>
              </div>
              <div className="text-purplish-blue text-sm">sdasd</div>
            </div>
          </label>
        </div>
        <div>
          <label
            htmlFor="online"
            className="flex checkbox-label rounded-md outline outline-1 outline-light-gray "
          >
            <div className="flex items-center p-3 gap-x-3">
              <div className="flex items-center">
                <input
                  {...register("addOns", { value: [] })}
                  name="addOns"
                  id="Larger storage"
                  className="rounded-checkbox checked:accent-purplish-blue w-5 h-5 border-[1px] border-light-gray border-solid"
                  type="checkbox"
                  onChange={handleChange}
                />
              </div>
              <div className=" ">
                <div className="font-bold text-marine-blue">Larger storage</div>
                <div className="text-sm text-cool-gray">
                  <div className="">Access to multiplayer games</div>
                </div>
              </div>
              <div className="text-purplish-blue text-sm">sdasd</div>
            </div>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex text-base text-white bottom-0 rounded-md px-4 py-2 bg-marine-blue"
          >
            Next Step
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}
