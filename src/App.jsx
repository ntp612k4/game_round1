import { useState, useRef, useCallback, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import { useGameTimer } from "./hooks/useGameTimer";
import { generateCircles } from "./utils/generateCircles";
import { GAME_STATUS } from "./constants/game";
import "./Game.css";

export default function App() {
  const [status, setStatus] = useState(GAME_STATUS.IDLE);
  const [pointsInput, setPointsInput] = useState(10);
  const [circles, setCircles] = useState([]);
  const [nextToClick, setNextToClick] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [fadingIds, setFadingIds] = useState(new Set());

  const { elapsed, start, stop, reset } = useGameTimer();
  const boardRef = useRef(null);
  const autoPlayRef = useRef(null);
  const handleCircleClickRef = useRef(null);

  // ── CASE 6: Auto Play ─────────────────────────────────
  const scheduleAutoPlay = useCallback((next) => {
    clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => {
      if (handleCircleClickRef.current) {
        handleCircleClickRef.current(next);
      }
    }, 380);
  }, []);

  // ── CASE 1 & 2: Click circle ──────────────────────────
  const handleCircleClick = useCallback(
    (id) => {
      if (status !== GAME_STATUS.PLAYING) return;

      if (id === nextToClick) {
        // CASE 1: Đúng thứ tự → fade out rồi xóa
        setFadingIds((prev) => new Set([...prev, id]));

        setTimeout(() => {
          setFadingIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
          setCircles((prev) =>
            prev.map((c) => (c.id === id ? { ...c, removed: true } : c)),
          );
        }, 900);

        const newNext = nextToClick + 1;
        setNextToClick(newNext);

        // CASE 4: Kiểm tra all cleared
        const remaining = circles.filter((c) => !c.removed && c.id !== id);
        if (remaining.length === 0) {
          setTimeout(() => {
            stop();
            setStatus(GAME_STATUS.CLEARED);
          }, 920);
        } else if (autoPlay) {
          scheduleAutoPlay(newNext);
        }
      } else {
        // CASE 2: Sai thứ tự → Game Over
        stop();
        setStatus(GAME_STATUS.GAMEOVER);
      }
    },
    [status, nextToClick, circles, autoPlay, stop, scheduleAutoPlay],
  );

  // Keep ref updated with latest handler
  useEffect(() => {
    handleCircleClickRef.current = handleCircleClick;
  }, [handleCircleClick]);

  // ── CASE 5: Play ──────────────────────────────────────
  const handlePlay = useCallback(() => {
    const bw = boardRef.current?.clientWidth || 560;
    const count = Math.max(1, Math.min(500, pointsInput));
    reset();
    setCircles(generateCircles(count, bw));
    setNextToClick(1);
    setAutoPlay(false);
    setFadingIds(new Set());
    setStatus(GAME_STATUS.PLAYING);
    start();
  }, [pointsInput, reset, start]);

  // ── CASE 5: Restart ───────────────────────────────────
  const handleRestart = useCallback(() => {
    stop();
    clearTimeout(autoPlayRef.current);
    reset();
    setCircles([]);
    setFadingIds(new Set());
    setAutoPlay(false);
    setStatus(GAME_STATUS.IDLE);
  }, [stop, reset]);

  const titleClass = {
    [GAME_STATUS.IDLE]: "playing",
    [GAME_STATUS.PLAYING]: "playing",
    [GAME_STATUS.CLEARED]: "cleared",
    [GAME_STATUS.GAMEOVER]: "gameover",
  }[status];

  const titleText = {
    [GAME_STATUS.IDLE]: "LET'S PLAY",
    [GAME_STATUS.PLAYING]: "LET'S PLAY",
    [GAME_STATUS.CLEARED]: "ALL CLEARED",
    [GAME_STATUS.GAMEOVER]: "GAME OVER",
  }[status];

  return (
    <div className="game-wrapper">
      <h2 className={`game-title ${titleClass}`}>{titleText}</h2>

      {/* Points */}
      <div className="info-row">
        <label>Points:</label>
        <input
          type="number"
          value={pointsInput}
          onChange={(e) => setPointsInput(Number(e.target.value))}
          disabled={status === GAME_STATUS.PLAYING}
        />
      </div>

      {/* Time */}
      <div className="info-row">
        <label>Time:</label>
        <span>{elapsed.toFixed(1)}s</span>
      </div>

      {/* Buttons */}
      <div className="btn-row">
        {status === GAME_STATUS.IDLE ? (
          <button className="btn" onClick={handlePlay}>
            Play
          </button>
        ) : (
          <>
            <button className="btn" onClick={handleRestart}>
              Restart
            </button>
            {status === GAME_STATUS.PLAYING && (
              <button
                className="btn"
                onClick={() => {
                  const next = !autoPlay;
                  setAutoPlay(next);
                  if (next) scheduleAutoPlay(nextToClick);
                }}
              >
                Auto Play {autoPlay ? "OFF" : "ON"}
              </button>
            )}
          </>
        )}
      </div>

      {/* Board */}
      <div ref={boardRef}>
        <GameBoard
          circles={circles}
          fadingIds={fadingIds}
          onCircleClick={handleCircleClick}
        />
      </div>

      {/* Next hint */}
      {status === GAME_STATUS.PLAYING && (
        <div className="next-hint">Next: {nextToClick}</div>
      )}
    </div>
  );
}
