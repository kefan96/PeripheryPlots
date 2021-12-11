import React from "react";
import * as d3 from "d3";

const BAR_WIDTH = 3;

class TimeTraceGroup extends React.Component {
  state = {
    timeScale: d3.scaleTime(),
    valueScale: d3.scaleLinear(),
    colors: d3.schemeCategory10,
  };

  render() {
    let {
      timeKey,
      valueKey,
      timeDomain,
      valueDomain,
      observations,
      scaleRangeToBox,
    } = this.props;
    let { colors, timeScale, valueScale } = this.state;

    let scales = scaleRangeToBox(timeScale, valueScale);
    timeScale = scales.xScale;
    valueScale = scales.yScale;

    timeScale.domain(timeDomain);
    valueScale.domain(valueDomain);

    let valueRange = valueScale.range();

    return (
      <g>
        {/* Bars */}
        {observations.map((o, i) => (
          <rect
            key={i}
            x={timeScale(o[timeKey]) - BAR_WIDTH / 2}
            y={o[valueKey] ? valueRange[1] : valueRange[0]}
            width={BAR_WIDTH}
            height={valueRange[0]}
            fill={colors[Math.floor(Math.random() * colors.length)]}
          />
        ))}
      </g>
    );
  }
}

export default TimeTraceGroup;
