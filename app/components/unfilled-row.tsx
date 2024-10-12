"use client";
import React, { useRef } from "react";
import InputCard from "./input-box";
import UnfilledCard from "./unfilled-box";

const cardData = [
  { id: 1, content: "A" },
  { id: 2, content: "B" },
  { id: 3, content: "C" },
  { id: 4, content: "D" },
  { id: 5, content: "E" },
];
function UnfilledRow() {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const handleInputChange = (index: number) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex gap-1">
      {cardData.map((card, index) => (
        <UnfilledCard />
      ))}
    </div>
  );
}

export default UnfilledRow;
