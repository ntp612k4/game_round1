import { CIRCLE_RADIUS } from "../constants/game";

export function generateCircles(count, boardWidth) {
  const R = CIRCLE_RADIUS;
  const BH = 360;
  const circles = [];

  for (let i = 1; i <= count; i++) {
    let x,
      y,
      ok,
      tries = 0;

    do {
      x = R + 2 + Math.random() * (boardWidth - R * 2 - 4);
      y = R + 2 + Math.random() * (BH - R * 2 - 4);
      ok = circles.every((c) => {
        const dx = c.x - x;
        const dy = c.y - y;
        return Math.sqrt(dx * dx + dy * dy) >= R * 2.4;
      });
      tries++;
    } while (!ok && tries < 120);

    circles.push({ id: i, x, y, removed: false });
  }

  return circles;
}
