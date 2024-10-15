export default function Contests() {
  return (
    <div className=" flex flex-col  justify-center gap-12 mt-4">
      <div className=" flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, index) => {
          return (
            <div key={index} className="w-full min-h-25 md:min-w-[660px] bg-slate-800 rounded-md flex flex-col md:flex-row items-end justify-end">
              <div className="w-full h-full p-6 flex flex-col gap-2 justify-end">
                <p className="text-md font-black text-gray-100">
                  Test Contest 1
                </p>
                <p className="text-gray-300 text-sm">Before contest: 00:08:32</p>
              </div>
              <div className=" w-full flex flex-col gap-1 items-end justify-end p-6">
                <button className="bg-gray-100 p-2 w-full max-w-32 rounded font-medium text-slate-800">
                  Register
                </button>
                {/* <button className="bg-gray-100 p-2 w-full max-w-32 rounded font-medium text-slate-800">
                  Enter
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
