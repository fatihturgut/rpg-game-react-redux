const initialState = {
  position: [0, 0],
  spriteLocation: '0px 0px',
  direction: 'EAST',
  walkIndex: 0,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVE_PLAYER":
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default playerReducer;
