"use client";
import Grid from "@/components/grid/grid";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import style from "./page.module.css";
import { FaBackspace } from "react-icons/fa";

const row1Letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const row2Letters = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const row3Letters = ["Z", "X", "C", "V", "B", "N", "M"];
const words = ["A", "B", "C", "D", "E"];

export default function ContestWords() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
  const [activeGrid, setActiveGrid] = useState<number>(0);
  const statusStates = Array.from({ length: words.length }).map(() =>
    useState(0)
  );
  const status = statusStates.map(([state]) => state);
  const setStatus = statusStates.map(([, setState]) => setState);

  const handleWordClick = (index: number) => {
    setActiveIndex(index);
    // Todo
  };
  const [charInfo, setCharInfo] = useState<number[]>(
    Array.from({ length: 26 }, () => 0)
  );

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
    <div className="flex flex-col items-center">
      {/* Nav */}
      <div className="flex w-full justify-center items-center outline outline-1 outline-[#262626] p-4">
        <div className="w-full max-w-md">
          <div className=" w-full p-[1px] bg-gradient-to-bl from-[#DA8C38] via-transparent to-[#F19027] rounded ">
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
                        status[index] === 2
                          ? "shadow-inner shadow-[#88d66c]/50"
                          : status[index] === 1
                          ? "shadow-inner  shadow-[#F19027]/50"
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
          className="h-full p-1 md:w-full max-w-24 "
        >
          <button
            className={`${style.navItem} ${style.rankButton} px-2 w-full h-10  bg-gradient-to-tr from-transparent text-xs md:text-sm  to-[#F19027]  rounded-r italic text-gray-200 font-light outline outline-1 outline-[#262626]`}
          >
            Rank
          </button>
        </Link>
      </div>

      {/* Grid */}
      <div className="w-full outline outline-1 outline-[#262626] flex justify-center">
        <div className="w-full max-w-[260px] md:max-w-[360px] flex overflow-hidden outline outline-1 outline-[#262626] bg-[#141414]">
          {Array.from({ length: words.length }).map((_, index) => {
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
                  setStatus={setStatus[index]}
                  setCharInfo={setCharInfo}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyboard */}
      <div className="flex flex-col items-center gap-1 py-4 text-[10px] md:text-lg w-full h-auto  max-w-md">
        <div className="flex gap-1 w-full h-auto">
          {row1Letters.map((letter, index) => {
            return (
              <button
                key={index}
                // onClick={(letter) => {}}
                className={`transition-all duration-300 p-2 bg-[#141414] outline outline-1 outline-[#262626] w-full h-auto aspect-[4/5] aspe rounded ${
                  charInfo[letter.charCodeAt(0) - 65] === 3
                    ? "shadow-inner  shadow-[#88d66c]/50 text-[#80d162]"
                    : charInfo[letter.charCodeAt(0) - 65] === 2
                    ? "shadow-inner  shadow-[#F19027]/50 text-[#ddb861]"
                    : charInfo[letter.charCodeAt(0) - 65] === 1
                    ? "shadow-inner  shadow-[#FFFFFF]/25 text-[#262626] "
                    : "shadow-sm shadow-[#454545]"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
        <div className="flex gap-1  w-full">
          {row2Letters.map((letter, index) => {
            return (
              <button
                key={index}
                className={`transition-all duration-300 p-2 bg-[#141414] outline outline-1 outline-[#262626]  w-full aspect-[4/5] rounded ${
                  charInfo[letter.charCodeAt(0) - 65] === 3
                    ? "shadow-inner  shadow-[#88d66c]/50 text-[#80d162]"
                    : charInfo[letter.charCodeAt(0) - 65] === 2
                    ? "shadow-inner  shadow-[#F19027]/50 text-[#ddb861]"
                    : charInfo[letter.charCodeAt(0) - 65] === 1
                    ? "shadow-inner  shadow-[#FFFFFF]/25 text-[#262626] "
                    : "shadow-sm shadow-[#454545] "
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
        <div className="flex gap-1 w-full">
          <button className=" px-4 bg-[#141414] outline outline-1 outline-[#262626] rounded ">
            <FaBackspace />
          </button>
          {row3Letters.map((letter, index) => {
            return (
              <button
                key={index}
                className={`transition-all duration-300 p-2 bg-[#141414] outline outline-1 outline-[#262626] w-full aspect-[4/5] rounded ${
                  charInfo[letter.charCodeAt(0) - 65] === 3
                    ? "shadow-inner  shadow-[#88d66c]/50 text-[#80d162]"
                    : charInfo[letter.charCodeAt(0) - 65] === 2
                    ? "shadow-inner  shadow-[#F19027]/50 text-[#ddb861]"
                    : charInfo[letter.charCodeAt(0) - 65] === 1
                    ? "shadow-inner  shadow-[#FFFFFF]/25 text-[#262626] "
                    : "shadow-sm shadow-[#454545]"
                }`}
              >
                {letter}
              </button>
            );
          })}
          <button className="p-2  bg-[#141414] outline outline-1 outline-[#262626] rounded">
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
