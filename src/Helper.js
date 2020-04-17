export const worldWidth = 40;
export const worldHeight = 40;

const createEmptyWorld = () => {
  const world = [];
  for (let row = 0; row < worldHeight; row++) {
    for (let col = 0; col < worldWidth; col++) {
      world.push(0);
    }
  }
  return world;
};

export const randomWorld = () => {
  const world = [];
  for (let row = 0; row < worldHeight; row++) {
    for (let col = 0; col < worldWidth; col++) {
      const randomNumber = Math.floor(Math.random() * 1000);
      world.push(randomNumber < 200 ? 1 : 0);
    }
  }
  return world;
};

export const makeGlider = () => {
  const world = createEmptyWorld();
  const randomRow = Math.floor(Math.random() * worldHeight - 5) * worldWidth;
  const randomCol = Math.floor(Math.random() * worldWidth - 5);

  world[randomRow + randomCol + 1] = 1;
  world[randomRow + worldWidth * 1 + randomCol + 2] = 1;
  world[randomRow + worldWidth * 2 + randomCol] = 1;
  world[randomRow + worldWidth * 2 + randomCol + 1] = 1;
  world[randomRow + worldWidth * 2 + randomCol + 2] = 1;

  return world;
};

export const evolution = world => {
  let lives = 0;
  let newWorld = [];
  for (let row = 0; row < worldHeight; row++) {
    for (let col = 0; col < worldWidth; col++) {
      let prevRow = row === 0 ? worldHeight - 1 : row - 1;
      let nextRow = row === worldHeight - 1 ? 0 : row + 1;

      let prevCol = col === 0 ? worldWidth - 1 : col - 1;
      let nextCol = col === worldWidth - 1 ? 0 : col + 1;

      lives +=
        world[prevRow * worldWidth + col] +
        world[prevRow * worldWidth + prevCol] +
        world[prevRow * worldWidth + nextCol];

      lives +=
        world[nextRow * worldWidth + col] +
        world[nextRow * worldWidth + prevCol] +
        world[nextRow * worldWidth + nextCol];

      lives +=
        world[row * worldWidth + nextCol] + world[row * worldWidth + prevCol];

      newWorld.push(
        lives === 3 || (lives === 2 && world[row * worldWidth + col] === 1)
          ? 1
          : 0
      );
      lives = 0;
    }
  }
  return newWorld;
};
