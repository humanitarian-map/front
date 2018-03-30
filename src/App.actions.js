import * as _ from 'lodash';

export const changeLocation = (lat, lng) => ({type: 'ADD_MARKER', payload: [lat, lng]});
export const changeArrowOrigin = (lat, lng) => ({type: 'CHANGE_ARROW_ORIGIN', payload: [lat, lng]});
export const changeArrowDest = (lat, lng) => ({type: 'CHANGE_ARROW_DEST', payload: [lat, lng]});
export const changePolygonPoint = (idx, lat, lng) => ({type: 'CHANGE_POLYGON_POINT', payload: {idx, position: [lat, lng]}});
export const changeCrossSize = (size) => ({type: 'CHANGE_CROSS_SIZE', payload: size});
export const cancelDrawing = () => ({type: 'CANCEL_DRAWING', payload: null});
export const selectIcon = (icon) => ({type: 'SELECT_MARKER_ICON', payload: icon});
export const saveMarker = (projectSlug, point) => ({type: 'ADD_POINT', payload: {projectSlug, point}});
export const setDrawingColor = (color) => ({type: 'SET_DRAWING_COLOR', payload: color});
export const selectTool = (tool) => ({type: 'SELECT_TOOL', payload: tool});
export const toggleDisplayDetail = () => ({type: 'TOGGLE_DISPLAY_DETAIL', payload: null});
export const toggleMove = () => ({type: 'TOGGLE_MOVE', payload: null});
export const deleteMarker = (projectSlug, pointId) => ({type: 'DELETE_POINT', payload: {projectSlug, pointId}});
export const addMarker = (lat, lng) => ({type: 'ADD_MARKER', payload: [lat, lng]});
export const addCross = (lat, lng) => ({type: 'ADD_CROSS', payload: [lat, lng]});
export const addArrowPoint = (lat, lng) => ({type: 'ADD_ARROW_POINT', payload: [lat, lng]});
export const addPolygonPoint = (lat, lng) => ({type: 'ADD_POLYGON_POINT', payload: [lat, lng]});
export const cancelViewing = (point) => ({type: 'VISUALIZE_MARKER', payload: null});
export const confirmPolygonDrawing = () => ({type: 'CONFIRM_POLYGON_DRAWING', payload: null});
export const cursorMove = (lat, lng) => ({type: 'CURSOR_MOVE', payload: [lat, lng]});
export const clickItem = (point) => ({type: 'VISUALIZE_MARKER', payload: point});
export const deleteItem = (projectSlug, pointId) => ({type: 'DELETE_POINT', payload: {projectSlug, pointId}});
export const setCurrentMapPosition = (center, zoom) => ({type: 'SET_CURRENT_MAP_POSITION', payload: {center, zoom}});
export const centerMap = (center, zoom) => ({type: 'CENTER_MAP', payload: {center, zoom}});
export const visualizeMarker = (point) => ({type: 'FORCE_VISUALIZE_MARKER', payload: point});
export const setProjectCenter = (project, center, zoom) => {
    const updatedProject = {
        center_point: [parseFloat(center.lat), parseFloat(center.lng)],
        zoom,
    };
    return {type: 'UPDATE_PROJECT_POSITION', payload: {projectSlug: project.slug, data: updatedProject}};
};
export const moveMarker = (projectSlug, point, newLatLng) => {
    const updatedPoint = _.extend({}, point);
    updatedPoint.data.position = [newLatLng.lat, newLatLng.lng];
    delete updatedPoint.id;
    delete updatedPoint.is_active;
    delete updatedPoint.documents_url;
    return {type: 'UPDATE_POINT', payload: {projectSlug, pointId: point.id, point: updatedPoint}};
};
