import React from 'react';
import * as d3 from 'd3';
import d3Legend from 'd3-svg-legend'
import { transform } from '@babel/core';

const data = [
  { name: "Locke", cost: 4 },
  { name: "Reyes", cost: 8 },
  { name: "Ford", cost: 15 },
  { name: "Jarrah", cost: 16 },
  { name: "Shephard", cost: 23 },
  { name: "Kwon", cost: 42 }
];



class App extends React.Component {

  componentDidMount() {
    const dims = {
      width: 300,
      height: 300,
      radius: 150,
    }

    const cent = {
      x: (dims.width / 2) + 5,
      y: (dims.height / 2) + 5,
    }

    const svg = d3
      .select('.canvas')
      .append('svg')
      .attr('width', dims.width + 150)
      .attr('height', dims.height + 150)

    const graph = svg.append('g').attr('transform', `translate(${cent.x + 30},${cent.y + 40})`)

    const pie = d3.pie().sort(null).value(d => d.cost)
    const angles = pie(data)
    const labelArc = d3.arc().outerRadius(dims.radius).innerRadius(0);
    const arcPath = d3.arc().outerRadius(dims.radius).innerRadius(100);



    const arcTween = (d) => {
      const i = d3.interpolate(d.endAngle, d.startAngle);

      return (t) => {
        d.startAngle = i(t);
        return arcPath(d);
      }
    }

    const arcTweenExit = (d) => {
      const i = d3.interpolate(d.startAngle, d.endAngle);

      return (t) => {
        d.startAngle = i(t);
        return arcPath(d);
      }
    }

    function arcTweenUpdate(d) {
      const i = d3.interpolate(this._current, d);

      this._current = d;
      return function (t) {
        return arcPath(i(t))
      }


    }

    const color = d3.scaleOrdinal(d3["schemeSet3"]).domain(data.map(d => d.name))
    const legendGroup = svg.append('g').attr('transform', `translate(${350},${20})`);
    const legendColor = d3Legend.legendColor().shape("circle").shapePadding(10).scale(color)
    legendGroup.call(legendColor).selectAll("text").attr("fill", "red")


    const path = graph
      .selectAll("path")
      .data(angles);



    path.exit().transition().duration(750).attrTween("d", arcTweenExit).remove()

    path.attr("d", arcPath).transition().duration(750).attrTween("d", arcTweenUpdate);



    path
      .enter()
      .append("path")

      .attr("d", arcPath)
      .attr("stroke", "#fff")
      .attr("stroke-width", 3)
      .attr("fill", d => color(d.data.name))
      .each(function (d) { this._current = d })
    // .transition()
    // .duration(750)
    // .attrTween("d", arcTween)

    path
      .enter()
      .append("text")
      .attr("transform", function (d) { console.log('hi there ', d); return "translate(" + labelArc.centroid(d) + ")rotate(-80)"; })
      .text(d => d.data.name)
      .attr('text-anchor', 'middle')
      .attr("class", "text")
      .attr("dy", "0.5em")

    path.enter().append("polyline").attr("transform", function (d) { console.log('hi there ', d); return "translate(" + labelArc.centroid(d) + ")"; }).attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr('points', function (d) {
        var posA = labelArc.centroid(d) // line insertion in the slice
        var posB = arcPath.centroid(d) // line break: we use the other arc generator that has been built only for that
        // var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        // posC[0] = dims.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB]
      })








  }



  render() {
    return (
      <div className="canvas" />
    );
  }

}

export default App;
