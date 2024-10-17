"use client";
import React, { useState } from "react";
const indicatorHeight = 40;
const navItems = ["Home", "Daily", "Contests"];
const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavigation = (index: number) => {
    if (activeIndex != index) {
      setActiveIndex(index);
    }
  };
  return (
    <div className="flex w-full h-full outline outline-1 outline-[#262626] p-4">
      <div className="w-full ">
        <div className=" w-full p-[1px] bg-gradient-to-bl from-[#DA8C38] via-transparent to-[#F19027] rounded">
          <div
            className={`  rounded bg-[#141414] flex justify-start  gap-3 p-2 w-full max-w-md mr-1 overflow-hidden`}
          >
            <div className=" mt- h-full w-4 relative ">
              <div
                id="indicator"
                className={`absolute left-0  w-2 rounded-l-sm bg-gradient-to-r from-[#97642f]  via-[#F19027] to-[#ffc800] transition-all duration-300`}
                style={{
                  height: `${indicatorHeight}px`,
                  top: `${
                    activeIndex !== null
                      ? activeIndex * indicatorHeight + activeIndex * 4
                      : 0
                  }px`,
                }}
              >
                <div className="absolute left-2 bottom-0 h-full w-[4px] bg-gradient-to-r from-[#DA8C38]   to-transparent"></div>
                <div className="absolute left-2 w-[154px] h-full rounded-r-sm bg-transparent shadow-inner  shadow-[#F19027]/75"></div>
              </div>
            </div>
            <ul className="flex flex-col gap-1">
              {navItems.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="p-2 bg-[#1A1A1A] transition-all ease-in-out duration-500 hover:bg-transparent hover:shadow-inner rounded-r  hover:shadow-[#ffffff]/25"
                    onClick={() => handleNavigation(index)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
