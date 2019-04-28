import React, { Component } from "react";
import { connect } from "react-redux";
import { MAP_HEIGHT, MAP_WIDTH, SPRITE_SIZE } from "../../config/constants";
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

const MapTile = props => {
  const { tile } = props;
  return (
    <div
      className={`tile ${getTileSprite(tile)}`}
      style={{ height: SPRITE_SIZE, width: SPRITE_SIZE }}
    />
  );
};

const MapRow = props => {
  const { tiles } = props;
  return (
    <div
      className="row"
      style={{
        height: SPRITE_SIZE
      }}
    >
      {tiles.map((tile, index) => (
        <MapTile key={index} tile={tile} />
      ))}
    </div>
  );
};

class Map extends Component {
  render() {
    const { tiles } = this.props;
    return (
      <div
        style={{
          position: "relative",
          width: MAP_WIDTH,
          height: MAP_HEIGHT,
          backgroundColor: "#42B842"
        }}
      >
        {tiles.map((oneRowTiles, index) => (
          <MapRow key={index} tiles={oneRowTiles} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tiles: state.map.tiles
});

export default connect(mapStateToProps)(Map);
