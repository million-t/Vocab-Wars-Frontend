"use client";
import React, { useState } from "react";
import Row from "./row";
import InputRow from "./new-line/input-row";
import UnfilledRow from "./unfilled-row";

const rowCount = 6;

function Grid({word}: {word: string}) {
  const [curRow, setCurRow] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const onSubmit = (result: string) => {
    setCurRow(curRow + 1);
    setFocusIndex(0);
  };

  return (
    <>
      <div className="flex flex-col gap-2 snap-center ">
        {[...Array(rowCount)].map((_, index) => (
          <InputRow
            cellCount={5}
            onSubmit={onSubmit}
            enabled={curRow === index && !isWon}
            focusIndex={focusIndex}
            setFocusIndex={setFocusIndex}
            word={word}
          />
        ))}
      </div>
    </>
  );
}

export default Grid;
