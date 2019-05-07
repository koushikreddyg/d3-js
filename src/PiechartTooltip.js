import React from 'react';
import * as d3 from 'd3';
import d3Legend from 'd3-svg-legend'
import d3Tooltip from 'd3-tip';

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


    const toolTip = d3Tooltip(d3);
    const tip = toolTip.attr("class", "tip card")
      .html(d => `<div className="name">${d.data.name}</div>`)
    graph.call(tip)

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
      .transition()
      .duration(750)
      .attrTween("d", arcTween)

    graph.selectAll('path').on('mouseover', function (d, i, n) {
      tip.show(d, n[i])
      d3.select(n[i]).transition('changeSliceFill').duration(300).attr("fill", "#fff")
    })
      .on('mouseout', (d, i, n) => {
        tip.hide()
        d3.select(n[i]).transition('changeSliceFill').duration(300).attr("fill", color(d.data.name))
      })
      .on('click', (d, i, n) => {
        console.log(d);
      })
  }



  render() {
    return (
      <div className="canvas" />
    );
  }

}

export default App;
