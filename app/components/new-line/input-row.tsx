"use client";
import React, { useRef, useState, useEffect } from "react";
import style from "./input-row.module.css";

interface InputRowProps {
  cellCount: number;
  enabled: boolean;
  focusIndex: number;
  word: string;
  setFocusIndex: (index: number) => void;
  onSubmit: (result: string) => void;
}


const InputRow: React.FC<InputRowProps> = ({
  cellCount,
  onSubmit,
  enabled,
  focusIndex,
  setFocusIndex,
  word
}) => {
  const answer = word;
  const inputRefs = useRef<HTMLSpanElement[]>([]);
  const flippedStates = Array.from({ length: cellCount }).map(() =>
    useState(0)
  );
  const isFlipped = flippedStates.map(([state]) => state);
  const setIsFlipped = flippedStates.map(([, setState]) => setState);
  const [values, setValues] = useState(
    Array.from({ length: cellCount }).map((_, index) => {
      return { id: index, value: "" };
    })
  );
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const span = event.target as HTMLSpanElement;
    const value = span.innerText.toUpperCase();
    const preVal = values[index].value;

    let newChar = value.charAt(value.length - 1);

    for (let i = 0; i < Math.min(value.length, preVal.length); i++) {
      if (value[i] !== preVal[i]) {
        newChar = value[i];
        break;
      }
    }

    span.innerText = newChar;

    const newValues = [...values];
    newValues[index] = { id: index, value: newChar };
    setValues(newValues);

    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLSpanElement>
  ): void => {
    if (event.key === "ArrowRight" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "Backspace") {
      const span = event.target as HTMLSpanElement;
      span.innerText = "";

      const newValues = [...values];
      newValues[index] = { id: index, value: "" };
      setValues(newValues);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (event.key === "Delete") {
      event.preventDefault();
      const span = event.target as HTMLSpanElement;
      span.innerText = "";

      const newValues = [...values];
      newValues[index] = { id: index, value: "" };
      setValues(newValues);
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };
  const unfocusSpan = (index: number) => {
    inputRefs.current[index]?.blur();
  };
  const handleSubmit = () => {
    const result = values.map((value) => value.value.trim()).join("");
    console.log(result);
    if (result.length < cellCount) {
      return;
    }
    setSubmitted(true);
    onSubmit(result);
  };

  for (let i = 0; i < cellCount; i++) {
    useEffect(() => {
      if (submitted) {
        unfocusSpan(i);
        setTimeout(() => {
          if (values[i].value === answer[i]) {
            setIsFlipped[i](3);
          } else if (answer.includes(values[i].value)) {
            setIsFlipped[i](2);
          } else {
            setIsFlipped[i](1);
          }
        }, i * 100);
      }
    }, [submitted]);
    useEffect(() => {
      if (enabled && i === focusIndex) {
        inputRefs.current[i]?.focus();
      }
    }, [enabled]);
  }

  return (
    <div className="flex gap-1">
      {values.map((_, index) => (
        <div
          className={enabled ? style.flipCard : style.nonFocusFlipCard}
          key={index}
        >
          <div
            className={`${style.flipCardInner} ${
              isFlipped[index] > 0 ? style.flipped : ""
            }`}
          >
            <div className={style.flipCardFront}>
              <span
                id={`${index}`}
                tabIndex={isFlipped[index] > 0 ? -1 : 0}
                key={index}
                className={enabled ? style.title : style.nonFocusTitle}
                contentEditable={enabled}
                onInput={(event) => handleChange(index, event as any)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
              ></span>
            </div>

            <div
              className={
                isFlipped[index] === 1
                  ? style.NotFound
                  : isFlipped[index] === 2
                  ? style.flipCardPositionWrong
                  : style.flipCardFound
              }
            >
              <p className={style.title}>{values[index].value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InputRow;
