import {fromJS} from "immutable";

export const initialState = fromJS({
    "map": {
        "cursor": [0, 0],
        "moving": false,
        "drawing": {
            type: null
        },
        "current-position": null,
    },
    "current-project": null,
    "projects-list": [],
    "display-project-detail": false,
    "user": null,
    "login-errors": null,
    "routing": null
})

export function reducer(state, action) {
    if (action.type === "ADD_MARKER") {
        return state.setIn(['map', 'drawing', "position"], fromJS(action.payload))
                    .setIn(['map', 'drawing', "ready-to-edit"], true);
    } else if (action.type === "ADD_CROSS") {
        return state.setIn(['map', 'drawing', "position"], fromJS(action.payload))
                    .setIn(['map', 'drawing', "ready-to-edit"], true);
    } else if (action.type === "SELECT_TOOL") {
        return state.setIn(['map', 'drawing'], fromJS({type: action.payload}))
                    .setIn(["map", "moving"], null)
                    .setIn(["map", "viewing"], null);
    } else if (action.type === "SET_DRAWING_COLOR") {
        return state.setIn(['map', 'drawing', 'color'], action.payload);
    } else if (action.type === "ADD_ARROW_POINT") {
        if (state.getIn(['map', 'drawing', 'points']) && state.getIn(['map', 'drawing', 'points']).size === 1) {
            return state.updateIn(['map', 'drawing', 'points'], (points) => points.push(fromJS(action.payload)))
                        .setIn(['map', 'drawing', 'ready-to-edit'], true);
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
        return state.setIn(['map', 'drawing', 'ready-to-edit'], true);
    } else if (action.type === "CURSOR_MOVE") {
        return state.setIn(['map', 'cursor'], fromJS(action.payload));
    } else if (action.type === "TOGGLE_DISPLAY_DETAIL") {
        return state.update("display-project-detail", (v) => !v);
    } else if (action.type === "SELECT_MARKER_ICON") {
        return state.setIn(["map", "drawing", "icon"], action.payload);
    } else if (action.type === "FORCE_VISUALIZE_MARKER") {
        return state.updateIn(["map", "viewing"], (viewing) => {
                        if (!action.payload) {
                            return null;
                        }
                        return fromJS(action.payload)
                    })
                    .setIn(["map", "drawing"], fromJS({type: null}));
    } else if (action.type === "VISUALIZE_MARKER") {
        return state.updateIn(["map", "viewing"], (viewing) => {
                        if (!action.payload) {
                            return null;
                        } else if (viewing && viewing.get('id') === action.payload.id) {
                            return null;
                        }
                        return fromJS(action.payload)
                    })
                    .setIn(["map", "drawing"], fromJS({type: null}));
    } else if (action.type === "UPDATE_VISUALIZED_MARKER") {
        return state.updateIn(["map", "viewing"], (viewing) => {
                        if (viewing && action.payload.id === viewing.get('id')) {
                            return fromJS(action.payload)
                        }
                        return viewing;
                    });
    } else if (action.type === "SET_PROJECTS_LIST") {
        return state.set("projects-list", action.payload);
    } else if (action.type === "SET_CURRENT_PROJECT") {
        return state.set("current-project", action.payload);
    } else if (action.type === "RESET_PROJECT") {
        return state.set("map", initialState.get('map'))
                    .set("current-project", null)
                    .set("display-project-detail", false);
    } else if (action.type === "CHANGE_ARROW_ORIGIN") {
        return state.setIn(['map', 'drawing', "points", 0], fromJS(action.payload));
    } else if (action.type === "CHANGE_ARROW_DEST") {
        return state.setIn(['map', 'drawing', "points", 1], fromJS(action.payload));
    } else if (action.type === "CHANGE_POLYGON_POINT") {
        return state.setIn(['map', 'drawing', "points", action.payload.idx], fromJS(action.payload.position));
    } else if (action.type === "CHANGE_CROSS_SIZE") {
        return state.setIn(['map', 'drawing', "size"], action.payload);
    } else if (action.type === "TOGGLE_MOVE") {
        return state.updateIn(['map', 'moving'], (m) => !m)
                    .setIn(["map", "drawing"], fromJS({type: null}));
    } else if (action.type === "SET_PROJECT_DOCUMENTS") {
        return state.set("documents", action.payload);
    } else if (action.type === "SET_CURRENT_MAP_POSITION") {
        return state.setIn(['map', 'current-position'], fromJS(action.payload));
    } else if (action.type === "SET_LOGIN_ERRORS") {
        return state.set('login-errors', fromJS(action.payload));
    } else if (action.type === "SET_USER") {
        return state.set('user', fromJS(action.payload));
    }
    return state;
}
