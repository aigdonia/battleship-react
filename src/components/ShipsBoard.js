import React, { Component } from 'react';
import { map } from 'lodash';

export default class ShipsBoard extends Component {
  renderShip( {hits, size, id, name} ) {
    let shipBody = [];

    for(let i=0; i < hits ; i++){
      shipBody.push(<span className='ship__cell hit' key={`hit-${i}`}></span>)
    }

    if(size > hits) {
      for(let i=0; i < (size-hits); i++){
        shipBody.push(<span className='ship__cell' key={`body-${i}`}></span>)
      }
    }
    return (
      <div className='ship' key={`ship_${id}`}>
        <label className='ship__title'>{ name }</label>
        <div className='ship__body'>{ shipBody }</div>
      </div>
    );
  }

  render() {
    const { ships } = this.props;
    return (
      <div className='ships'>
        {map(ships,  ship => this.renderShip(ship) )}
      </div>
    );
  }
}