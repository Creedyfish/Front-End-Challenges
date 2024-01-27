import React from "react";
import { useController } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

const PhoneNumberInput = ({ control }: any) => {
  const { field } = useController({ name: "phoneNumber", control });

  return (
    <PhoneInput
      international
      defaultCountry="US"
      value={field.value}
      onChange={(value) => field.onChange(value)}
    />
  );
};

export default PhoneNumberInput;
