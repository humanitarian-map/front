import {fromJS} from "immutable";

export const initialState = fromJS({
    "map": {
        "center": [28.505, 37.09],
        "cursor": [0, 0],
        "zoom": 7,
        "drawing": {
            type: null
        },
        "points": [
            {"id": 1, "name": "Future placement", "type": "cross", "position": [28.505, 37.09]},
            {"id": 2, "name": "Camp mosul", "type": "point", "icon": "camp", "position": [29.605, 37.59]},
            {"id": 3, "name": "Camp damasco", "type": "point", "icon": "camp", "position": [29.505, 39.09]},
            {"id": 4, "name": "Bombed", "type": "point", "icon": "warning", "position": [27.005, 38.09]},
            {"id": 5, "name": "Refugees X", "type": "point", "icon": "idps", "position": [27.505, 37.89]},
            {"id": 6, "name": "Expected movement", "type": "arrow", "origin": [27.705, 37.80], "dest": [28.305, 37.29]},
            {"id": 7, "name": "Dangerous area", "type": "polygon", "positions": [[28.705, 37.80], [28.705, 38.80], [29.305, 37.29]]}
        ]
    },
    "displayProjectDetail": true,
    "user": {
        "id": 1,
        "username": "ali.ahmed",
        "fullname": "Ali Ahmed",
        "avatar": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAArVAAAAJDU1ZDYxYTc2LWFjMzUtNGQ0Zi1iZjUxLTNlMzZlMTQ2MWY3Nw.jpg",
    }
})

export function reducer(state, action) {
    if (action.type === "ADD_MARKER") {
        return state.setIn(['map', 'drawing', "position"], fromJS(action.payload.position));
    } else if (action.type === "SELECT_TOOL") {
        return state.setIn(['map', 'drawing'], fromJS({type: action.payload}));
    } else if (action.type === "ADD_ARROW_POINT") {
        if (state.getIn(['map', 'drawing', 'points']) && state.getIn(['map', 'drawing', 'points']).size === 1) {
            let max = state.getIn(['map', 'points']).map((p) => p.get('id')).reduce((acc, p) => p > acc ? p : acc, 0);
            let origin = state.getIn(['map', 'drawing', 'points', 0])
            return state.updateIn(['map', 'points'], (points) => points.push(fromJS({id: max + 1, type: "arrow", origin: origin, dest: fromJS(action.payload)})))
                        .setIn(['map', 'drawing'], fromJS({type: null}));
        }

        return state.setIn(['map', 'drawing', 'points'], fromJS([action.payload]))
    } else if (action.type === "ADD_POLYGON_POINT") {
        if (state.getIn(['map', 'drawing', 'points']) && state.getIn(['map', 'drawing', 'points']).size > 0) {
            return state.updateIn(['map', 'drawing', 'points'], ((points) => points.push(fromJS(action.payload))))
        }
        return state.setIn(['map', 'drawing', 'points'], fromJS([action.payload]))
    } else if (action.type === "CANCEL_DRAWING") {
        return state.setIn(['map', 'drawing'], fromJS({type: action.payload}));
    } else if (action.type === "CONFIRM_POLYGON_DRAWING") {
        if (state.getIn(['map', 'drawing', 'points']) && state.getIn(['map', 'drawing', 'points']).size > 1) {
            let max = state.getIn(['map', 'points']).map((p) => p.get('id')).reduce((acc, p) => p > acc ? p : acc, 0);
            let positions = state.getIn(['map', 'drawing', 'points']);
            return state.updateIn(['map', 'points'], (points) => points.push(fromJS({id: max + 1, type: "polygon", positions: positions.toJS()})))
                        .setIn(['map', 'drawing'], fromJS({type: null}));
        }
    } else if (action.type === "CURSOR_MOVE") {
        return state.setIn(['map', 'cursor'], fromJS(action.payload));
    } else if (action.type === "TOGGLE_DISPLAY_DETAIL") {
        return state.update("displayProjectDetail", (v) => !v);
    }
    return state;
}
