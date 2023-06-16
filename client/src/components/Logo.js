import React from "react";

const ComponentLogo = () => {
  return (
    <div className="flex gap-x-4 absolute top-4 left-4">
      <img
        className="h-10 w-13 flex-none rounded-full bg-gray-50"
        src="logo.png"
        alt="logo credit express"
      />
      <p className="text-lm font-semibold leading-6 text-gray-900 my-auto">
        Credit Express
      </p>
    </div>
  );
};

export default ComponentLogo;
