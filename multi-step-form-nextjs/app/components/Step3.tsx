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
        name: z.literal("Customizable profile"),
        price: z.enum(["2", "20"]),
      }),
    ]),
  ),
});

type Step3Fields = z.infer<typeof Step3Schema>;

export default function Step3({ setFormData, formData, setCurrentStep }: any) {
  const billing = formData.billing || "Monthly";
  const test = formData.addOns?.map((addOn: any) => {
    let price;
    switch (addOn.name) {
      case "Online service":
        price = billing === "Monthly" ? "1" : "10";
        break;
      case "Larger storage":
        price = billing === "Monthly" ? "2" : "20";
        break;
      case "Customizable profile":
        price = billing === "Monthly" ? "2" : "20";
        break;
      // Add more cases here for other addOns
      default:
        price = addOn.price; // If the addOn name doesn't match any cases, keep the current price
    }
    return { ...addOn, price };
  });

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
      addOns: test || [
        {
          name: "Online service",
          price: billing === "Monthly" ? "1" : "10",
        },
        {
          name: "Larger storage",
          price: billing === "Monthly" ? "2" : "20",
        },
      ],
    },
    resolver: zodResolver(Step3Schema),
  });
  const online = watch("addOns")?.some(
    (addOn) => addOn.name === "Online service",
  );
  const larger = watch("addOns")?.some(
    (addOn) => addOn.name === "Larger storage",
  );
  const custom = watch("addOns")?.some(
    (addOn) => addOn.name === "Customizable profile",
  );
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "addOns",
  });

  const addOns = watch("addOns");

  const sortedAddOns = addOns.sort((a, b) => {
    const order = ["Online service", "Larger storage", "Customizable profile"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  const priceMapping = {
    "Online service": billing === "Monthly" ? "1" : "10",
    "Larger storage": billing === "Monthly" ? "2" : "20",
    "Customizable profile": billing === "Monthly" ? "2" : "20",
  };

  const savedData: SubmitHandler<Step3Fields> = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep((prev: number) => prev + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (e.target.id === "Online service") {
        append({
          name: "Online service",
          price: priceMapping["Online service"] as "1" | "10",
        });
      } else if (e.target.id === "Larger storage") {
        append({
          name: "Larger storage",
          price: priceMapping["Larger storage"] as "2" | "20",
        });
      } else if (e.target.id === "Customizable profile") {
        append({
          name: "Customizable profile",
          price: priceMapping["Customizable profile"] as "2" | "20",
        });
      }
    } else {
      const index =
        addOns?.findIndex((addOn) => addOn.name === e.target.id) || 0;
      remove(index);
    }
  };

  return (
    <>
      <form
        id="step3"
        className="flex h-full flex-col bg-white xs:min-w-[440px]   "
        onSubmit={handleSubmit(savedData)}
      >
        <div className=" flex -translate-y-24 flex-col gap-4 rounded-lg bg-white  px-4 py-8 shadow-3xl shadow-light-blue xs:translate-y-0 xs:p-0 xs:pt-4 xs:shadow-none">
          <div className="flex flex-col">
            {" "}
            <div className="flex text-2xl font-bold text-marine-blue">
              Pick add-ons
            </div>
            <div className="flex text-cool-gray">
              Add-ons help enhance your gaming experience.
            </div>
          </div>

          <div>
            <label
              htmlFor="Online service"
              className="checkbox-label flex rounded-md outline outline-1 outline-light-gray "
            >
              <div className="flex w-full items-center gap-x-2 p-3">
                <div className="flex items-center ">
                  <input
                    name="addOns"
                    id="Online service"
                    className="rounded-checkbox h-5 w-5 border-[1px] border-solid border-light-gray checked:accent-purplish-blue"
                    type="checkbox"
                    onChange={handleChange}
                    checked={online}
                  />
                </div>
                <div className=" flex w-full flex-col">
                  <div className="font-bold  text-marine-blue">
                    Online service
                  </div>
                  <div className="text-sm text-cool-gray">
                    <div className="">Access to multiplayer games</div>
                  </div>
                </div>
                <div className="text-sm text-purplish-blue">
                  +${billing === "Monthly" ? "1/mo" : "10/yr"}
                </div>
              </div>
            </label>
          </div>
          <div>
            <label
              htmlFor="Larger storage"
              className="checkbox-label flex rounded-md outline outline-1 outline-light-gray "
            >
              <div className="gap- flex w-full items-center gap-x-2 p-3">
                <div className="flex items-center ">
                  <input
                    name="addOns"
                    id="Larger storage"
                    className="rounded-checkbox h-5 w-5 border-[1px] border-solid border-light-gray checked:accent-purplish-blue"
                    type="checkbox"
                    onChange={handleChange}
                    checked={larger}
                  />
                </div>
                <div className=" flex w-full flex-col">
                  <div className="font-bold text-marine-blue">
                    Larger storage
                  </div>
                  <div className="text-sm text-cool-gray">
                    <div className="">Extra 1TB of cloud save</div>
                  </div>
                </div>
                <div className="text-sm text-purplish-blue">
                  +${billing === "Monthly" ? "2/mo" : "20/yr"}
                </div>
              </div>
            </label>
          </div>
          <div>
            <label
              htmlFor="Customizable profile"
              className="checkbox-label flex rounded-md outline outline-1 outline-light-gray "
            >
              <div className="flex w-full items-center gap-x-2 p-3">
                <div className="flex items-center ">
                  <input
                    name="addOns"
                    id="Customizable profile"
                    className="rounded-checkbox h-5 w-5 border-[1px] border-solid border-light-gray checked:accent-purplish-blue"
                    type="checkbox"
                    onChange={handleChange}
                    checked={custom}
                  />
                </div>
                <div className="flex w-full flex-col">
                  <div className="font-bold text-marine-blue">
                    Customizable profile
                  </div>
                  <div className="text-sm text-cool-gray">
                    <div className="">Custom theme on your profile</div>
                  </div>
                </div>
                <div className="text-sm text-purplish-blue ">
                  +${billing === "Monthly" ? "2mo" : "20/yr"}
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className="flex h-full w-full items-end justify-end ">
          <div className="flex w-full justify-between">
            <button
              type="button"
              onClick={(e) => setCurrentStep((prev: any) => prev - 1)}
              className="bottom-0 flex rounded-md px-4 py-2 text-sm font-medium text-cool-gray "
            >
              Go Back
            </button>
            <button
              type="submit"
              form="step3"
              className="bottom-0 flex rounded-md bg-marine-blue px-4 py-2 text-sm font-medium text-white"
            >
              Next Step
            </button>
          </div>{" "}
        </div>
      </form>
    </>
  );
}
