import React from 'react';
import { data } from './data';
import * as d3 from 'd3';

const stratify = d3.stratify()
  .id(d => d.name)
  .parentId(d => d.parent)

class App extends React.Component {

  componentDidMount() {
    const svg = d3
      .select(".canvas")
      .append("svg")
      .attr("width", 1060)
      .attr("height", 800)

    const graph = svg.append("g").attr("transform", `translate(${50}, ${50})`)

    const rootNode = stratify(data).sum(d => d.amount)

    const pack = d3.pack().size([960, 700]).padding(5);

    const bubbleData = pack(rootNode).descendants();

    const color= d3.scaleOrdinal(["#d1c4e9","#b39ddb", "#9575cd"])

    const nodes = graph
      .selectAll("g")
      .data(bubbleData)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    nodes
      .append("circle")
      .attr("r", d => d.r)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("fill", d=>color(d.depth));

    nodes
    .filter(d => !d.children)
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "0.3em")
    .attr("fill", "white")
    .style("font-size", d=>d.value*5)
    .text(d=>d.data.name)

  }



  render() {
    return (
      <div className="canvas" />
    );
  }

}

export default App;
