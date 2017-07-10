export const initialState = {
    "map": {
        "center": [28.505, 37.09],
        "zoom": 7,
        "points": [
            {"id": 1, "type": "point", "icon": "cross", "position": [28.505, 37.09]},
            {"id": 2, "type": "point", "icon": "house1", "position": [29.605, 37.59]},
            {"id": 3, "type": "point", "icon": "house2", "position": [29.505, 39.09]},
            {"id": 4, "type": "point", "icon": "info", "position": [27.005, 38.09]},
            {"id": 5, "type": "point", "icon": "people", "position": [27.505, 37.89]},
            {"id": 6, "type": "arrow", "origin": [27.705, 37.80], "dest": [28.305, 37.29]},
            {"id": 7, "type": "polygon", "positions": [[28.705, 37.80], [28.705, 38.80], [29.305, 37.29]]}
        ]
    },
    "user": {
        "id": 1,
        "username": "ali.ahmed",
        "fullname": "Ali Ahmed",
        "avatar": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAArVAAAAJDU1ZDYxYTc2LWFjMzUtNGQ0Zi1iZjUxLTNlMzZlMTQ2MWY3Nw.jpg",
    }
}

export function reducer(state, action) {
    return state;
}