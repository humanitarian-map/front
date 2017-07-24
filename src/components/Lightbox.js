import React from 'react';
import "./Lightbox.css";
import {emit} from "../App.events";
import * as actions from "../App.actions";

export default function Lightbox(props) {
    return (
        <div className="Lightbox">
          <div className="shade"></div>
          <div className="close-button mdi mdi-close mdi-48px"
               onClick={() => emit(actions.closeLightbox())}></div>
          <div className={"content " + (props.size ? props.size : 'small')}>
            {props.children}
          </div>
        </div>
    )
}
