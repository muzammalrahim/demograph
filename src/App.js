import React, { Component } from 'react';
import JXGBoard from 'jsxgraph-react-js'



 
export default class App extends Component {

  constructor(props) {

    super(props);

    this.board = null;

    this.state = {
      element:'point',
      point:null,
      line_points : []
    }

    this.logicJS = (brd) => {
      let $this = this;
      brd.on('down', function(e){
        console.log(e);
        $this.addElement(e);
      })
      brd.suspendUpdate();
      this.board = brd;
    }
  }

  addElement = () => {
    let x = Math.floor((Math.random() * 10) - 5 );
    let y = Math.floor((Math.random() * 10) - 5 );

    this.board.create('point',[x,y], {size:5, fixed:true});
    if(this.state.element == 'line') {
      let line_points = this.state.line_points;
      if(line_points.length){
        this.board.create('line', [line_points, [x, y]]);
        this.setState({line_points: []})
      } else
        this.setState({line_points: [x,y]})
    }
  }

  render () {
    return (
      <div>
        Select Type
        <br/>
        <input type="radio" name="element" checked={this.state.element == 'point'} onChange={() => this.setState({element:'point'})} /> Point 
        <input type="radio" name="element" checked={this.state.element == 'line'} onChange={() => this.setState({element:'line'})} /> Line
        <JXGBoard
          logic={this.logicJS}
          boardAttributes={{ axis: true }}
          style={{
            border: "3px solid red"
          }}
        />
      </div>
    )
  }
}