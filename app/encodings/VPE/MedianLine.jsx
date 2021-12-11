import React from "react";
import * as d3 from "d3";

class MedianLine extends React.Component {
  state = {
    valueScale: d3.scaleLinear(),
  };

  render() {
    let { valueKey, valueDomain, xRange, observations, scaleRangeToBox } =
      this.props;
    let { valueScale } = this.state;

    let scales = scaleRangeToBox(null, valueScale);
    valueScale = scales.yScale;
    valueScale.domain([valueDomain[0], valueDomain[1]]);

    let med = d3.median(observations.map((o) => o[valueKey]));
    let y = valueScale(med);

    return (
      <g>
        <line
          x1={xRange[0]}
          x2={xRange[1]}
          y1={y}
          y2={y}
          stroke="#50C878"
          strokeDasharray="1 1"
        />
      </g>
    );
  }
}

export default MedianLine;
