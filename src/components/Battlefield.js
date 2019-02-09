import React from 'react';

export default class Battlefield extends React.Component {
    render() {
        const {grid, rows, cols} = this.props;
        let renderedGrid = [];
        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                let key = `${i}:${j}`;
                let cellClass = ['battlefield__cell'];
                if( grid[i][j] != null ){
                    const cellState = grid[i][j] === 0 ? 'occupied' :
                        grid[i][j] === 1 ? 'hit' : 'miss';
                    cellClass.push(`battlefield__cell--${cellState}`)
                }
                renderedGrid.push(
                    <div 
                        className={cellClass.join(' ')} 
                        key={key}
                    ></div>
                )
            }
        }
        return (
            <div className='battlefield battlefield--interactive'>
                { renderedGrid }
            </div>
        );
    }
}