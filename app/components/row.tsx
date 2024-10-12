import React from "react";
import FlipCard from "./letter-card";

const cardData = [
  { id: 1, content: "A" },
  { id: 2, content: "B" },
  { id: 3, content: "C" },
  { id: 4, content: "D" },
  { id: 5, content: "E" },
];
function Row() {
  return (
    <>
      <div className="flex gap-1">
        {cardData.map((card, index) => (
          <FlipCard key={card.id} index={index} content={card.content} />
        ))}
      </div>
    </>
  );
}

export default Row;
