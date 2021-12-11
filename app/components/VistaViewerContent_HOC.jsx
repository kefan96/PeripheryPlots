import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import _ from "lodash";

import {
  ACTION_CHANGE_timeDomains,
  ACTION_CHANGE_timeExtentDomain,
} from "../actions/actions";

import VistaTimelineControl from "./VistaTimelineControl.jsx";
import VistaTrack from "./VistaTrack.jsx";
import VistaVerticalAligner from "./VistaVerticalAligner.jsx";

export default function VistaViewerContentHOC(config) {
  class VistaViewerContent extends React.Component {
    state = {
      firstRender: true,
      controlScale: d3.scaleTime(),
    };

    componentDidMount() {
      // Initial state determined at runtime
      this.props.ACTION_CHANGE_timeDomains(config.timeDomains);
      this.props.ACTION_CHANGE_timeExtentDomain(config.timeExtentDomain);

      this.state.controlScale
        .domain(config.timeExtentDomain)
        .range([0, this.props.baseWidth]);

      // After mounting, we allow the component to render
      this.setState({ firstRender: false });
    }

    render() {
      // Do not render anything initially, we must first update global store with configuration properties
      // as specified by the user. Once we can access these properties in the store, we render the component
      if (this.state.firstRender) {
        return null;
      }

      let { controlTimelineHeight, baseWidth, verticalAlignerHeight } =
        this.props;

      let {
        title,
        trackwiseObservations,
        trackwiseUnits,
        trackwiseTimeKeys,
        trackwiseValueKeys,
        trackwiseEncodings,
      } = config;

      let { controlScale } = this.state;

      let numTracks = trackwiseObservations.length;

      let ids = _.range(0, numTracks).map((i) => `track-${i}`);

      return (
        <React.Fragment>
          <h1>{title}</h1>
          <div style={{ display: "flex", margin: "10px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                border: "1px solid black",
                backgroundColor: "#50C878",
              }}
            ></div>
            <h4 style={{ margin: "0 10px" }}>Median Line</h4>
          </div>
          <div style={{ display: "flex", margin: "10px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                border: "1px solid black",
                backgroundColor: "#f4b642",
              }}
            ></div>
            <h4 style={{ margin: "0 10px" }}>Average Line</h4>
          </div>
          {/* 
                    Timeline that allows user to change selected time domains for focus / context areas 
                    Changes that occur in this component are propagated to the global store, which triggers
                    view changes for all linked tracks 
                    */}
          <VistaTimelineControl
            controlScale={controlScale}
            width={baseWidth}
            height={controlTimelineHeight}
          />

          <VistaVerticalAligner
            controlScale={controlScale}
            width={baseWidth}
            height={verticalAlignerHeight}
          />

          {/* 
                    Time series tracks 
                    */}
          {_.range(0, numTracks).map((i) => {
            let observations = trackwiseObservations[i];
            let timeKey = trackwiseTimeKeys[i];
            let valueKey = trackwiseValueKeys[i];
            let encodings = trackwiseEncodings[i];
            let unit = trackwiseUnits[i];
            return (
              <VistaTrack
                controlScale={controlScale}
                id={ids[i]}
                key={`track-${i}`}
                title={valueKey}
                unit={unit}
                observations={observations}
                timeKey={timeKey}
                valueKey={valueKey}
                encodings={encodings}
              />
            );
          })}
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = ({
    controlTimelineHeight,
    baseWidth,
    verticalAlignerHeight,
  }) => ({
    controlTimelineHeight,
    baseWidth,
    verticalAlignerHeight,
  });

  const mapDispatchToProps = (dispatch) => ({
    ACTION_CHANGE_timeDomains: (timeDomains) =>
      dispatch(ACTION_CHANGE_timeDomains(timeDomains)),

    ACTION_CHANGE_timeExtentDomain: (timeExtentDomain) =>
      dispatch(ACTION_CHANGE_timeExtentDomain(timeExtentDomain)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(VistaViewerContent);
}
