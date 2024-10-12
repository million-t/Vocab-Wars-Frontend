"use client";
import React from "react";
import { useState } from "react";
import style from "./letter-card.module.css";

function UnfilledCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className={style.flipCard} onClick={handleClick}>
      <div
        className={`${style.flipCardInner} ${isFlipped ? style.flipped : ""}`}
      >
        <span className={style.NotFound} />
      </div>
    </div>
  );
}

export default UnfilledCard;
