import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import Battlefield from './Battlefield';
import { ROWS, COLS, PLAYER_TURN, ENEMY_TURN } from '../helpers/constants';
import { initBattleGrid, cloneBattleGrid, placeAllShips, shootGridCell } from '../helpers/battlefield';
import { generateShips, isAllShipsSunk } from '../helpers/ships';
import ShipsBoard from './ShipsBoard';
import { getFreshRandomCell } from '../helpers/oppenent';


export default class BattleScreen extends Component {
  playerGrid = null;
  enemyGrid = null;
  playerShips = null;
  enemyShips = null;
  
  constructor() {
    super();
    this.playerGrid = initBattleGrid(ROWS, COLS);
    this.playerShips = generateShips();
    
    this.enemyGrid = cloneBattleGrid(this.playerGrid);
    this.enemyShips = generateShips();
    
    this.playerGrid = placeAllShips(this.playerShips, this.playerGrid);
    this.enemyGrid = placeAllShips(this.enemyShips, this.enemyGrid);
    
    this.state = {
      gameOver: false,
      winner: false,
      currentTurn: PLAYER_TURN,
      playerGrid: this.playerGrid,
      playerShips: this.playerShips,
      enemyGrid: this.enemyGrid,
      enemyShips: this.enemyShips
    }
  }
  
  onCellClick(x,y) {
    const {enemyGrid, enemyShips} = this.state;
    // shoot picked cell.
    const {grid, shot} = shootGridCell(x,y, enemyGrid);
    console.info(" -- Player -- ")
    console.info(`Hit ${x},${y} : ${shot}`);
    let newState = { enemyGrid: grid };
    
    // update state only if successful shot (a hit or a miss)
    if(shot) {
      if(isNaN(shot)){
        console.info(`SHIP HIT ${enemyShips[shot].name}`);
        // this is a ship hit.
        let ships = cloneDeep(enemyShips);
        ships[shot].hits += 1; 
        newState['enemyShips'] = ships;
      }
      newState['currentTurn'] = ENEMY_TURN;
      this.setState(newState);
    }
  }

  // TODO: Refactor this shit
  shootCell(x,y) {
    const {playerGrid, playerShips} = this.state;
    // shoot picked cell.
    const {grid, shot} = shootGridCell(x,y, playerGrid);
    console.info(" -- Oppenet -- ")
    console.info(`Hit ${x},${y} : ${shot}`);
    let newState = { playerGrid: grid };
    
    // update state only if successful shot (a hit or a miss)
    if(shot) {
      if(isNaN(shot)){
        console.info(`SHIP HIT ${playerShips[shot].name}`);
        // this is a ship hit.
        let ships = cloneDeep(playerShips);
        ships[shot].hits += 1; 
        newState['playerShips'] = ships;
      }
      newState['currentTurn'] = PLAYER_TURN;
      this.setState(newState);
    }
  }

  componentDidUpdate(_, {currentTurn: prevTurn, playerGrid}) {
    // check if the game should end
    const {playerShips, enemyShips} = this.state;
    const isPlayerLose = isAllShipsSunk(playerShips);
    const isEnemyLose = isAllShipsSunk(enemyShips);
    
    if (isPlayerLose || isEnemyLose) {
      console.log(" -=# GAME OVER #=- ");
      const winner = isEnemyLose ? 'Player' : 'Enemy';
      this.setState({
        gameOver: true,
        winner
      });
    }
    // check if artificial oppenent should play
    else if(prevTurn !== ENEMY_TURN) {
      // yes, oppenent should play
      setTimeout(() => {
        const [x, y] = getFreshRandomCell(playerGrid);
        this.shootCell(x,y);
      },500);
    }
  }
  
  render() {
    const {playerGrid, enemyGrid, currentTurn, playerShips} = this.state;
    return (
      <div id="battle-screen">
        <div className={(currentTurn === PLAYER_TURN)?'disabled':''}>
          <h1>Player</h1>
          <ShipsBoard ships={playerShips} />
          <Battlefield rows={ROWS} cols={COLS} grid={playerGrid} />
        </div>
        <div className={(currentTurn === ENEMY_TURN)?'disabled':''}>
          <h1>Enemy</h1>
          <Battlefield rows={ROWS} cols={COLS} grid={enemyGrid} 
            interactive={true} 
            onCellClick = {(x,y) => (currentTurn && this.onCellClick(x,y))}
          />
        </div>
      </div>
      );
    }
  }