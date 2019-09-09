import React from "react";
import './Board.css';



function Square(props) {
    return (
      <button className={props.content>=100 ? 'square living' : 'square'} onClick={props.onClick}>
        {props.content>=100?props.content-100:''}
      </button>
    );
  }

function Row(props){

    const listeC = Array.apply(null, {length:  props.width});

    return (
        <div>
        {listeC.map( 
            (item,index)=>
                <Square key={index} onClick={()=>props.onClick((props.line*props.width)+index)} content={props.data[(props.line*props.width)+index]} />
        )}
        </div>
    );
}


class Board extends React.Component {

    render(){
        
        const listeR = Array.apply(null, {length:  this.props.height})
        var rows = listeR.map ( (item,index)=>{
            return (
                <Row key={index} width={this.props.width} data={this.props.data} line={index} onClick={this.props.onClick}/>
            );
        })  

        return (
            <div>
                {rows}
            </div>
        );
    }
}

export default  Board;