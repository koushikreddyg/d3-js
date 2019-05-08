import React from 'react';
import * as d3 from 'd3';
import d3Legend from 'd3-svg-legend'
import d3Tooltip from 'd3-tip';

const data = [
  { activity: "running", date: "Tue Oct 02 2018 12:07:58 GMT-0500 (Central Daylight Time)", distance: 30 },
  { activity: "running", date: "Wed Oct 03 2018 12:07:58 GMT-0500 (Central Daylight Time)", distance: 20 },
  { activity: "running", date: "Thu Oct 04 2018 12:07:58 GMT-0500 (Central Daylight Time)", distance: 50 },
  { activity: "running", date: "Fri Oct 05 2018 12:07:58 GMT-0500 (Central Daylight Time)", distance: 90 },
  { activity: "running", date: "Sat Oct 06 2018 12:07:58 GMT-0500 (Central Daylight Time)", distance: 10 },
  { activity: "running", date: "Sun Oct 07 2018 12:07:58 GMT-0500 (Central Daylight Time)", distance: 110 },

].sort((a, b) => new Date(a.date) - new Date(b.date));

class App extends React.Component {

  componentDidMount() {
    const totalWidth = 560;
    const totalHeight = 400;
    const margin = { top: 40, right: 20, bottom: 50, left: 100 };
    const graphWidth = totalWidth - margin.right - margin.left;
    const graphHeight = totalHeight - margin.top - margin.bottom;



    const svg = d3
      .select(".canvas")
      .append("svg")
      .attr("width", totalWidth)
      .attr("height", totalHeight);

    const graph = svg
      .append('g')
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const xAxisGroup = graph
      .append('g')
      .attr("class", 'x-axis')
      .attr("transform", `translate(0,${graphHeight})`)

    const yAxisGroup = graph
      .append('g')
      .attr("class", "y-axis")

    const x = d3.scaleTime().range([0, graphWidth]);
    const y = d3.scaleLinear().range([graphHeight, 0])

    x.domain(d3.extent(data, d => new Date(d.date)))
    y.domain([0, d3.max(data, d => d.distance)])

    const xAxis = d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat("%b %d"));
    const yAxis = d3.axisLeft(y).ticks(4).tickFormat(d => d + "miles");

    xAxisGroup.call(xAxis).selectAll("text").attr("transform", "rotate(-40)").attr("text-anchor", "end");
    yAxisGroup.call(yAxis)

    const circles = graph.selectAll('circle')
      .data(data);

    // remove unwanted points
    circles.exit().remove();

    // update current points
    circles.attr('r', '4')
      .attr('cx', d => x(new Date(d.date)))
      .attr('cy', d => y(d.distance))
      .attr('fill', 'red');

    // add new points
    circles.enter()
      .append('circle')
      .attr('r', '4')
      .attr('cx', d => x(new Date(d.date)))
      .attr('cy', d => y(d.distance))
      .attr('fill', 'red')
      

    const line = d3.line().x(d => x(new Date(d.date))).y(d => y(d.distance))
    const path = graph.append("path");
    path.data([data]).attr("fill", "none").attr("stroke", "red").attr("strokeWidth", 2).attr("d", line);

    const dottedLine= graph.append('g').style("opacity",0);

    const xDottedLine= dottedLine.append("line").attr("stroke","red").attr("stroke-width", 1).attr("stroke-dasharray", 4);
    const yDottedLine= dottedLine.append("line").attr("stroke","red").attr("stroke-width", 1).attr("stroke-dasharray", 4);

    graph.selectAll("circle").on("mouseover",(d,i,n)=>{
      d3.select(n[i]).transition().duration(120).attr("r", 8);
      xDottedLine.attr("x1",x(new Date(d.date))).attr("x2", x(new Date(d.date))).attr("y1", graphHeight).attr("y2", y(d.distance))
      yDottedLine.attr("x1",0).attr("x2", x(new Date(d.date))).attr("y1", y(d.distance)).attr("y2", y(d.distance))
      dottedLine.style("opacity",1)
  }).on("mouseleave",(d,i,n)=>{
    d3.select(n[i]).transition().duration(120).attr("r", 4)
    dottedLine.style("opacity",0)
})
    
  }



  render() {
    return (
      <div className="canvas" />
    );
  }

}

export default App;
