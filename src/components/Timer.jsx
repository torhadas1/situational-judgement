import React, { useEffect, useState } from "react";
import "./Timer.css";

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Timer({ startedAt, durationMinutes }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const totalSec = durationMinutes * 60;
  const elapsedSec = Math.max(0, Math.floor((now - startedAt) / 1000));
  const remainingSec = Math.max(0, totalSec - elapsedSec);
  const minutes = Math.floor(remainingSec / 60);
  const fractionRemaining = totalSec > 0 ? remainingSec / totalSec : 0;
  const dashOffset = CIRCUMFERENCE * (1 - fractionRemaining);

  return (
    <div className="sjs-timer">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r={RADIUS} fill="none"
                stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
        <circle cx="30" cy="30" r={RADIUS} fill="none"
                stroke="var(--accent-green)" strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                transform="scale(-1,1) translate(-60,0) rotate(-90,30,30)" />
        {remainingSec > 0 ? (
          <>
            <text x="30" y="25" textAnchor="middle" dominantBaseline="central"
                  fill="var(--text)" fontSize="16" fontWeight="700">{minutes}</text>
            <text x="30" y="39" textAnchor="middle" dominantBaseline="central"
                  fill="var(--text)" fontSize="9">min</text>
          </>
        ) : (
          <text x="30" y="30" textAnchor="middle" dominantBaseline="central"
                fill="var(--text)" fontSize="9">Time's up</text>
        )}
      </svg>
    </div>
  );
}
