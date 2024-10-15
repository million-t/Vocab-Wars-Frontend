"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4OTc0OTQ1LCJpYXQiOjE3Mjg5NzMxNDUsImp0aSI6IjgyNzE2NWRhNDFlYzQ2MGM4OTc3MDllYzNmMTRkM2VlIiwidXNlcl9pZCI6MX0.d0FVJSW07qKH83U6vCiKrJ-KgRr4ZSqVJpsVCrjI27Q";

const Rank = () => {
  const id = 1;
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/api/contests/${id}/standings/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setStandings(data.standings)
              console.log(data.standings);
            });
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the standings!", error);
        });
    }
  }, [id]);
  return <div className="flex flex-col justify-center">
    {standings.map((standing, index) => {
      console.log(standing)
      return (
        <div key={index} className="flex justify-between gap-3">
          <div>name: {standing.user}</div>
          <div>score: {standing.score} </div>
        </div>)
    })}
  </div>;
};

export default Rank;
