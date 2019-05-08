import React from 'react';
import * as d3 from 'd3';

const data = [
  { name: 'Shaun', parent: '', department: 'directors' },
  { name: 'Yoshi', parent: 'Shaun', department: 'it' },
  { name: 'ryu', parent: 'Shaun', department: 'design' },
  { name: 'zelda', parent: 'Shaun', department: 'sales' },
  { name: 'ken', parent: 'ryu', department: 'design' },
  { name: 'wario', parent: 'Yoshi', department: 'it' },
  { name: 'mario', parent: 'Yoshi', department: 'it' },
]

class App extends React.Component {

  componentDidMount() {
    const dims = { width: 1100, height: 500 };
    const svg = d3
      .select(".canvas")
      .append("svg")
      .attr("width", dims.width + 100)
      .attr("height", dims.height + 100);

    const graph = svg
      .append("g")
      .attr("transform", `translate(${50},${50})`)

    const stratify = d3
      .stratify()
      .id(d => d.name)
      .parentId(d => d.parent)

    const rootNode = stratify(data);

    const tree = d3.tree().size([dims.width, dims.height]);

    const treeData = tree(rootNode);

    graph.selectAll(".node").remove()
    graph.selectAll(".link").remove()

    const nodes = graph
      .selectAll(".node")
      .data(treeData.descendants());

    const links = graph
      .selectAll(".link") 
      .data(treeData.links())
    
    links
      .enter()
      .append("path")
      .transition()
      .duration(700)
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 2)
      .attr("d", d3.linkVertical().x(d=>d.x).y(d=>d.y))

    const enterNodes = nodes
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`)

    const color= d3.scaleOrdinal(["red", "blue", "green", "violet"]).domain(data.map(d=>d.department))


    enterNodes
      .append("rect")
      .attr("fill", d=>color(d.data.department))
      .attr("stroke", "#555")
      .attr("stroke-width", 2)
      .attr("height", 50)
      .attr("width", d => d.data.name.length * 20)
      .attr("transform", d=>`translate(${-d.data.name.length*10},${-25})`)

    enterNodes
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", " white")
      .text(d => d.data.name)


  }

  render() {
    return (
      <div className="canvas" />
    );
  }

}

export default App;
