import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  SPRITE_SIZE,
  PLAYER_SIGHT_OF_RANGE
} from "../../config/constants";
import "./styles.css";

const getTileSprite = type => {
  switch (type) {
    case 0:
      return "grass";
    case 3:
      return "dirt-road";
    case 4:
      return "chest";
    case 5:
      return "rock";
    case 6:
      return "tree";
    default:
      return "grass";
  }
};

const hasShadow = (columnIndex, rowIndex, playerPosition) => {
  const playetPositionX = playerPosition[0] / SPRITE_SIZE;
  const playerPositionY = playerPosition[1] / SPRITE_SIZE;
  const a = Math.abs(columnIndex - playerPositionY);
  const b = Math.abs(rowIndex - playetPositionX);
  return a >= PLAYER_SIGHT_OF_RANGE || b >= PLAYER_SIGHT_OF_RANGE;
};

const MapTile = props => {
  const { tile, columnIndex, rowIndex, playerPosition } = props;
  return (
    <div
      className={`tile ${getTileSprite(tile)}`}
      style={{ height: SPRITE_SIZE, width: SPRITE_SIZE }}
    >
      {hasShadow(columnIndex, rowIndex, playerPosition) && (
        <div
          className="shadow"
          style={{ height: SPRITE_SIZE, width: SPRITE_SIZE }}
        />
      )}
    </div>
  );
};

const MapRow = props => {
  const { oneRowTiles, playerPosition, columnIndex } = props;
  return (
    <div
      className="row"
      style={{
        height: SPRITE_SIZE
      }}
    >
      {oneRowTiles.map((tile, rowIndex) => {
        return (
          <MapTile
            key={rowIndex}
            tile={tile}
            columnIndex={columnIndex}
            rowIndex={rowIndex}
            playerPosition={playerPosition}
          />
        );
      })}
    </div>
  );
};

class Map extends Component {
  render() {
    const { tiles, playerPosition } = this.props;
    return (
      <div
        style={{
          position: "relative",
          width: MAP_WIDTH,
          height: MAP_HEIGHT,
          backgroundColor: "#42B842"
        }}
      >
        {tiles.map((oneRowTiles, columnIndex) => (
          <MapRow
            key={columnIndex}
            columnIndex={columnIndex}
            oneRowTiles={oneRowTiles}
            playerPosition={playerPosition}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tiles: state.map.tiles,
  playerPosition: state.player.position
});

export default connect(mapStateToProps)(Map);
