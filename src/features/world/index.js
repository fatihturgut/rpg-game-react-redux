import React, { Component } from "react";
import Map from "../map";
import Player from "../player";

class World extends Component {
  render() {
    return (
      <div
        style={{
          position: "relative",
          width: "800px",
          height: "400px",
          margin: "10px auto"
        }}
      >
        <Map />
        <Player />
      </div>
    );
  }
}

export default World;
