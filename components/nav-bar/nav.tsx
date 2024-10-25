"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import Image from "next/image";
import { RiArrowLeftDoubleFill } from "react-icons/ri";

const indicatorHeight = 40;
const navItems = ["Home", "Daily", "Contests"];
const paths = ["/", "/daily", "/contests"];

interface NavRef {
  current: HTMLElement | null;
}

interface ClickOutsideEvent extends MouseEvent {
  target: Node;
}
const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const path = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    if (path.charAt(1) === "c") {
      setActiveIndex(2);
    } else if (path.charAt(1) === "d") {
      setActiveIndex(1);
    }
  }, [path]);

  const handleNavigation = (index: number) => {
    if (activeIndex != index) {
      setActiveIndex(index);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsNavVisible(false);
    }
  };
  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: TouchEvent) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 150) {
      setIsNavVisible(false);
    }
  };

  useEffect(() => {
    if (isNavVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isNavVisible]);
  return (
    <>
      <button
        className={`md:hidden p-4 absolute z-40 transition-all duration-1000 ${
          isNavVisible ? "hidden" : ""
        }`}
        onClick={() => setIsNavVisible(true)}
      >
        <svg
          className="w-5 h-5 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <div
        ref={navRef}
        className={`flex z-40 absolute   ${
          isNavVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-fit h-full items-start`}
      >
        <div
          className={` flex w-fit h-full  overflow-y-auto overflow-x-hidden outline outline-1 outline-[#262626] p-4 backdrop-filter backdrop-blur-md`}
        >
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full h-28 mt-4 mb-8">
              <Image src={logo} alt="logo" fill objectFit="contain" />
            </div>
            <div className=" w-fit p-[1px] bg-gradient-to-bl from-[#DA8C38] via-transparent to-[#F19027] rounded">
              <div
                className={`  rounded bg-[#141414] flex justify-start  gap-1 p-2 w-full max-w-md mr-1 overflow-hidden`}
              >
                <div className=" mt- h-full w-4 relative ">
                  <Link href={paths[activeIndex]}>
                    <div
                      id="indicator"
                      className={`absolute left-0  w-4 rounded-l-sm bg-gradient-to-r from-[#97642f]  via-[#F19027] to-[#ffc800] transition-all duration-300`}
                      style={{
                        height: `${indicatorHeight}px`,
                        top: `${
                          activeIndex !== null
                            ? activeIndex * indicatorHeight + activeIndex * 4
                            : 0
                        }px`,
                      }}
                    >
                      <div className="absolute left-4 bottom-0 h-full w-1 bg-gradient-to-r from-[#DA8C38]   to-transparent"></div>
                      <div className="absolute left-2 w-[194px] h-full rounded-r-sm bg-transparent shadow-inner  shadow-[#F19027]/75"></div>
                    </div>
                  </Link>
                </div>
                <ul className="flex flex-col gap-1">
                  {navItems.map((item, index) => {
                    return (
                      <Link key={index} href={paths[index]}>
                        <li
                          className="p-2 px-8 bg-[#1A1A1A] transition-all ease-in-out duration-500 hover:bg-transparent hover:shadow-inner rounded-r  hover:shadow-[#ffffff]/25 text-gray-300"
                          onClick={() => handleNavigation(index)}
                        >
                          {item}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="w-full h-full flex flex-col justify-end gap-2 text-[#8c8c8c]">
              <Link
                href="/contests/create"
                className="py-2 text-sm text-left items-center outline outline-1 outline-[#262626] rounded flex gap-2"
              >
                <div className="ml-2 w-10 h-10">
                  <IoIosCreate className="text-xl  w-full h-full" />
                </div>
                <p className="mr-2">Create Contest</p>
              </Link>
              <div className="w-full h-12 outline outline-1 outline-[#262626] flex items-center justify-start rounded">
                <div className=" w-8 h-8 ml-2 rounded-full flex justify-center items-center">
                  <FaUserCircle className="w-full h-full" />
                </div>
                <Link href="/login" className="px-2">
                  <p className="text-sm">Login</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsNavVisible(false)}
          className="p-2 md:hidden"
        >
          <RiArrowLeftDoubleFill className={`w-7 h-auto text-gray-300/75 `} />
        </button>
      </div>
    </>
  );
};

export default NavBar;
