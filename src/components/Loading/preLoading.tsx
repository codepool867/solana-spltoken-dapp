import React from "react";
import { MoonLoader } from "react-spinners";

const PreLoading = () => {
  return (
    <div className="fixed inset-0 w-full h-screen z-[9999] overflow-hidden bg-black bg-opacity-50">
      <div className="relative flex justify-center items-center h-screen">
        <MoonLoader color="white" />
      </div>
    </div>
  );
};

export default PreLoading;
