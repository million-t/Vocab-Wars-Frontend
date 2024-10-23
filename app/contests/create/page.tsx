"use client";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { RiDeleteBin6Line, RiAddLine } from "react-icons/ri";
import "react-datepicker/dist/react-datepicker.css";
const availabilityValues = ["private", "public"];

const CreateContest = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [duration, setDuration] = useState<number>(10);
  const [words, setWords] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const width = containerWidth / 2;
      setIndicatorWidth(width);
    }
  }, [containerRef.current?.offsetWidth]);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="mt-12 w-full mx-2 max-w-2xl">
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="relative bg-[#141414] rounded ">
            <input
              type="email"
              className="peer m-0 block h-[58px] italic  w-full rounded border border-solid border-[#262626] bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight  transition duration-200 ease-linear placeholder:text-transparent focus:border-[#F19027] focus:pb-[0.625rem] focus:pt-[1.625rem]  focus:outline-none peer-focus:text-primary  text-[#F19027] dark:autofill:shadow-autofill  [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              // id="floatingInput"
              placeholder="Vocab Speed Challenge"
            />
            <label className=" pointer-events-none absolute italic left-0 top-0 origin-[0_0] border border-solid text-[#8c8c8c] border-transparent px-3 py-4  transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.75] peer-focus:text-[#8c8c8c] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem]  peer-[:not(:placeholder-shown)]:scale-[0.75] motion-reduce:transition-none   ">
              Contest Title
            </label>
          </div>
          {/* Description */}
          <div className="relative  rounded">
            <textarea
              className="peer h-40  italic w-full rounded border border-solid border-[#262626] bg-[#141414] bg-clip-padding px-3  text-xs font-normal leading-tight transition duration-200 ease-linear placeholder:text-transparent focus:border-[#F19027] focus:pb-[0.625rem] focus:pt-[1.625rem] focus:outline-none peer-focus:text-primary text-[#F19027] dark:autofill:shadow-autofill "
              placeholder="Contest Description"
            />
            <label className=" pointer-events-none absolute italic left-0 top-0 origin-[0_0] border border-solid text-[#8c8c8c] border-transparent px-3 py-4 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.75] peer-focus:text-[#8c8c8c] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.75] motion-reduce:transition-none">
              Description (optional)
            </label>
          </div>
          {/* Availability */}
          <div
            className={` rounded bg-[#141414] flex flex-col gap-3 p-[2px] w-full  overflow-hidden`}
          >
            <div className="flex w-full justify-around gap-[2px] px-[1px] ">
              {availabilityValues.map((av, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                    }}
                    className={`${
                      activeIndex === index ? "" : "bg-[#1A1A1A]"
                    }  font-semibold w-full flex justify-center items-center gap-2 rounded-t-sm transition-shadow duration-500 ease-in-out hover:bg-transparent hover:shadow-inner  hover:shadow-[#ffffff]/25`}
                  >
                    <div className="text-gray-300 italic text-sm ">{av}</div>
                  </div>
                );
              })}
            </div>

            <div ref={containerRef} className="w-full relative ">
              <div
                id="indicator"
                className={` absolute bottom-0 h-3 m rounded-b-sm bg-gradient-to-t from-[#97642f]  via-[#F19027] ffc800 F19027 to-[#ffc800] transition-all duration-300`}
                style={{
                  width: `${indicatorWidth - 2}px`,
                  left: `${activeIndex * indicatorWidth + 1}px`,
                }}
              >
                <div className="absolute bottom-3 w-full h-[3px] bg-gradient-to-t from-[#DA8C38]   to-transparent"></div>
                <div className="absolute bottom-3 w-full h-5 rounded-t-sm bg-transparent shadow-inner  shadow-[#F19027]/75"></div>
              </div>
            </div>
          </div>
          <p
            className={`${
              activeIndex === 0 ? "" : "hidden"
            } text-xs text-[#8c8c8c] outline outline-1 outline-[#262626] rounded p-1`}
          >
            Invitation link will be generated once the contest is created.
          </p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-2 w-full ">
            {/* Time and Date */}
            <div className="relative flex flex-col  mb-3  rounded flex-grow ">
              <label className="block text-[#8c8c8c] italic mb-2 px-3 pt-2">
                Start Date and Time
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                showTimeSelect
                timeIntervals={5}
                wrapperClassName="w-full"
                dateFormat="MMMM d, yyyy h:mm aa"
                className={`w-full rounded border border-solid border-[#262626] bg-[#141414] bg-clip-padding px-3 py-2 text-xs font-normal leading-tight transition duration-200 ease-linear focus:border-[#F19027] focus:outline-none text-[#F19027]`}
              />
            </div>
            {/* Duration */}
            <div className="relative mb-3  rounded items-center bg-">
              <label className="block text-[#8c8c8c]  italic mb-2 px-3 pt-2  lg-w-full">
                Duration <span className="text-xs"> (in minutes)</span>
              </label>
              <input
                type="number"
                className="w-full md:max-w-28 rounded border border-solid border-[#262626] bg-[#141414] bg-clip-padding px-3 py-2 text-sm font-normal leading-tight transition duration-200 ease-linear focus:border-[#F19027] focus:outline-none text-[#F19027]"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
              />
            </div>
          </div>
          {/* Words */}
          <div>
            <div className="flex flex-col gap-2">
              {words.map((word, index) => {
                return (
                  <div key={index} className="relative  rounded flex">
                    <label className="block text-[#8c8c8c] italic mb-2 px-3 pt-2 w-full max-w-32 text-sm">
                      Word {index + 1}
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border border-solid bg-[#141414] border-[#262626] bg-clip-padding px-3 py-2 text-sm font-normal leading-tight transition duration-200 ease-linear focus:border-[#F19027] focus:outline-none text-[#F19027]"
                      value={word}
                      onChange={(e) => {
                        const newWords = [...words];
                        newWords[index] = e.target.value;
                        setWords(newWords);
                      }}
                    />
                    <button
                      onClick={() => {
                        const newWords: string[] = [];
                        words.forEach((w, i) => {
                          if (i !== index) {
                            newWords.push(w);
                          }
                        });
                        setWords(newWords);
                      }}
                      className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-[#262626] rounded-e  outline outline-1 outline-[#262626] hover:bg-[#141414]  "
                    >
                      {" "}
                      <RiDeleteBin6Line className="text-[#8c8c8c]" />{" "}
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                const newWords = [...words];
                newWords.push("");
                setWords(newWords);
              }}
              className="my-3 py-2 px-4  bg-[#141414] text-xs outline outline-1 outline-[#262626] rounded text-gray-300 flex"
            >
              <RiAddLine className="text-base mr-2" /> Add Word
            </button>
          </div>

          <button className="bg-[#8f8f8f] p-2 w-full mt-2 max-w-32  rounded  text-slate-800 bg-gradient-to-tr from-transparent   to-[#F19027]  rounded-r italic  font-light outline outline-1 outline-[#262626]">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContest;
