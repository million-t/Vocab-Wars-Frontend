"use client";
import React, { useState, useEffect } from "react";
import WarImage from "../../../public/images/warImage.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
const fullText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
  nulla similique consectetur quos aut optio repellat enim officia,
  laborum error itaque numquam ipsa distinctio corrupti, quasi
  laudantium natus quaerat dignissimos.`;

const Contest = () => {
  // get contest id from path
  const router = usePathname();
  const routerArr = router.split("/");
  const contestId = routerArr[routerArr.length - 1];
  const [displayedText, setDisplayedText] = useState<string>("");
  useEffect(() => {
    let index = 0;
    // console.log(">", fullText.length, fullText[fullText.length - 1]);

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + (fullText[index] || "" ));
        // console.log(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 md:p-8 b">
      <div className="w-full max-w-5xl flex flex-col rounded-xl justify-center items-center shadow-lg shadow-[#0c0c0c]">
        <div className="relative w-full max-w-5xl min-h-96  rounded-t-xl overflow-hidden ">
          <div className="absolute w-full h-full z-10 bg-gradient-to-r from-[#141414] to-transparent"></div>
          <Image
            src={WarImage}
            className="absolute w-full h-full object-cover"
            alt="war image"
            
          />
          <p className="absolute z-20 m-6 text-xs md:text-base text-transparent max-w-xl bg-clip-text bg-gradient-to-br from-[#97642f] via-[#F19027] to-[#ffc800]">
            {displayedText}
          </p>
        </div>
        <div className="w-full max-w-5xl min-h-25 bg-[#141414] rounded-b-xl flex flex-col md:flex-row items-end justify-end">
          <div className="w-full h-full p-6 flex flex-col gap-2 justify-end">
            <p className="text-2xl font-black text-gray-300 italic ">
              Test Contest 1
            </p>
            <p className="text-[#8c8c8c]">
              Before contest{" "}
              <span className="italic text-gray-300">00:08:32</span>
            </p>
          </div>
          <div className=" w-full flex flex-col gap-1 items-end justify-end p-6">
            <button className="bg-[#8f8f8f] p-2 w-full max-w-32 rounded  text-slate-800 bg-gradient-to-tr from-transparent   to-[#F19027]  rounded-r italic  font-light outline outline-1 outline-[#262626]">
              Register
            </button>
            <Link href={`./${contestId}/words`} className="w-full max-w-32">
              <button className="bg-[#8f8f8f] p-2 w-full  rounded  text-slate-800 bg-gradient-to-tr from-transparent   to-[#F19027]  rounded-r italic  font-light outline outline-1 outline-[#262626]">
                Enter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contest;
