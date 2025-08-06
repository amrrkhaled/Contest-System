import { useState, useEffect } from "react";
import { ContestContext } from "./ContextCreation";

export const ContestProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("contestTime");
    return saved ? parseInt(saved) : 5 * 60 * 60;
  });

  const [solvedProblems, setSolvedProblems] = useState(() => {
    const saved = localStorage.getItem("solvedProblems");
    return saved ? parseInt(saved) : 0;
  });

  // Reset timer on exit site (not refresh)
  useEffect(() => {
    if (!sessionStorage.getItem("initialized")) {
      setTimeLeft(5 * 60 * 60);
      localStorage.setItem("contestTime", 5 * 60 * 60);
      sessionStorage.setItem("initialized", "true");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          localStorage.setItem("contestTime", prev - 1);
          return prev - 1;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("solvedProblems", solvedProblems);
  }, [solvedProblems]);

  return (
    <ContestContext.Provider value={{ timeLeft, solvedProblems, setSolvedProblems }}>
      {children}
    </ContestContext.Provider>
  );
};
