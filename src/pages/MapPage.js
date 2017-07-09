import React, { Component } from 'react';
import MainMap from "../components/MainMap";
import Menu from "../components/Menu";
import './MapPage.css';

const globalData = {
    "map": {
        "center": [28.505, 37.09],
        "zoom": 7,
        "points": [
            {"id": 1, "type": "cross", "position": [28.505, 37.09]},
            {"id": 2, "type": "house1", "position": [29.605, 37.59]},
            {"id": 3, "type": "house2", "position": [29.505, 39.09]},
            {"id": 4, "type": "info", "position": [27.005, 38.09]},
            {"id": 5, "type": "people", "position": [27.505, 37.89]},
            {"id": 6, "type": "arrow", "origin": [27.705, 37.80], "dest": [28.305, 37.29]}
        ]
    },
    "user": {
        "id": 1,
        "username": "ali.ahmed",
        "fullname": "Ali Ahmed",
        "avatar": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAArVAAAAJDU1ZDYxYTc2LWFjMzUtNGQ0Zi1iZjUxLTNlMzZlMTQ2MWY3Nw.jpg",
    }
}

export default class MapPage extends Component {
  render() {
      return (
        <div className="MapPage">
          <div className="map-container">
            <MainMap center={globalData.map.center} zoom={globalData.map.zoom} points={globalData.map.points} />
          </div>
          <div className="menu-container">
            <Menu user={globalData.user} />
          </div>
        </div>
      );
  }
}
