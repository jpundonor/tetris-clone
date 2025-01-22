export const TETROMINOS = {
  I: { color: "cyan", shape: [[1], [1], [1], [1]] },
  O: {
    color: "yellow",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  T: {
    color: "magenta",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  L: {
    color: "orange",
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  },
  J: {
    color: "blue",
    shape: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
  },
  S: {
    color: "red",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  Z: {
    color: "green",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
};

export function getRandomTetromino() {
  const keys = Object.keys(TETROMINOS);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOS[randomKey];
}
