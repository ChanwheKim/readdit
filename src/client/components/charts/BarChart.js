import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import PropTypes from 'prop-types';
import Axes from './Axes';
import Bars from './Bars';

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const { categories, onClick } = this.props;
    const margins = { top: 50, right: 20, bottom: 100, left: 60 };
    const svgDimensions = { width: 500, height: 400 };

    const maxValue = Math.max(...categories.map(d => d.count));

    const xScale = this.xScale
      .padding(0.5)
      .domain(categories.map(d => d.name))
      .range([margins.left, svgDimensions.width - margins.right]);

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top]);

    return (
      <svg className="bar-chart" width={svgDimensions.width} height={svgDimensions.height}>
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
          onClick={onClick}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          categories={categories}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
      </svg>
    );
  }
}

export default BarChart;

BarChart.propTypes = {
  categories: PropTypes.array,
};
