import React from 'react';
import * as d3 from 'd3';

const data = [
  { name: "Locke", value: 4 },
  { name: "Reyes", value: 8 },
  { name: "Ford", value: 15 },
  { name: "Jarrah", value: 16 },
  { name: "Shephard", value: 23 },
  { name: "Kwon", value: 42 }
];
const totalWidth = 600;
const totalHeight = 650;
const width = 450;
const height = 500;

class App extends React.Component {

  componentDidMount() {
    // set up drawing board for specific width and height;
    const svg = d3
      .select(".canvas")
      .append("svg")
      .attr('width', totalWidth)
      .attr('height', totalHeight)

    // add a bAR CHART GROUP INSIDE IT
    const bar = svg
      .append('g')
      .attr("width", width)
      .attr("height", height)
      .attr('transform', `translate(${50}, ${50})`);

    // add a linear scale for the y axis and assign value to it and max height
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height,0])
    // add a band width and assign name to it and padding and max width
    const x = d3.scaleBand()
      .domain(data.map(item => item.name))
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.1);

    // add a group called x-axis and invert it and assign all the values in the domain to x-axis
    bar
      .append("g")
      .call(d3.axisBottom(x))
      .attr('transform', `translate(0, ${height})`)


    // add a y axis group and assign all the values in domain and call all the values in xaxis
    bar.append("g").call(d3.axisLeft(y))



    // add rects to the bar and set the width of each bar and height of each bar
    // set the distance from x axis
    // set the inverse height and push the div to the rest of the height
    bar.selectAll("rect").data(data).enter()
      .append('rect')
      .attr('width', d => x.bandwidth(d))
      .attr("height", d => height - y(d.value))
      .attr('fill', 'orange')
      .attr('x', (d) => x(d.name))
      .attr('y', d => y(d.value))

  }



  render() {
    return (
      <div className="canvas" style={{ margin: 50 }} />
    );
  }

}

export default App;
