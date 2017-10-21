const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 600;
const r = 5;

class CustomD3Component extends D3Component {

  initialize(node, props) {
    const svg = this.svg = d3.select(node).append('svg');
    svg.attr('viewBox', `0 0 ${size} ${size}`)
      .style('width', 'auto')
      .style('height', '100vh');

    for (var i = 0; i < props.pointCount; i++) {
      const circle = svg.append('circle')
        .attr('r', r)
        .attr('cx', Math.random() * size)
        .attr('cy', Math.random() * size);

      if (props.color) {
        circle.style('fill', () => "hsl(" + Math.random() * 360 + ",100%,50%)");
      } else {
        circle.style('fill', '#ddd');
      }
    }

  }

  update(props) {
    console.log('props', props);

    const existingCircles = this.svg.selectAll('circle');

    // Add a point
    if (props.pointCount > this.props.pointCount) {
      const circle = this.svg.append('circle')
        .attr('r', r)
        .attr('cx', Math.random() * size)
        .attr('cy', Math.random() * size);

      if (props.color) {
        circle.style('fill', () => "hsl(" + Math.random() * 360 + ",100%,50%)");
      }
    } else if (props.pointCount < this.props.pointCount) {
      existingCircles.filter((_, i) => i === 0).remove();
    }

    // Randomize positions!
    if (props.randomize) {
      existingCircles
        .transition()
        .duration(750)
        .attr('cx', () => Math.random() * size)
        .attr('cy', () => Math.random() * size);
    }

    // Color was switched
    if (props.color !== this.props.color) {
      if (props.color) {
        existingCircles.style('fill', () => "hsl(" + Math.random() * 360 + ",100%,50%)");
      } else {
        existingCircles.style('fill', '#000');
      }
    }
  }
}

module.exports = CustomD3Component;
