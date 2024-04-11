import React from "react";

const FormContainer = ({ title, children }) => {
  return (
    <div className=" min-w-[310px] sm:min-w-96  mx-auto bg-light2">
      <div className="w-full rounded-lg shadow-md bg-light bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h2 className="text-dark text-xl font-semibold p-3 bg-green dark:bg-dark3">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
