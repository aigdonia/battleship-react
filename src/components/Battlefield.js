import React from 'react';

export default class Battlefield extends React.Component {
  render() {
    const {grid, rows, cols, interactive, onCellClick} = this.props;
    let renderedGridCells = [];
    
    for(let i=0; i<rows; i++){
      for(let j=0; j<cols; j++){
        let key = `${i}:${j}`;
        let cellClass = ['battlefield__cell'];
        if( grid[i][j] != null ){
          const cellState = isNaN(grid[i][j]) ? 'occupied' :
          grid[i][j] === 1 ? 'hit' : 'miss';
          cellClass.push(`battlefield__cell--${cellState}`)
        }
        renderedGridCells.push(
          <div 
            className={cellClass.join(' ')} 
            key={key}
            onClick = {() => interactive && onCellClick(i,j) }
          ></div>
          )
        }
      }
      
      return (
        <div className={`battlefield ${ !!interactive?'battlefield--interactive':''}`}>
        { renderedGridCells }
        </div>
        );
      }
    }