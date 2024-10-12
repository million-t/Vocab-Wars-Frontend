"use client";


import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex justify-center items-center pt-4">
      <div className="w-[650px]  flex justify-center">
        <Link href={"./contests"}>Play</Link>
      </div>
    </div>
  );
}
