import store from "../../../config/store";
import { SPRITE_SIZE } from "../../../config/constants";

const handleMovement = Player => {
  const getNewPosition = direction => {
    const oldPosition = store.getState().player.position;
    switch (direction) {
      case "WEST":
        return [oldPosition[0] - SPRITE_SIZE, oldPosition[1]];
      case "EAST":
        return [oldPosition[0] + SPRITE_SIZE, oldPosition[1]];
      case "NORTH":
        return [oldPosition[0], oldPosition[1] + SPRITE_SIZE];
      case "SOUTH":
        return [oldPosition[0], oldPosition[1] - SPRITE_SIZE];
    }
  };

  const dispatchMove = direction => {
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        position: getNewPosition(direction)
      }
    });
  };

  const handleKeyDown = event => {
    event.preventDefault();
    switch (event.keyCode) {
      case 37:
        return dispatchMove("WEST");
      case 39:
        return dispatchMove("EAST");
      case 40:
        return dispatchMove("NORTH");
      case 38:
        return dispatchMove("SOUTH");
      default:
        return null;
    }
  };
  window.addEventListener("keydown", event => {
    handleKeyDown(event);
  });
  return Player;
};

export default handleMovement;
