"use client";
import React from "react";
import { useState } from "react";
import style from "./letter-card.module.css";

function FlipCard({ content, index }: { content: string; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={style.flipCard} key={index}>
      <div
        className={`${style.flipCardInner} ${isFlipped ? style.flipped : ""}`}
      >
        <div className={style.flipCardFront}>
          <p className={style.title}>{content}</p>
        </div>
        <div className={index % 2 == 0 ? style.flipCardBack : style.NotFound}>
          <p className={style.title}>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
