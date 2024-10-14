"use client";
import React, { useState } from "react";
import Row from "./row";
import InputRow from "./new-line/input-row";
import UnfilledRow from "./unfilled-row";

const rowCount = 6;

function Grid({word, gridNum, enabled, contestId}: {word: string, gridNum: number, enabled:number, contestId: number}) {
  const [curRow, setCurRow] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const onSubmit = (result: string) => {
    // setCurRow(curRow + 1);
    setFocusIndex(0);   
    
    
  };



  

  return (
    <>
      <div className="flex flex-col gap-2  ">
        {[...Array(rowCount)].map((_, index) => (
          <InputRow
            key={index}
            cellCount={5}
            onSubmit={onSubmit}
            enabled={enabled}
            focusIndex={index === curRow ? focusIndex : 6}
            gridNum={gridNum}
            setFocusIndex={setFocusIndex}
            word={word}
          />
        ))}
      </div>
    </>
  );
}

export default Grid;
