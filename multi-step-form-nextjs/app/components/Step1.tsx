import React from "react";

function Step1() {
  return (
    <>
      <div className="flex text-2xl font-bold text-marine-blue">
        Personal Info
      </div>
      <div className="flex text-cool-gray">
        {" "}
        Please provide your name, email address, and phone
      </div>
      <div className="flex flex-col">
        <div className="text-marine-blue text-sm">Name</div>
        <input
          className="text-lg py-2 px-7 w-full  placeholder-cool-gray  border-[1px] rounded-md"
          type="text"
          required={true}
          placeholder="e.g. Stephen King"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-marine-blue text-sm">Email Address</div>
        <input
          className="text-lg py-2 px-7 w-full placeholder-cool-gray border-[1px] rounded-md"
          type="text"
          required={true}
          placeholder="e.g. stephenking@lorem.com"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-marine-blue text-sm">Phone Number</div>
        <input
          className="text-lg py-2 px-7 w-full  placeholder-cool-gray  border-[1px] rounded-md"
          type="text"
          required={true}
          placeholder="e.g. +1 234 567 890"
        />
      </div>
    </>
  );
}

export default Step1;
