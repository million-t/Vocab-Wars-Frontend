import Grid from "@/components/grid/grid";
// import { useRef, useState, useEffect } from "react";
// import Grid from "../../components/grid";
// import data from "../../dummy-data/contest.json";
// import Link from "next/link";
// import { DotsVerticalIcon } from "@radix-ui/react-icons";
// const ws = ["BRAVE", "CRANE", "DREAM", "FLAME", "GLOBE"];
// const row1Letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
// const row2Letters = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
// const row3Letters = ["Z", "X", "C", "V", "B", "N", "M"];

export default function Contest() {
  return (
    <>
      <Grid
        wordId={1}
        contestId={1}
        gridOnFocus={true}
        acceptsInputs={true}
        currentRow={0}
        found={false}
      />
    </>
  );
}
// export default function Contest() {
//   const words = data.words;
//   const score = data.score;
//   const startTime = data["start-time"];
//   const endTime = data["end-time"];
//   const weight = data.weights;

//   const [activeIndex, setActiveIndex] = useState<number | null>(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [indicatorWidth, setIndicatorWidth] = useState<number>(0);

//   const handleWordClick = (index: number) => {
//     setActiveIndex(index);
//     // Todo
//   };

//   useEffect(() => {
//     if (containerRef.current) {
//       const containerWidth = containerRef.current.offsetWidth;
//       const width = containerWidth / words.length;
//       setIndicatorWidth(width);
//     }
//   }, [words.length]);

//   return (
//     <div className=" flex flex-col mt-8 gap-4 bg-slate-600 w-full items-center">
//       <div className="flex  w-full justify-center items-center">
//         <div className=" ml-10   rounded-l  flex flex-col gap-3 p-[2px] w-full max-w-md">
//           <div className="flex w-full justify-around gap-[2px]">
//             {words.map((word, index) => {
//               return (
//                 <div
//                   key={index}
//                   className={`${
//                     score[index] < 0
//                       ? "bg-red-100"
//                       : score[index] > 0
//                       ? "bg-green-100"
//                       : ""
//                   } font-semibold w-full flex justify-center items-center gap-2 rounded-t-sm  hover:bg-slate-200 `}
//                   onClick={() => handleWordClick(index)}
//                 >
//                   <div>{word}</div>
//                   {score[index] != 0 ? (
//                     <div className="text-xs text-gray-600 font-normal">
//                       {score[index]}
//                       {score[index] > 0 ? ` /${weight[index]}` : ""}
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//           <div ref={containerRef} className="w-full relative ">
//             <div
//               id="indicator"
//               className="absolute bottom-0 h-3 rounded-b-sm bg-gray-400 transition-all duration-300"
//               style={{
//                 width: `${indicatorWidth}px`,
//                 left: `${
//                   activeIndex !== null ? activeIndex * indicatorWidth : 0
//                 }px`,
//               }}
//             ></div>
//           </div>
//         </div>
//         <Link href={`/contests/${data.id}/ranking`} className="h-full p-[2px]">
//           <button className="px-2 bg-gray-200 rounded-r h-full">Rank</button>
//         </Link>
//       </div>
//       <div className="w-full sm:w-[360px] flex rounded-lg overflow-hidden px-0">
//         <div
//           className="flex transition-transform duration-1000 py-2 px-6 gap-12 bg-slate-200"
//           style={{
//             transform: `translateX(-${
//               activeIndex !== null ? (activeIndex * 100) / words.length : 0
//             }%)`,
//             width: `${102 * words.length}%`,
//           }}
//         >
//           {ws.map((word, index) => {
//             return (
//               <Grid
//                 key={index}
//                 contestId={data.id}
//                 word={words[index]}
//                 gridNum={index}
//                 enabled={activeIndex || 0}
//               />
//             );
//           })}
//         </div>
//       </div>
//       <div className="flex flex-col items-center gap-2">
//         <div className="flex gap-1 md:gap-2">
//           {row1Letters.map((letter, index) => {
//             return (
//               <button key={index} className="p-2 w-full  bg-gray-200 rounded ">
//                 {letter}
//               </button>
//             );
//           })}
//         </div>
//         <div className="flex gap-1 md:gap-2">
//           {row2Letters.map((letter, index) => {
//             return (
//               <button key={index} className="p-2 bg-gray-200 rounded">
//                 {letter}
//               </button>
//             );
//           })}
//         </div>
//         <div className="flex gap-1 md:gap-2">
//           {row3Letters.map((letter, index) => {
//             return (
//               <button key={index} className="p-2  bg-gray-200 rounded">
//                 {letter}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
