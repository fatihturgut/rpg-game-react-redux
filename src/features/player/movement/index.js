import store from "../../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../config/constants";

const getNewPosition = direction => {
  const oldPosition = store.getState().player.position;
  switch (direction) {
    case "WEST":
      return [oldPosition[0] - SPRITE_SIZE, oldPosition[1]];
    case "EAST":
      return [oldPosition[0] + SPRITE_SIZE, oldPosition[1]];
    case "NORTH":
      return [oldPosition[0], oldPosition[1] - SPRITE_SIZE];
    case "SOUTH":
      return [oldPosition[0], oldPosition[1] + SPRITE_SIZE];
  }
};

const getSpriteLocation = (direction, walkIndex) => {
  switch (direction) {
    case "SOUTH":
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
    case "EAST":
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
    case "WEST":
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
    case "NORTH":
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
  }
};

const getWalkIndex = () => {
  const walkIndex = store.getState().player.walkIndex;
  return walkIndex >= 8 ? 0 : walkIndex + 1;
}

const observeBoundaries = newPosition => {
  return (newPosition[0] >= 0 && newPosition[0] <= MAP_WIDTH - SPRITE_SIZE) &&
    (newPosition[1] >= 0 && newPosition[1] <= MAP_HEIGHT - SPRITE_SIZE);
};

const observeImpassable = newPosition => {
  const tiles = store.getState().map.tiles;
  const y = newPosition[1] / SPRITE_SIZE;
  const x = newPosition[0] / SPRITE_SIZE;
  const nextTile = tiles[y][x];
  return nextTile < 5;
}

const dispatchMove = (direction, newPosition) => {
  const walkIndex = getWalkIndex();
  store.dispatch({
    type: "MOVE_PLAYER",
    payload: {
      position: newPosition,
      direction,
      walkIndex,
      spriteLocation: getSpriteLocation(direction, walkIndex),
    }
  });
};

const attemptMove = direction => {
  const newPosition = getNewPosition(direction);
  if(observeBoundaries(newPosition) && observeImpassable(newPosition)) {
    dispatchMove(direction, newPosition);
  }
};

const handleKeyDown = event => {
  event.preventDefault();
  switch (event.keyCode) {
    case 37:
    case 65:
      return attemptMove("WEST");
    case 39:
    case 68:
    return attemptMove("EAST");
    case 38:
    case 87:
    return attemptMove("NORTH");
    case 40:
    case 83:
      return attemptMove("SOUTH");
    default:
      return null;
  }
};

const handleMovement = Player => {
  window.addEventListener("keydown", event => {
    handleKeyDown(event);
  });
  return Player;
};

export default handleMovement;
