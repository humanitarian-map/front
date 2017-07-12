import React, { Component } from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import './ProjectDetail.css';

export default function ProjectDetail(pros) {
    return (
      <section className="ProjectDetail panel">
        <h2 className="header-title">Project</h2>
        <div className="content">
          <div className="block">
            <h3 className="title project-name">Project name que se va a dos líneas sin problemas</h3>
            <p className="description">Project description que se va seguramente a unas cuantas líneas más a unas cuantas líneas más a unas cuantas líneas más a unas cuantas líneas más a unas cuantas líneas más a unas cuantas líneas más</p>
          </div>
          <div className="block">
            <h3 className="title mdi mdi-lan mdi-16px">Organization</h3>
            <div className="organization">
              <span className="logo"></span>
              Médicos del Mundo
            </div>
          </div>
          <div className="block block-documents">
            <h3 className="title mdi mdi-attachment mdi-16px">Documents</h3>
            <a className="ellipsis" href="#" alt="">https://drive.google.com/drive/u/0/folders/0BwVWP_fda2O1fnRDWGNVcFd2N0RfUnBNVENrVnZRTGdTNGNwSExabHFnQmdtVzVPR3VKRU0</a>
            <a className="ellipsis" href="#" alt="">https://drive.google.com/drive/u/0/folders/0BwVWP_fda2O1fnRDWGNVcFd2N0RfUnBNVENrVnZRTGdTNGNwSExabHFnQmdtVzVPR3VKRU0</a>
          </div>
          <div className="block">
            <h3 className="title mdi mdi-map-marker mdi-16px">Markers</h3>
            <ul>
              <li>
                <span className="name">Camps</span>
                <span className="tag">3</span>
                <ul>
                  <li>
                    Camp name
                  </li>
                  <li>
                    Camp name
                  </li>
                  <li>
                    Camp name
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="block">
            <h3 className="title mdi mdi-calendar mdi-16px">Timeframe</h3>
            <div  className="timeframe">
              <span className="label">Start:</span> <span className="value">23/09/2017</span>
              <span className="label">End:</span> <span className="value">01/02/2018</span>
            </div>
          </div>
        </div>
      </section>
    );
}

ProjectDetail.propTypes = {
    project: PropTypes.object
}
