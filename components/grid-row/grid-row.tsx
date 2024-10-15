"use client";
import React, { useRef, useState, useEffect } from "react";
import style from "./grid-row.module.css";
import { FaLock } from "react-icons/fa";

interface GridRowProps {
  cellCount: number;
  submitted: boolean;
  guess_num: number;
  acceptsInputs: boolean;
  gridOnFocus: boolean;
  focusRow: number;
  focusIndex: number;
  contestId: number;
  wordId: number;
  guess_text: string[];
  rowNum: number;
  isSubmitted: boolean;
  found: boolean;
  setFound: (found: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  setFocusRow: (index: number) => void;
  setFocusIndex: (index: number) => void;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4OTc0OTQ1LCJpYXQiOjE3Mjg5NzMxNDUsImp0aSI6IjgyNzE2NWRhNDFlYzQ2MGM4OTc3MDllYzNmMTRkM2VlIiwidXNlcl9pZCI6MX0.d0FVJSW07qKH83U6vCiKrJ-KgRr4ZSqVJpsVCrjI27Q";

const GridRow: React.FC<GridRowProps> = ({
  cellCount = 5,
  submitted,
  guess_num,
  acceptsInputs,
  gridOnFocus,
  focusRow,
  contestId,
  wordId,
  focusIndex,
  guess_text = [],
  rowNum,
  setFocusRow,
  setFocusIndex,
  isSubmitted,
  setIsSubmitted,
  found,
  setFound,
}) => {
  // const [isSubmitted, setIsSubmitted] = useState(submitted);
  const [guess_score, setGuessScore] = useState([0, 0, 0, 0, 0]);
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
  // const handleSubmit = () => {
  //   const result = values.map((value) => value.value.trim()).join("");
  //   console.log(result);
  //   if (result.length < cellCount) {
  //     return;
  //   }
  // };

  const handleSubmit = () => {
    const guess = values.map((value) => value.value.trim()).join("");
    console.log(guess);
    if (guess.length < cellCount) {
      return;
    }

    fetch(`http://127.0.0.1:8000/api/contests/${contestId}/submit_guess/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        word_id: wordId,
        guess_text: guess,
      }),
    }).then((response) => {
      if (response.ok) {
        console.log("response ok!!");
        response.json().then((data) => {
          setIsSubmitted(true);
          console.log(data.data);
          setGuessScore(data.data);

          guess_text = values.map((value) => value.value.trim());
          setFocusRow(rowNum + 1);
          setFocusIndex(0);
          console.log("focusRow", focusRow, rowNum);
          console.log("focusIndex", focusIndex);
          if (data.correct) {
            setFound(true);
            setFocusIndex(-1);
          }
        });
        // console.log("done");
      } else {
        throw new Error("Failed to submit guess");
      }
    });
  };

  // ===================================================

  for (let i = 0; i < cellCount; i++) {
    useEffect(() => {
      if (isSubmitted && focusRow - 1 === rowNum) {
        unfocusSpan(i);
        setTimeout(() => {
          if (guess_score[i] == 3) {
            setIsFlipped[i](3);
          } else if (guess_score[i] == 2) {
            setIsFlipped[i](2);
          } else {
            setIsFlipped[i](1);
          }
        }, i * 100);
      }
    }, [focusRow]);
    useEffect(() => {
      if (
        gridOnFocus &&
        acceptsInputs &&
        focusRow === rowNum &&
        i === focusIndex
      ) {
        inputRefs.current[i]?.focus();
      }
    }, [focusRow]);
  }
  // =================================================== return ===================================================

  return (
    <div className="flex gap-1">
      {values.map((_, index) => (
        <div
          className={`${
            gridOnFocus && focusRow === rowNum && acceptsInputs
              ? style.flipCard
              : style.nonFocusFlipCard
          } w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-md shadow-cell overflow-hidden text-2xl md:text-4xl font-black`}
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
                tabIndex={isFlipped[index] > 0 || found ? -1 : 0}
                key={index}
                className={`${
                  gridOnFocus && focusRow === rowNum && acceptsInputs
                    ? style.title
                    : style.nonFocusTitle
                } `}
                contentEditable={
                  gridOnFocus && focusRow === rowNum && acceptsInputs && !found
                }
                onInput={(event) => handleChange(index, event as any)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
              >
                {/* {(!isSubmitted && !rowOnFocus) ? <FaLock className="text-gray-200 block"/> : null} */}
              </span>
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

export default GridRow;
