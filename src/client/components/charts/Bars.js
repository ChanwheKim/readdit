import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';

export default class Bars extends Component {
  constructor(props) {
    super(props);

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#9de9cf', '#28b485'])
      .interpolate(interpolateLab);
  }

  render() {
    const { scales, margins, categories, svgDimensions } = this.props;
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      categories.map(datum =>
        <rect
          key={datum._id}
          x={xScale(datum.name)}
          y={yScale(datum.count)}
          height={height - margins.bottom - scales.yScale(datum.count)}
          width={xScale.bandwidth()}
          fill={this.colorScale(datum.count)}
        />)
    );

    return (
      <g>{bars}</g>
    );
  }
}
