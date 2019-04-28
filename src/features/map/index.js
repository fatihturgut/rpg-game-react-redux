import React, { Component } from "react";
import { connect } from "react-redux";
import { SPRITE_SIZE } from "../../config/constants";
import "./styles.css";

const getTileSprite = type => {
  switch (type) {
    case 0:
      return "grass";
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
  return tiles.map(tile => <MapTile tile={tile} />);
};

class Map extends Component {
  render() {
    const { tiles } = this.props;
    return (
      <div
        style={{
          position: "relative",
          width: "800px",
          height: "400px",
          backgroundColor: "green",
          border: "4px solid white",
          margin: "10px auto"
        }}
      >
        {tiles.map(oneRowTiles => (
          <MapRow tiles={oneRowTiles} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tiles: state.map.tiles
});

export default connect(mapStateToProps)(Map);
