"use client";
import React, { useRef, useState, useEffect } from "react";
import style from "./grid-row.module.css";
import { submitGuess } from "@/services/apiServices";
import allWords from "@/data/filtered.json";

const allWordsSet = new Set(allWords);

interface GridRowProps {
  cellCount: number;
  // submitted: boolean;
  // guess_num: number;
  acceptsInputs: boolean;
  gridOnFocus: boolean;
  focusRow: number;
  focusIndex: number;
  contestId: number;
  wordId: number;
  // guess_text: string[];
  rowNum: number;
  isSubmitted: boolean;
  found: boolean;
  submittedGuess: string;
  submittedScore: number[];
  curCharInfo: number[];
  setFound: (found: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  setFocusRow: (index: number) => void;
  setFocusIndex: (index: number) => void;
  setCurCharInfo: (charArray: number[]) => void;
  setStatus: (index: number) => void;
}

const GridRow: React.FC<GridRowProps> = ({
  cellCount = 5,
  // submitted,
  // guess_num,
  acceptsInputs,
  gridOnFocus,
  focusRow,
  contestId,
  wordId,
  focusIndex,
  // guess_text = [],
  rowNum,
  setFocusRow,
  setFocusIndex,
  isSubmitted,
  setIsSubmitted,
  found,
  submittedGuess,
  submittedScore,
  setFound,
  curCharInfo,
  setCurCharInfo,
  setStatus,
}) => {
  const [guess_score, setGuessScore] = useState([0, 0, 0, 0, 0]);
  // const [initialLoad, setInitialLoad ] = useState(true);
  const inputRefs = useRef<HTMLSpanElement[]>([]);
  const [flippedStates, setFlippedStates] = useState<number[]>(
    Array(cellCount).fill(0)
  );
  const [values, setValues] = useState(
    Array.from({ length: cellCount }).map((_, index) => {
      return { id: index, value: "" };
    })
  );
  // const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    index: number,
    event: React.FormEvent<HTMLSpanElement>
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

  const setIsFlipped = (index: number, value: number) => {
    setFlippedStates((prev) => {
      const newState = [...prev];
      newState[index] = value;
      return newState;
    });
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLSpanElement>
  ): void => {
    console.log(event.key);

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
    } else {
      // alphabetic input
      if (event.key.match(/^[a-zA-Z]$/)) {
        const span = event.target as HTMLSpanElement;
        span.innerText = event.key.toUpperCase();

        const newValues = [...values];
        newValues[index] = { id: index, value: event.key.toUpperCase() };
        setValues(newValues);

        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    }
  };
  const unfocusSpan = (index: number) => {
    inputRefs.current[index]?.blur();
  };

  const handleSubmit = async () => {
    const guess = values
      .map((value) => value.value.trim())
      .join("")
      .toUpperCase();
    console.log(guess);
    if (guess.length < cellCount) {
      return;
    }

    try {
      if (!allWordsSet.has(guess.toUpperCase())) {
        console.log("I'm sorry I don't know this word.");
        return;
      }

      const response = await submitGuess(contestId, guess, "A", wordId);
      if (response.status === 200) {
        setIsSubmitted(true);
        setGuessScore(response.data.data);

        // const guess_text = values.map((value) => value.value.trim());
        setFocusRow(rowNum + 1);
        setFocusIndex(0);
        if (response.data.correct) {
          setFound(true);
          setStatus(2);
          setFocusIndex(-1);
        } else {
          setStatus(1);
        }
      }
    } catch (error) {
      console.error("Error submitting guess", error);
    }
  };

  // =================================================== submission animation =========================================
  // initial fetched submission animation
  useEffect(() => {
    if (isSubmitted) {
      const newValues = [...values];

      Array.from(submittedGuess).forEach((guess, index) => {
        newValues[index] = { id: index, value: guess.toUpperCase() };
      });
      setValues(newValues);
      setGuessScore(submittedScore);
      for (let i = 0; i < cellCount; i++) {
        unfocusSpan(i);
        setTimeout(() => {
          // console.log(guess_score[i]);
          if (submittedScore[i] == 3) {
            setIsFlipped(i, 3);
            // setIsFlipped[i](3);
          } else if (submittedScore[i] == 2) {
            // setIsFlipped[i](2);
            setIsFlipped(i, 2);
          } else {
            setIsFlipped(i, 1);
            // setIsFlipped[i](1);
          }
        }, i * 100);
      }
    }
    // setInitialLoad(false);
  }, [submittedGuess]);

  useEffect(() => {
    for (let i = 0; i < cellCount; i++) {
      if (isSubmitted && focusRow - 1 === rowNum) {
        unfocusSpan(i);
        setTimeout(() => {
          if (guess_score[i] == 3) {
            setIsFlipped(i, 3);
            // setIsFlipped[i](3);
          } else if (guess_score[i] == 2) {
            setIsFlipped(i, 2);
            // setIsFlipped[i](2);
          } else {
            // setIsFlipped[i](1);
            setIsFlipped(i, 1);
          }
        }, i * 100);
      }

      if (
        gridOnFocus &&
        acceptsInputs &&
        focusRow === rowNum &&
        i === focusIndex
      ) {
        inputRefs.current[i]?.focus();
      }
    }
  }, [focusRow]);

  useEffect(() => {
    if (guess_score.length > 0) {
      const newCharInfo = [...curCharInfo];
      for (let i = 0; i < cellCount; i++) {
        if (guess_score[i] > curCharInfo[values[i].value.charCodeAt(0) - 65]) {
          newCharInfo[values[i].value.charCodeAt(0) - 65] = guess_score[i];
        }
      }
      setCurCharInfo(newCharInfo);
    }
  }, [guess_score]);
  useEffect(() => {
    if (gridOnFocus) {
      const newCharInfo = [...curCharInfo];
      setCurCharInfo(newCharInfo);
    }
  }, [gridOnFocus]);

  // =================================================== return ===================================================

  return (
    <div className="flex gap-[2px] md:gap-1">
      {values.map((_, index) => (
        <div
          className={`${
            gridOnFocus && focusRow === rowNum && acceptsInputs
              ? style.flipCard
              : style.nonFocusFlipCard
          } w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-sm md:rounded-md shadow-cell overflow-hidden text-2xl bg-[#1A1A1A] md:text-4xl font-black`}
          key={index}
        >
          <div
            className={`${style.flipCardInner} ${
              flippedStates[index] > 0 ? style.flipped : ""
            }`}
          >
            <div
              className={found ? style.flipCardFoundFront : style.flipCardFront}
            >
              <span
                id={`${index}`}
                tabIndex={
                  flippedStates[index] > 0 || found || isSubmitted ? -1 : 0
                }
                key={index}
                className={`${
                  gridOnFocus && focusRow === rowNum && acceptsInputs
                    ? style.title
                    : style.nonFocusTitle
                } `}
                contentEditable={false}
                suppressContentEditableWarning
                onInput={(event) => handleChange(index, event)}
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
                flippedStates[index] === 1
                  ? style.NotFound
                  : flippedStates[index] === 2
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
