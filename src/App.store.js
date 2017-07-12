import {fromJS} from "immutable";

export const initialState = fromJS({
    "map": {
        "cursor": [0, 0],
        "drawing": {
            type: null
        }
    },
    "current-project": null,
    "projects-list": [],
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
        return state.setIn(['map', 'drawing', "position"], fromJS(action.payload));
    } else if (action.type === "ADD_CROSS") {
        return state.setIn(['map', 'drawing', "position"], fromJS(action.payload));
    } else if (action.type === "SELECT_TOOL") {
        return state.setIn(['map', 'drawing'], fromJS({type: action.payload}))
                    .setIn(["map", "viewing"], null);
    } else if (action.type === "ADD_ARROW_POINT") {
        // if (state.getIn(['map', 'drawing', 'points']) && state.getIn(['map', 'drawing', 'points']).size === 1) {
        //     let max = state.getIn(['map', 'points']).map((p) => p.get('id')).reduce((acc, p) => p > acc ? p : acc, 0);
        //     let origin = state.getIn(['map', 'drawing', 'points', 0])
        //     return state.updateIn(['map', 'points'], (points) => points.push(fromJS({id: max + 1, type: "arrow", origin: origin, dest: fromJS(action.payload)})))
        //                 .setIn(['map', 'drawing'], fromJS({type: null}));
        // }
        //
        return state.setIn(['map', 'drawing', 'points'], fromJS([action.payload]))
    } else if (action.type === "ADD_POLYGON_POINT") {
        if (state.getIn(['map', 'drawing', 'points']) && state.getIn(['map', 'drawing', 'points']).size > 0) {
            return state.updateIn(['map', 'drawing', 'points'], ((points) => points.push(fromJS(action.payload))))
        }
        return state.setIn(['map', 'drawing', 'points'], fromJS([action.payload]))
    } else if (action.type === "CANCEL_DRAWING") {
        return state.setIn(['map', 'drawing'], fromJS({type: action.payload}));
    // } else if (action.type === "CONFIRM_POLYGON_DRAWING") {
    //     if (state.getIn(['map', 'drawing', 'points']) && state.getIn(['map', 'drawing', 'points']).size > 1) {
    //         let max = state.getIn(['map', 'points']).map((p) => p.get('id')).reduce((acc, p) => p > acc ? p : acc, 0);
    //         let positions = state.getIn(['map', 'drawing', 'points']);
    //         return state.updateIn(['map', 'points'], (points) => points.push(fromJS({id: max + 1, type: "polygon", positions: positions.toJS()})))
    //                     .setIn(['map', 'drawing'], fromJS({type: null}));
    //     }
    } else if (action.type === "CURSOR_MOVE") {
        return state.setIn(['map', 'cursor'], fromJS(action.payload));
    } else if (action.type === "TOGGLE_DISPLAY_DETAIL") {
        return state.update("displayProjectDetail", (v) => !v);
    } else if (action.type === "SELECT_MARKER_ICON") {
        return state.setIn(["map", "drawing", "icon"], action.payload);
    } else if (action.type === "VISUALIZE_MARKER") {
        return state.updateIn(["map", "viewing"], (viewing) => {
                        if (viewing && viewing.get('id') === action.payload.id) {
                            return null
                        }
                        return fromJS(action.payload)
                    })
                    .setIn(["map", "drawing"], fromJS({type: null}));
    } else if (action.type === "SET_PROJECTS_LIST") {
        return state.set("projects-list", fromJS(action.payload));
    } else if (action.type === "SET_CURRENT_PROJECT") {
        return state.set("current-project", fromJS(action.payload));
    }
    return state;
}
