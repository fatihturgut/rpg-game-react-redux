import React, { Component } from "react";
import { connect } from "react-redux";
import walkSprite from "./assets/player-walk.png";
import handleMovement from "./movement";
import { SPRITE_SIZE } from "../../config/constants";

class Player extends Component {
  render() {
    const { position, spriteLocation } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          top: position[1],
          left: position[0],
          backgroundImage: `url('${walkSprite}')`,
          backgroundPosition: spriteLocation,
          width: SPRITE_SIZE,
          height: SPRITE_SIZE
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.player
});

export default connect(mapStateToProps)(handleMovement(Player));
