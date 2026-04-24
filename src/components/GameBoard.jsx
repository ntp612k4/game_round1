import Circle from "./Circle";

export default function GameBoard({ circles, fadingIds, onCircleClick }) {
  return (
    <div className="game-board">
      {circles
        .filter((c) => !c.removed || fadingIds.has(c.id))
        .map((c) => (
          <Circle
            key={c.id}
            circle={c}
            onClick={onCircleClick}
            isFading={fadingIds.has(c.id)}
          />
        ))}
    </div>
  );
}
