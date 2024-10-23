import Link from "next/link";
export default function Contests() {
  return (
    <div className=" flex flex-col  justify-center gap-12 my-8 ">
      <div className=" flex flex-col items-center gap-4  justify-center">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Link
              key={index}
              href={"./contests/1"}
              className="w-full md:max-w-[660px] "
            >
              <div className="w-full min-h-25 md:max-w-[660px] bg-[#141414] shadow-md shadow-[#0c0c0c] rounded-md flex flex-col md:flex-row items-end justify-end">
                <div className="w-full h-full p-6 flex flex-col gap-2 justify-end">
                  <p className="text-md font-black text-gray-300">
                    Test Contest 1
                  </p>
                  <p className="text-[#8c8c8c] text-sm">
                    Before contest{" "}
                    <span className="italic text-gray-300">00:08:32</span>
                  </p>
                </div>
                <div className=" w-full flex flex-col gap-1 items-end justify-end p-6">
                  <button className="bg-[#8f8f8f] p-2 max-w-36 w-full  rounded  text-slate-800 bg-gradient-to-tr from-transparent   to-[#F19027]  rounded-r italic  font-light outline outline-1 outline-[#262626]">
                    Register
                  </button>
                  {/* <button className="bg-gray-100 p-2 w-full max-w-32 rounded font-medium text-slate-800">
                  Enter
                </button> */}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
