import React from "react";

const ComponentLogo = (props) => {
  return (
    <div className="flex flex-row gap-x-4">
      <img
        className="h-10 w-13 flex-none"
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
