import { useState, useRef, useCallback } from "react";

export function useGameTimer() {
  const [elapsed, setElapsed] = useState(0);
  const tickRef = useRef(null);

  const stop = useCallback(() => {
    clearInterval(tickRef.current);
    tickRef.current = null;
  }, []);

  const start = useCallback(() => {
    stop();
    let last = Date.now();
    tickRef.current = setInterval(() => {
      const now = Date.now();
      setElapsed((prev) => prev + (now - last) / 1000);
      last = now;
    }, 100);
  }, [stop]);

  const reset = useCallback(() => {
    stop();
    setElapsed(0);
  }, [stop]);

  return { elapsed, start, stop, reset };
}