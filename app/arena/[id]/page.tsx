"use client";
import { useRef, useState, useEffect } from "react";
import Grid from "../../components/grid";
import data from "../../dummy-data/contest.json";
const ws = ["BRAVE", "CRANE", "DREAM", "FLAME", "GLOBE"];

export default function Contest() {
  const words = data.words;
  const score = data.score;
  const startTime = data["start-time"];
  const endTime = data["end-time"];
  const weight = data.weights;

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0);

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
  }, [words.length]);

  return (
    <div className=" flex flex-col mt-8 gap-12">
      <div className=" ml-10 mr-10 outline outline-gray-400 rounded  flex flex-col gap-2 p-[2px]">
        <div className="flex w-full justify-around gap-[2px]">
          {words.map((word, index) => {
            return (
              <div
                key={index}
                className={`${
                  score[index] < 0
                    ? "bg-red-100"
                    : score[index] > 0
                    ? "bg-green-100"
                    : ""
                } font-semibold w-full flex justify-center items-center gap-2 rounded-t-sm  hover:bg-slate-200 `}
                onClick={() => handleWordClick(index)}
              >
                <div>{word}</div>
                {score[index] != 0 ? (
                  <div className="text-xs text-gray-600 font-normal">
                    {score[index]}
                    {score[index] > 0 ? ` /${weight[index]}` : ""}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
        <div ref={containerRef} className="w-full relative ">
          <div
            id="indicator"
            className="absolute bottom-0  h-3  rounded-b-sm    bg-gray-400 transition-all duration-300"
            style={{
              width: `${indicatorWidth}px`,
              left: `${
                activeIndex !== null ? activeIndex * indicatorWidth : 0
              }px`,
            }}
          ></div>
        </div>
      </div>
      <div className="w-[480px] flex overflow-hidden ">
        <div
          className="flex transition-transform duration-1000 my-8 px-16 gap-16"
          style={{
            transform: `translateX(-${
              activeIndex !== null ? (activeIndex/words.length) * 100 : 0
            }%)`,
          }}
        >
          {ws.map((word, index) => {
            return <Grid key={index} word={word} />;
          })}
        </div>
      </div>
    </div>
  );
}
