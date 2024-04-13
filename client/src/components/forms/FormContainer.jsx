import React from "react";

const FormContainer = ({ title, children }) => {
  return (
    <div className=" w-screen h-screen flex bg-pattern2 bg-dark">
      <div className="min-w-[310px] sm:min-w-80 m-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="rounded-md shadow-md bg-light ">
          <h2 className="text-dark text-xl font-semibold p-3 bg-dark3">
            {title}
          </h2>
          <div className="bg-dark2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
