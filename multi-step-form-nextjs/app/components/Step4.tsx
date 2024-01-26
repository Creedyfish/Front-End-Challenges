import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

// type Step4Fields = Partial<z.infer<typeof Step4Schema>>;

export default function Step4({ setFormData, formData, setCurrentStep }: any) {
  const billing = formData.billing === "Yearly" ? "/yr" : "/mo";
  const total =
    formData.addOns?.reduce(
      (sum: number, addOn: { price: string }) => sum + Number(addOn.price),
      0
    ) + formData.price;

  return (
    <>
      <form
        id="step4"
        className="bg-white flex flex-col rounded-md px-6 py-6 -translate-y-24 shadow-light-blue shadow-3xl gap-4"
        // onSubmit={}
      >
        <div className="flex flex-col">
          <div className="flex text-2xl font-bold text-marine-blue">
            Finishing up
          </div>
          <div className="flex text-cool-gray">
            Double-check everything looks OK before confirming.
          </div>
        </div>
        <div className="p-4 flex flex-col gap-6 text-sm">
          <div className=" pb-3 justify-between items-center flex border-b-[2px]">
            <div className="flex flex-col ">
              <div className="text-marine-blue font-bold">
                {formData.plan} {`(${formData.billing})`}
              </div>
              <div className=" font-medium text-cool-gray">
                <button
                  className="hover:text-purplish-blue underline"
                  onClick={(e) => {
                    delete formData.addOns, setCurrentStep(2);
                  }}
                >
                  Change
                </button>
              </div>
            </div>
            <div className="font-bold text-marine-blue">
              ${formData.price}
              {billing}
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            {formData.addOns?.map(
              (addOn: { name: string; price: string }, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="text-sm text-cool-gray">{addOn.name}</div>
                  <div className=" text-marine-blue font-medium">
                    +${addOn.price}
                    {billing}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="flex justify-between items-center text-cool-gray pt-2">
            <div>
              Total{" "}
              {`(${formData.billing === "Yearly" ? "per year" : "per month"})`}
            </div>
            <div className="text-base font-bold text-purplish-blue">
              ${total}
              {billing}
            </div>
          </div>
        </div>
      </form>
      <div className="flex w-full justify-between">
        <button
          onClick={(e) => setCurrentStep((prev: any) => prev - 1)}
          className="flex font-medium text-sm text-cool-gray bottom-0 rounded-md px-4 py-2 "
        >
          Go Back
        </button>
        <button
          type="submit"
          form="step4"
          className="flex text-base text-white bottom-0 rounded-md px-6 py-2 bg-purplish-blue"
        >
          Confirm
        </button>
      </div>
      {/* <DevTool control={control} /> */}
    </>
  );
}
