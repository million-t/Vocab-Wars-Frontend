"use client";
import React, { useState, useEffect } from "react";
import GridRow from "../grid-row/grid-row";
import { getGuesses } from "@/services/apiServices";

const rowCount = 6;
interface GridProps {
  wordId: number;
  contestId: number;
  gridOnFocus: boolean;
  acceptsInputs: boolean;
  // currentRow: number;
  clickedChar: string[];
  setCharInfo: (charArray: number[]) => void;
  setStatus: (index: number) => void;
}

function Grid({
  wordId,
  contestId,
  gridOnFocus,
  acceptsInputs,
  // currentRow,
  clickedChar,
  setCharInfo,
  setStatus,
}: GridProps) {
  const [focusRow, setFocusRow] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [found, setFound] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [curCharInfo, setCurCharInfo] = useState<number[]>(
    Array.from({ length: 26 }, () => 0)
  );
  useEffect(() => {
    setCharInfo(curCharInfo);
  }, [curCharInfo]);
  const fetchGuesses = async () => {
    try {
      const data = await getGuesses(contestId, wordId);
      const submitted_guesses = Array.isArray(data) ? [] : data.data;
      submitted_guesses?.sort(
        (
          a: { timestamp: string | number | Date },
          b: { timestamp: string | number | Date }
        ) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      const newGuesses = [];
      const newScores = [];
      for (let i = 0; i < Math.min(6, submitted_guesses?.length); i++) {
        newGuesses.push(submitted_guesses[i].guess_text);
        newScores.push(submitted_guesses[i].score.data);
        if (submitted_guesses[i].score.correct) {
          setFound(true);
          setStatus(2);
        }
        setStatus(1);
        setIsSubmitted(true);
      }
      setGuesses(newGuesses);
      setScores(newScores);
      // setGuesses(data);
      // const newGuesses = submitted_guesses.map((guess: { guess_text: any; score: }) => guess.guess_text);
    } catch (error) {
      console.error("Error fetching guesses:", error);
    }
  };
  useEffect(() => {
    fetchGuesses();
  }, [contestId, wordId]);

  
  return (
    <div className="flex flex-col gap-[2px] md:gap-1  ">
      {[...Array(rowCount)].map((_, index) => (
        <GridRow
          key={index}
          // guess_num={index + 1}
          cellCount={5}
          wordId={wordId}
          contestId={contestId}
          // submitted={false}
          acceptsInputs={acceptsInputs}
          gridOnFocus={gridOnFocus}
          focusRow={focusRow}
          focusIndex={focusIndex}
          setFocusRow={setFocusRow}
          setFocusIndex={setFocusIndex}
          rowNum={index}
          // guess_text={[]}
          clickedChar={clickedChar}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          found={found}
          submittedGuess={guesses[index] || ""}
          submittedScore={Array.isArray(scores[index]) ? scores[index] : []}
          setFound={setFound}
          setCurCharInfo={setCurCharInfo}
          curCharInfo={curCharInfo}
          setStatus={setStatus}
        />
      ))}
    </div>
  );
}

export default Grid;
