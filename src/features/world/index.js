import React, { Component } from "react";
import Map from "../map";
import Player from "../player";

import { tiles } from "../../data/maps/1";
import store from "../../config/store";
import { MAP_HEIGHT, MAP_WIDTH } from "../../config/constants";

class World extends Component {
  render() {
    store.dispatch({ type: "ADD_TILES", payload: { tiles } });
    return (
      <div
        style={{
          position: "relative",
          width: MAP_WIDTH,
          height: MAP_HEIGHT,
          margin: "50px auto",
          border: "4px solid white",
        }}
      >
        <Map />
        <Player />
      </div>
    );
  }
}

export default World;
