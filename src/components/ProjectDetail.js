import React, { Component } from 'react';
import { connect } from 'react-redux'
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import './ProjectDetail.css';

export default function ProjectDetail(pros) {
    return (
      <div className="ProjectDetail">
        ProjectDetail
      </div>
    );
}

ProjectDetail.propTypes = {
    project: PropTypes.object
}
