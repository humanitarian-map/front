import {fromJS} from "immutable";

export const initialState = fromJS({
    "map": {
        "center": [28.505, 37.09],
        "zoom": 7,
        "drawing": null,
        "points": [
            {"id": 1, "name": "Future placement", "type": "point", "icon": "cross", "position": [28.505, 37.09]},
            {"id": 2, "name": "Camp mosul", "type": "point", "icon": "house1", "position": [29.605, 37.59]},
            {"id": 3, "name": "Camp damasco", "type": "point", "icon": "house2", "position": [29.505, 39.09]},
            {"id": 4, "name": "Bombed", "type": "point", "icon": "info", "position": [27.005, 38.09]},
            {"id": 5, "name": "Refugees X", "type": "point", "icon": "people", "position": [27.505, 37.89]},
            {"id": 6, "name": "Expected movement", "type": "arrow", "origin": [27.705, 37.80], "dest": [28.305, 37.29]},
            {"id": 7, "name": "Dangerous area", "type": "polygon", "positions": [[28.705, 37.80], [28.705, 38.80], [29.305, 37.29]]}
        ]
    },
    "user": {
        "id": 1,
        "username": "ali.ahmed",
        "fullname": "Ali Ahmed",
        "avatar": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAArVAAAAJDU1ZDYxYTc2LWFjMzUtNGQ0Zi1iZjUxLTNlMzZlMTQ2MWY3Nw.jpg",
    }
})

export function reducer(state, action) {
    if (action.type === "ADD_MARKER") {
        let max = state.getIn(['map', 'points']).map((p) => p.get('id')).reduce((acc, p) => p > acc ? p : acc, 0);
        return state.updateIn(['map', 'points'], (points) => points.push(fromJS({id: max + 1, type: "point", position: action.payload.position, icon: "cross"})))
                    .setIn(['map', 'drawing'], null);
    } else if (action.type === "SELECT_TOOL") {
        return state.setIn(['map', 'drawing'], action.payload)
    }
    return state;
}
