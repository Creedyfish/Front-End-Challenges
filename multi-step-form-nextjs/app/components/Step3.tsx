import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

export const Step3Schema = z.object({
  addOns: z.array(
    z.enum(["Online service", "Larger storage", "Customizable Storage"])
  ),
});

type Step3Fields = z.infer<typeof Step3Schema>;

export default function Step3({ setFormData, formData, setCurrentStep }: any) {
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
      addOns: formData.addOns || ["Online service", "Larger storage"],
    },
    resolver: zodResolver(Step3Schema),
  });
  const billing = formData.billing;
  const savedData: SubmitHandler<Step3Fields> = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep((prev: number) => prev + 1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(savedData)}>
        <div>{billing}</div>
        <input type="checkbox" {...register("addOns")} value="Online service" />
        <input type="checkbox" {...register("addOns")} value="Larger storage" />
        <input
          type="checkbox"
          {...register("addOns")}
          value="Customizable Storage"
        />
        <button type="submit">Next</button>
      </form>
      <DevTool control={control} />
    </>
  );
}
