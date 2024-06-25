import React from "react";

const Skeleteon = () => {
  return (
    <div className="relative w-full h-full bg-[#060d17] border-2 border-[#060d17] flex flex-col font-lato">
      <div className="relative h-[450px] w-full overflow-hidden mx-auto">
        <div className="animate-pulse bg-gray-300 w-full h-[450px] rounded-lg"></div>
      </div>
      <div className="absolute w-full h-[450px] bg-blue-gradient"></div>
      <div className="z-10 flex rounded-2xl p-6 gap-8 w-full max-w-[1170px] min-h-[800px] bg-[#060d17] -mt-20 mx-auto">
        <div className="animate-pulse bg-gray-300 rounded-lg w-[350px] h-[500px]"></div>
        <div className="relative flex flex-col w-3/4 gap-12 items-start">
          <div className="flex flex-col gap-1 text-[#b9bdcc] text-xl font-thin">
            <div className="animate-pulse bg-gray-300 h-8 w-3/4 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 h-8 w-60 rounded-lg"></div>
          </div>
          <div className="flex flex-col gap-2 items-start text-base">
            <h3 className="font-bold uppercase text-[#6a7c8f]">opis</h3>
            <div className="animate-pulse bg-gray-300 h-16 w-3/4 rounded-lg"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="animate-pulse bg-gray-300 h-12 w-40 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 h-12 w-44 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 h-12 w-36 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleteon;
