export const rotateMatrix = (shape) => {
  return shape[0].map((_, i) => shape.map((row) => row[i]).reverse());
};

export const detectCollision = (grid, piece, position) => {
  const { x: px, y: py } = position;
  return piece.shape.some((row, y) =>
    row.some(
      (cell, x) =>
        cell &&
        (py + y >= grid.length || // Out of vertical limits
          px + x < 0 || // Out of left limits
          px + x >= grid[0].length || // Out of right limits
          grid[py + y]?.[px + x]) // Collision with another piece
    )
  );
};
