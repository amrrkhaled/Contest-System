import { useState, useEffect } from "react";
import { ContestContext } from "./ContextCreation";
import axios from "axios";

export const ContestProvider = ({ children, contestId }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  // Fetch contest start/end time
  useEffect(() => {
    const fetchContestTime = async () => {
      try {
        const response = await axios.get(`/api/contests/${contestId}`);
        const { start_time, end_time } = response.data;

        const now = new Date().getTime();
        const end = new Date(end_time).getTime();
        const remainingSeconds = Math.max(0, Math.floor((end - now) / 1000));

        setTimeLeft(remainingSeconds);
      } catch (err) {
        console.error("Failed to fetch contest times", err);
      }
    };

    fetchContestTime();
  }, [contestId]);

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <ContestContext.Provider value={{ timeLeft }}>
      {children}
    </ContestContext.Provider>
  );
};
