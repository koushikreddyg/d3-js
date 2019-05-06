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
    
  }



  render() {
    return (
      <div className="canvas" />
    );
  }

}

export default App;
