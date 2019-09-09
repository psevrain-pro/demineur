import React from 'react';
import logo from './logo.svg';
import Board from './Board.js';
import * as Rules from './rules/rules.js'

import './App.css';
import { returnStatement } from '@babel/types';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: new Array(100),
      width: 10,
      height: 10,
      mines: 8,
      turns:0
    };

    this.inputWidth = React.createRef();
    this.inputHeight = React.createRef();
    this.inputMines = React.createRef();
  }


  componentDidMount() {
    this.initGame(this.state.width,this.state.height,this.state.mines);
  }


  initGame(width, height, mines){

    const initData = Rules.init(width, height, mines);
    this.setState ({
      data: initData,
      width: width,
      height: height,
      mines: mines,
      turns:0
    });

  }

  clickInit(){
    //get values
    const width= this.inputWidth.current.value;
    const height= this.inputHeight.current.value;
    const mines= this.inputMines.current.value;

    this.initGame(width, height, mines);
}

  clickCase(index){
    // const v = Rules.valeurCase(this.state.data, this.state.width,index);

    var newData;
    var newTurns = this.state.turns;

    if (this.state.data[index] > 100)
      return;
    else if (this.state.data[index]==100){
      newData = Rules.decouvreCasesAutour(this.state.data, this.state.width,index);
    }
    else {
      newData = Rules.decouvreCase(this.state.data, this.state.width, index);
      newTurns = this.state.turns+1;
    }

    this.setState({
      data: newData,
      turns: newTurns
    });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Démineur !
          </p>
        </header>
        <div className="App-body">
          <div className="Parametres-box">
            <div>Largeur : <input defaultValue={this.state.width} ref={this.inputWidth} /></div>    
            <div>Hauteur : <input defaultValue={this.state.height} ref={this.inputHeight} /></div>      
            <div>Nombre de mines : <input defaultValue={this.state.mines} ref={this.inputMines} /></div>   
            <div>
              <button onClick={()=>this.clickInit()}>Recommencer</button>
            </div>
          </div>

          <div>
            <Board data={this.state.data} width={this.state.width} height={this.state.height} onClick={(i)=>this.clickCase(i)}></Board>
          </div>
          <div>
            <div>Nombre de tours : {this.state.turns}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
