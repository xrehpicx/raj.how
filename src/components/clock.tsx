"use client";

import React, { useState, useEffect } from "react";

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const indiaTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      );
      setTime(indiaTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateRotation = (unit: number, isHour: boolean = false) => {
    const degree = isHour ? unit * 30 : unit * 6;
    return `rotate(${degree} 50 50)`;
  };

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <svg
      suppressHydrationWarning
      width="18px"
      height="18px"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="black"
        strokeWidth="4"
        fill="transparent"
      />
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="20"
        suppressHydrationWarning
        transform={calculateRotation(hours, true)}
        stroke="black"
        strokeWidth="4"
      />
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="15"
        suppressHydrationWarning
        transform={calculateRotation(minutes)}
        stroke="black"
        strokeWidth="4"
      />
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="10"
        suppressHydrationWarning
        transform={calculateRotation(seconds)}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Clock;
