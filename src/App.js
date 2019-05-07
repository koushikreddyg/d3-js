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
  
    
  }



  render() {
    return (
      <div className="canvas" />
    );
  }

}

export default App;
