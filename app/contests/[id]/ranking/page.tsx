"use client";
import React, { useEffect, useState } from "react";
import { getToken } from "@/services/authService";

interface StandingEntry {
  user: string;
  score: number;
}

const Rank = () => {
  const contestId = 1;
  const [standings, setStandings] = useState<StandingEntry[]>([]);

  useEffect(() => {
    const token = getToken();

    const socket = new WebSocket(
      `ws://localhost:8000/ws/${contestId}/standings/`
    );

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log("Standings updated:", data.standings);
      setStandings(data.standings.standings);
    };

    socket.onclose = function (event) {
      console.error("WebSocket closed unexpectedly", event);
    };

    return () => {
      socket.close();
    };
  }, [contestId]);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul className="w-full flex justify-center items-center">
        {standings.map((standing, index) => (
          <li key={index} className="text-white">
            {standing.user}: {standing.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rank;
