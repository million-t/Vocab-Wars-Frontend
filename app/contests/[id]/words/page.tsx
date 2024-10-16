"use client";
import Grid from "@/components/grid/grid";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import style from "./page.module.css";
import { MdOutlineBackspace } from "react-icons/md";

const row1Letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const row2Letters = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const row3Letters = ["Z", "X", "C", "V", "B", "N", "M"];
const words = ["A", "B", "C", "D"];

export default function ContestWords() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
  const [activeGrid, setActiveGrid] = useState<number>(0);
  // const [submitted, setSubmitted] = useState<number[]>(Array.from({ length: 4 }, () => 0));
  const submitted = [2, 1, 2, 0];
  const handleWordClick = (index: number) => {
    setActiveIndex(index);
    // Todo
  };

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const width = containerWidth / words.length;
      setIndicatorWidth(width);
    }
  }, [words.length, containerRef.current?.offsetWidth]);
  useEffect(() => {
    setActiveGrid(activeIndex);
  }, [activeIndex]);

  return (
    <div className="mt-4 flex flex-col items-center gap-8 ">
      {/* Nav */}
      <div className="flex  w-full justify-center items-center  ">
        <div className="w-full max-w-md">
          <div className=" w-full p-[1px] bg-gradient-to-bl from-[#DA8C38] via-transparent to-[#F19027] rounded">
            <div
              className={` ${style.navWrapper}  rounded bg-[#141414] flex flex-col gap-3 p-[2px] w-full max-w-md mr-1 overflow-hidden`}
            >
              <div className="flex w-full justify-around gap-[2px] px-[1px] ">
                {words.map((word, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        activeIndex === index ? "" : "bg-[#1A1A1A]"
                      } font-semibold w-full flex justify-center items-center gap-2 rounded-t-sm transition-shadow duration-500 ease-in-out hover:bg-transparent hover:shadow-inner  hover:shadow-[#ffffff]/25 ${
                        submitted[index] === 2
                          ? "shadow-inner shadow-[#88d66c]/25"
                          : submitted[index] === 1
                          ? "shadow-inner  shadow-[#F19027]/25"
                          : ""
                      } `}
                      onClick={() => handleWordClick(index)}
                    >
                      <div className="text-gray-300 font-semibold italic">
                        {word}
                      </div>
                      {/* {score[index] != 0 ? (
                    <div className="text-xs text-gray-600 font-normal">
                      {score[index]}
                      {score[index] > 0 ? ` /${weight[index]}` : ""}
                    </div>
                  ) : (
                    ""
                  )} */}
                    </div>
                  );
                })}
              </div>
              <div ref={containerRef} className="w-full relative ">
                <div
                  id="indicator"
                  className={`${style.navItem} absolute bottom-0 h-3 m rounded-b-sm bg-gradient-to-t from-[#97642f]  via-[#F19027] ffc800 F19027 to-[#ffc800] transition-all duration-300`}
                  style={{
                    width: `${indicatorWidth - 2}px`,
                    left: `${
                      activeIndex !== null
                        ? activeIndex * indicatorWidth + 1
                        : 0
                    }px`,
                  }}
                >
                  <div className="absolute bottom-3 w-full h-[3px] bg-gradient-to-t from-[#DA8C38]   to-transparent"></div>
                  <div className="absolute bottom-3 w-full h-6 rounded-t-sm bg-transparent shadow-inner  shadow-[#F19027]/75"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link
          href={`/contests/${1}/ranking`}
          className="h-full p-[2px] w-full max-w-20 "
        >
          <button
            className={`${style.navItem} ${style.rankButton} px-2 w-full h-10  bg-gradient-to-tr from-transparent   to-[#F19027]  rounded-r italic text-gray-200 font-light`}
          >
            Rank
          </button>
        </Link>
      </div>

      {/* Grid */}

      <div className="w-full max-w-[260px] md:max-w-[360px] flex rounded-sm overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <div
              key={index}
              className="p-6 bg-[#141414] transition-transform duration-1000"
              style={{
                transform: `translateX(-${
                  activeIndex !== null ? activeIndex * 100 : 0
                }%)`,
                width: `${100 * words.length}%`,
              }}
            >
              <Grid
                wordId={1}
                contestId={1}
                gridOnFocus={index === activeGrid}
                acceptsInputs={true}
                currentRow={0}
              />
            </div>
          );
        })}
      </div>

      {/* Keyboard */}
      <div className="flex flex-col items-center gap-1 text-[#1A1A1A]">
        <div className="flex gap-[2px] md:gap-1 w-full">
          {row1Letters.map((letter, index) => {
            return (
              <button key={index} className="p-2 w-full  bg-gray-200 rounded ">
                {letter}
              </button>
            );
          })}
        </div>
        <div className="flex gap-[2px] md:gap-1  w-full">
          {row2Letters.map((letter, index) => {
            return (
              <button key={index} className="p-2 bg-gray-200 w-full rounded">
                {letter}
              </button>
            );
          })}
        </div>
        <div className="flex gap-[2px] md:gap-1 w-full">
          <button className="p-2  bg-gray-200 rounded">
            {" "}
            <MdOutlineBackspace />
          </button>
          {row3Letters.map((letter, index) => {
            return (
              <button key={index} className="p-2  bg-gray-200 rounded">
                {letter}
              </button>
            );
          })}
          <button className="p-2  bg-gray-200 rounded">Enter</button>
        </div>
      </div>
    </div>
  );
}
