import * as _ from "lodash"


// To add a point type, add here and in the CSS of components/markers/PointMarker.css

export const POINT_TYPES = [
    {
        id: "camp",
        name: "Camps",
        icon: "tent",
        color: "#F79D68",
    },
    {
        id: "hospital",
        name: "Hospitals",
        icon: "hospital",
        color: "#599DD9",
    },
    {
        id: "warning",
        name: "Warnings",
        icon: "fire",
        color: "#FA5E59",
    },
    {
        id: "idps",
        name: "IDPs",
        icon: "walk",
        color: "#A25FA6",
    },
    {
        id: "checkpoint",
        name: "Check points",
        icon: "marker-check",
        color: "#A6BE1F",
    },
    {
        id: "mobile-clinic",
        name: "Mobile clinics",
        icon: "truck",
        color: "#59BCD9",
    },
    {
        id: "other",
        name: "Other",
        icon: "map-marker",
        color: "#859CAD",
    },
]

export const POINT_TYPES_OBJ = _.reduce(POINT_TYPES, (acc, item) => { acc[item.id] = item; return acc}, {});
