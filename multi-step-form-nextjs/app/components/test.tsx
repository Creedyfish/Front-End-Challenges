import { useForm, Controller } from "react-hook-form";

export default function Test() {
  const { control } = useForm();

  return (
    <Controller
      render={({ field }) => <input {...field} />}
      name="firstName"
      control={control}
      defaultValue=""
    />
  );
}
