import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import PropTypes from 'prop-types';

class BubbleChart extends Component {
  constructor(props) {
    super(props);

    this.minValue = 1;
    this.maxValue = 100;
    this.mounted = false;
    this.updated = false;

    this.state = {
      data: [],
    };

    this.radiusScale = this.radiusScale.bind(this);
    this.simulatePositions = this.simulatePositions.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    if (this.props.data.length > 0) {
      this.minValue = 0.95 * d3.min(this.props.data, item => item.v);
      this.maxValue = 1.05 * d3.max(this.props.data, item => item.v);

      this.simulatePositions(this.props.data);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.length > 0 && this.state.data.length !== 0) {
      this.minValue = 0.95 * d3.min(this.props.data, item => item.v);
      this.maxValue = 1.05 * d3.max(this.props.data, item => item.v);

      if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
        this.simulatePositions(this.props.data);
      }
    }
  }

  radiusScale = (value) => {
    const fx = d3
      .scaleSqrt()
      .range([1, 50])
      .domain([this.minValue, this.maxValue]);

    return fx(value);
  };

  simulatePositions = (data) => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data)
      .velocityDecay(0.5)
      .force('x', d3.forceX().strength(0.05))
      .force('y', d3.forceY().strength(0.05))
      .force(
        'collide',
        d3.forceCollide(d => this.radiusScale(d.v) + 2)
      )
      .on('tick', () => {
        if (this.mounted) {
          this.setState({ data });
        }
      });
  };

  renderBubbles = (data) => {
    const minValue = 0.95 * d3.min(data, item => item.v);
    const maxValue = 1.05 * d3.max(data, item => item.v);

    const color = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .interpolate(d3.interpolateHcl)
      .range(['#e2f9f1', '#28b485']);

    const texts = _.map(data, (item, index) => {
      const { width, height } = this.props;
      const fontSize = this.radiusScale(item.v) / 2;

      return (
        <g
          key={index}
          transform={`translate(${width / 2 + item.x}, ${height / 2 + item.y})`}
        >
          <circle
            r={this.radiusScale(item.v)}
            fill={color(item.v)}
            stroke={d3.rgb(color(item.v)).brighter(2)}
            strokeWidth="2"
          />
          <text
            dy="6"
            fill="rgba(0, 0, 0, 0.84)"
            textAnchor="middle"
            fontSize={`${fontSize}px`}
            fontWeight="300"
          >
            {item.name}
          </text>
        </g>
      );
    });

    return texts;
  };

  render() {
    if (this.state.data.length) {
      return (
        <svg width={this.props.width} height={this.props.height}>
          {this.renderBubbles(this.state.data)}
        </svg>
      );
    }

    return <div>Loading</div>;
  }
}

export default BubbleChart;

BubbleChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};
