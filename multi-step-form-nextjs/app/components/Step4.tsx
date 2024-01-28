import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import Step5 from "./Step5";
// type Step4Fields = Partial<z.infer<typeof Step4Schema>>;

export default function Step4({
  setFormData,
  formData,
  setCurrentStep,
  setFinal,
  final,
}: any) {
  const billing = formData.billing === "Yearly" ? "/yr" : "/mo";
  const total =
    formData.addOns?.reduce(
      (sum: number, addOn: { price: string }) => sum + Number(addOn.price),
      0,
    ) + formData.price;
  const savedData = () => {
    setFormData({ ...formData, total });
    setFinal(() => true);
  };

  return (
    <>
      {!final ? (
        <>
          <div
            id="step1"
            className="flex h-full flex-col bg-white xs:min-w-[440px] "
          >
            <div className="flex -translate-y-24 flex-col gap-4 rounded-lg bg-white  px-4 py-8 shadow-3xl shadow-light-blue xs:translate-y-0 xs:p-0 xs:pt-4 xs:shadow-none">
              <div className="flex flex-col">
                <div className="flex text-2xl font-bold text-marine-blue">
                  Finishing up
                </div>
                <div className="flex text-cool-gray">
                  Double-check everything looks OK before confirming.
                </div>
              </div>
              <div className="flex flex-col gap-6 p-4 text-sm">
                <div className=" flex items-center justify-between border-b-[2px] pb-3">
                  <div className="flex flex-col ">
                    <div className="font-bold text-marine-blue">
                      {formData.plan} {`(${formData.billing})`}
                    </div>
                    <div className=" font-medium text-cool-gray">
                      <button
                        className="underline hover:text-purplish-blue"
                        onClick={(e) => {
                          setCurrentStep(2);
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
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="text-sm text-cool-gray">
                          {addOn.name}
                        </div>
                        <div className=" font-medium text-marine-blue">
                          +${addOn.price}
                          {billing}
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <div className="flex items-center justify-between pt-2 text-cool-gray">
                  <div>
                    Total{" "}
                    {`(${
                      formData.billing === "Yearly" ? "per year" : "per month"
                    })`}
                  </div>
                  <div className="text-base font-bold text-purplish-blue">
                    ${total}
                    {billing}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-full w-full justify-end  ">
              <div className="flex w-full items-end justify-between ">
                <button
                  onClick={() => setCurrentStep((prev: any) => prev - 1)}
                  className="bottom-0 flex rounded-md px-4 py-2 text-sm font-medium text-cool-gray "
                >
                  Go Back
                </button>
                <button
                  type="button"
                  onClick={savedData}
                  className="bottom-0 flex rounded-md bg-purplish-blue px-6 py-2 text-base text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Step5
            setFormData={setFormData}
            formData={formData}
            setCurrentStep={setCurrentStep}
          />
        </>
      )}
    </>
  );
}
