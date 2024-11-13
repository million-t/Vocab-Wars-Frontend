"use client";
import React, { useEffect, useState } from "react";
// import { getToken } from "@/services/authService";

interface StandingEntry {
  user: string;
  score: number;
  rank: number;
  guesses: number[];
}

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const Rank = () => {
  const contestId = 12;
  const [wordsCount, setWordsCount] = useState(0);
  const [standings, setStandings] = useState<StandingEntry[]>([]);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://vocab-wars-latest.onrender.com/ws/${contestId}/standings/`
    );

    socket.onmessage = function (event) {
      try {
        const data = JSON.parse(event.data);
        // console.log("Standings updated:", data.standings.standings);
        const newStandings = data.standings.standings;
        setStandings(newStandings as StandingEntry[]);
        if (newStandings.length > 0) {
          setWordsCount(newStandings[0].guesses.length);
        }
      } catch (e) {
        console.error(e);
        return;
      }
    };

    socket.onclose = function (event) {
      console.error("WebSocket closed unexpectedly", event);
    };

    return () => {
      socket.close();
    };
  }, [contestId]);

  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl h-full ">
        <h1 className="w-full m-2">Leaderboard</h1>

        <div className="relative w-full overflow-x-auto shadow-md rounded-lg">
          <table className="w-full  text-sm text-left rtl:text-right ">
            <thead className="text-xs bg-[#0B0B0B] text-text-primary">
              <tr>
                <th scope="col" className="pr-2 pl-4 py-3">
                  #
                </th>
                <th scope="col" className="px-2 py-3">
                  Player
                </th>
                <th scope="col" className="px-2 py-3">
                  Score
                </th>
                {Array.from({ length: wordsCount }, (_, i) => (
                  <th key={i} scope="col" className="px-2 py-3">
                    {letters[i]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {standings.map((standing, index) => (
                <tr
                  key={index}
                  className="odd:bg-darker-background even:bg-[#101010]  text-text-primary"
                >
                  <th
                    scope="row"
                    className="pr-2 pl-4 py-4 font-medium  whitespace-nowrap "
                  >
                    {standing.rank}
                  </th>
                  <td className="px-2 py-4">{standing.user}</td>
                  <td className="px-2 py-4">{standing.score}</td>
                  {standing.guesses.map((guess, index) => (
                    <td key={index} className="px-2 py-4">
                      {guess}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rank;
