import React, { Component } from "react";
import Map from "../map";
import Player from "../player";

import { tiles } from "../../data/maps/1";
import store from "../../config/store";

class World extends Component {
  render() {
    store.dispatch({ type: "ADD_TILES", payload: { tiles } });
    return (
      <div
        style={{
          position: "relative",
          width: "800px",
          height: "480px",
          margin: "40px auto",
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
