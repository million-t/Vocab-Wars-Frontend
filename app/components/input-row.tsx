"use client"
import React, { useRef } from "react";
import InputCard from "./input-box";

const cardData = [
  { id: 1, content: "A" },
  { id: 2, content: "B" },
  { id: 3, content: "C" },
  { id: 4, content: "D" },
  { id: 5, content: "E" },
];
function InputRow(word:string) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const handleInputChange = (index: number) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex gap-1">
      {cardData.map((card, index) => (
        <InputCard
          key={card.id}
          content={card.content}
          ref={(el) => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
          onInputChange={() => handleInputChange(index)}
        />
      ))}
    </div>
  );
}

export default InputRow;
