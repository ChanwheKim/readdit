import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BarChart from './charts/BarChart';
import BubbleChart from './charts/BubbleChart';

class Insight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: '',
    };

    this.renderKeywordList = this.renderKeywordList.bind(this);
    this.handleCategoryClicked = this.handleCategoryClicked.bind(this);
    this.rendeBubbleChart = this.rendeBubbleChart.bind(this);
  }

  componentDidMount() {
    this.props.onInsightMount(this.props.categories);
  }

  renderKeywordList() {
    // const { selectedCategory } = this.state;
    // let { keywords } = this.props;

    // if (selectedCategory) {
    //   keywords = Object.values(keywords).filter(keyword => keyword.category === selectedCategory)
    // }

    // return Object.values(keywords).map(keyword => (
    //   <li key={keyword.name} className="keyword-list__item">{keyword.name}</li>
    // ));

    return this.props.keywords.map(keyword => (
      <li key={keyword.name} className="keyword-list__item">{keyword.name}</li>
    ));
  }

  handleCategoryClicked(categoryName) {
    this.setState({ selectedCategory: categoryName });
  }

  rendeBubbleChart() {
    return (
      <BubbleChart
        data={this.props.keywords}
        width={900}
        height={400}
      />
    );
  }

  render() {
    const { keywords } = this.props;

    return (
      <div className="chart-wrapper">
        <div className="bar-chart-wrapper">
          <div className="bar-chart">
            <h1 className="bar-chart__title">Number of articles by category</h1>
            <BarChart categories={this.props.categories} onClick={this.props.onClick} />
          </div>
          <div className="bar-chart-wrapper__list-wrapper">
            <h1>Keywords by category</h1>
            <ul className="keyword-list">
              {
                !!keywords.length &&
                this.renderKeywordList()
              }
            </ul>
          </div>
        </div>
        <div className="bubble-chart-title">Keywords by all articles</div>
        <BubbleChart
          data={this.props.keywords}
          width={900}
          height={400}
        />
      </div>
    );
  }
}

export default Insight;

Insight.propTypes = {
  categories: PropTypes.array,
  onInsightMount: PropTypes.func,
  keywords: PropTypes.array,
};
