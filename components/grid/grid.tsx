"use client";
import React, { useState } from "react";
import GridRow from "../grid-row/grid-row";
import { setMaxIdleHTTPParsers } from "http";

const rowCount = 6;
interface GridProps {
  wordId: number;
  contestId: number;
  gridOnFocus: boolean;
  acceptsInputs: boolean;
  currentRow: number;
}
const token = "";
function Grid({
  wordId,
  contestId,
  gridOnFocus,
  acceptsInputs,
  currentRow,
}: GridProps) {
  const [focusRow, setFocusRow] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [found, setFound] = useState(false);
  return (
    <div className="flex flex-col gap-2  ">
      {[...Array(rowCount)].map((_, index) => (
        <GridRow
          key={index}
          guess_num={index + 1}
          cellCount={5}
          wordId={wordId}
          contestId={contestId}
          submitted={false}
          acceptsInputs={acceptsInputs}
          gridOnFocus={gridOnFocus}
          focusRow={focusRow}
          focusIndex={focusIndex}
          setFocusRow={setFocusRow}
          setFocusIndex={setFocusIndex}
          rowNum={index}
          guess_text={[]}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          found={found}
          setFound={setFound}
        />
      ))}
    </div>
  );
}

export default Grid;
