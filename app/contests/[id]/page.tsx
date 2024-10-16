import React from "react";
import WarImage from "../../../public/images/warImage.jpg";
import Image from "next/image";

const Contest = () => {
  return (
    <div className="w-full flex flex-col items-center p-2 md:p-8">
      <div className="relative w-full max-w-5xl min-h-96  rounded-t-xl overflow-hidden">
        <div className="absolute w-full h-full z-10 bg-gradient-to-r from-slate-900 to-transparent"></div>
        <Image
          src={WarImage}
          className="absolute w-full h-full object-cover"
          alt="warImage"
        />
        <p className="absolute z-20 m-6 text-sm  md:text-base text-gray-300 font-thin max-w-xl ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, nulla
          similique consectetur quos aut optio repellat enim officia, laborum
          error itaque numquam ipsa distinctio corrupti, quasi laudantium natus
          quaerat dignissimos.
        </p>
      </div>
      <div className="w-full max-w-5xl min-h-25 bg-slate-800 rounded-b-xl flex flex-col md:flex-row items-end justify-end">
        <div className="w-full h-full p-6 flex flex-col gap-2 justify-end">
          <p className="text-2xl font-black text-gray-100">Test Contest 1</p>
          <p className="text-gray-300">Before contest: 00:08:32</p>
        </div>
        <div className=" w-full flex flex-col gap-1 items-end justify-end p-6">
          <button className="bg-gray-100 p-2 w-full max-w-32 rounded font-medium text-slate-800">
            Register
          </button>
          <button
            className="bg-gray-100 p-2 w-full max-w-32 rounded font-medium
         text-slate-800"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contest;
