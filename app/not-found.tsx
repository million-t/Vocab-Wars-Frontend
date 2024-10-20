"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import notFound from "../public/images/404.png";

const NotFound = () => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const fullText = `The page you are looking for does not exist.`;
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current <= fullText.length) {
        setDisplayedText(fullText.slice(0, indexRef.current));

        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [fullText]);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-1">
      <Image src={notFound} alt="not found icon" width={240}></Image>
      <p className="text-xs md:text-base text-transparent max-w-2xl bg-clip-text bg-gradient-to-br from-[#97642f] via-[#F19027] to-[#ffc800] italic">
        404
      </p>
      <p className=" mx-2 text-xs md:text-base text-transparent max-w-2xl bg-clip-text bg-gradient-to-br from-[#97642f] via-[#F19027] to-[#ffc800] italic">
        {displayedText}
      </p>
    </div>
  );
};

export default NotFound;
