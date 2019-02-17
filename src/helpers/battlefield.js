import { SHIP_PADDER, CELL_MISS, CELL_HIT } from "./constants";

export function initBattleGrid(rows, cols){
  let field = Array(rows).fill().map(() => Array(cols).fill(null));
  return field;
}

export function cloneBattleGrid(grid) {
  return JSON.parse(JSON.stringify(grid));
}

export function placeAllShips(ships, grid) {
  let tempGrid = cloneBattleGrid(grid);
  Object.keys(ships).forEach((shipKey) => {
    tempGrid = placeShip(ships[shipKey], tempGrid);
  });
  
  // replace all SHIP_PADDER occurances before return 
  return JSON.parse (JSON.stringify(tempGrid).replace(new RegExp(SHIP_PADDER, 'g'),"null"));
}

const placeShip = (ship, grid) => {
  let shipStartPosition = null;
  let continueLoop = true;
  while (continueLoop) {
    shipStartPosition = getEmptyRandomCell(grid);
    console.info(`Ship ${ship.name} - Start Position ${shipStartPosition}`);
    let [x,y] = shipStartPosition;
    let directions = getDirections();
    grid[x][y] = ship.id;
    grid = refillNeighbourCells(grid, x, y, SHIP_PADDER);
    
    for (let i = 0; i < directions.length; i++) {            
      let tempBattlefield = cloneBattleGrid(grid);
      let newBattleField = tryDirections(directions[i], ship, shipStartPosition, tempBattlefield);
      if (newBattleField !== null) {
        continueLoop = false;
        grid = [...newBattleField];
        break;
      } else {
        tempBattlefield = newBattleField = null;
      }
    }
  }
  return grid;
};

/**
* Shoots picked position on picked gird cell.
* @param {number} x position point X
* @param {number} y position point Y
* @param {[]} grid battle grid to shoot in
* @returns {Object} returns whether shot is valid and battle field after shot. 
*/
export function shootGridCell(x,y, grid) {
  const alreadyShot = () => (grid[x][y] === CELL_MISS || grid[x][y] === CELL_HIT)

  let newGrid = cloneBattleGrid(grid);
  let shot = false;

  if(!alreadyShot()) {
    shot = newGrid[x][y] || CELL_MISS; // whether a hit or not, return the ship code
    newGrid[x][y] = isEmptyCell(x,y, grid)? CELL_MISS: CELL_HIT ;
  }

  return {
    shot,
    grid: newGrid
  }
}

/** 
 * Following code inspired by https://github.com/Aziaev/battleships/ 
 * some refactoring and additional functionlities added by myself
 * */
const getDirections = () => {
  let directions = [];
  for (let i = 0; directions.length < 4; i++) {
    let number = Math.floor(Math.random() * 4);
    if (directions.indexOf(number) === -1) {
      directions.push(number);
    }
  }
  return directions;
};

const refillNeighbourCells = (battleField, x, y, shipId) => {
  if (y < 9 && battleField[x][y + 1] === null) {
    battleField[x][y + 1] = shipId;
  }
  if (x < 9 && y < 9 && battleField[x + 1][y + 1] === null) {
    battleField[x + 1][y + 1] = shipId;
  }
  if (x < 9 && battleField[x + 1][y] === null) {
    battleField[x + 1][y] = shipId;
  }
  if (x < 9 && y > 0 && battleField[x + 1][y - 1] === null) {
    battleField[x + 1][y - 1] = shipId;
  }
  if (y > 0 && battleField[x][y - 1] === null) {
    battleField[x][y - 1] = shipId;
  }
  if (x > 0 && y > 0 && battleField[x - 1][y - 1] === null) {
    battleField[x - 1][y - 1] = shipId;
  }
  if (x > 0 && battleField[x - 1][y] === null) {
    battleField[x - 1][y] = shipId;
  }
  if (x > 0 && y < 9 && battleField[x - 1][y + 1] === null) {
    battleField[x - 1][y + 1] = shipId;
  }
  return battleField;
};

function tryDirections(direction, ship, shipStartPosition, battleField) {
  console.info(`Ship ${ship.name} Position ${shipStartPosition} Direction ${direction}`);
  let [x,y] = shipStartPosition;
  let wrongDirection = false;
  
  for (let i = 1; i < ship.size; i++) {
    switch (direction) {
      case 0:
      if (y + i > 9) {
        wrongDirection = true;
        break;
      } else if (isEmptyCell(x, y+i, battleField) || battleField[x][y + i] === SHIP_PADDER) {
        battleField[x][y + i] = ship.id;
        refillNeighbourCells(battleField, x, y + i, SHIP_PADDER);
        wrongDirection = false;
        break;
      } else {
        wrongDirection = true;
        break;
      }
      case 1:
      if (x + i > 9) {
        wrongDirection = true;
        break;
      } else if (isEmptyCell(x+i, y, battleField) || battleField[x + i][y] === SHIP_PADDER) {
        battleField[x + i][y] = ship.id;
        refillNeighbourCells(battleField, x + i, y, SHIP_PADDER);
        wrongDirection = false;
        break;
      } else {
        wrongDirection = true;
        break;
      }
      case 2:
      if (y - i < 0) {
        wrongDirection = true;
        break;
      } else if (isEmptyCell(x, y-1, battleField) || battleField[x][y - i] === SHIP_PADDER) {
        battleField[x][y - i] = ship.id;
        refillNeighbourCells(battleField, x, y - i, SHIP_PADDER);
        wrongDirection = false;
        break;
      } else {
        wrongDirection = true;
        break;
      }
      case 3:
      if (x - i < 0) {
        wrongDirection = true;
        break;
      } else if (isEmptyCell(x-i, y, battleField) || battleField[x - i][y] === SHIP_PADDER) {
        battleField[x - i][y] = ship.id;
        refillNeighbourCells(battleField, x - i, y, SHIP_PADDER);
        wrongDirection = false;
        break;
      } else {
        wrongDirection = true;
        break;
      }
      
      default:
      break;
    }
  }
  if (wrongDirection) {
    return null;
  } else {
    return battleField;
  }
}

function getEmptyRandomCell(grid) {
  while(true) {
    let [x,y] = getRandomCell(grid);
    if(isEmptyCell(x,y,grid)) return [x,y];
  }
}

/**
 * Checks whether a given cell (x,y) is empty (not occuied, not hit, not miss)
 * @param {number} x 
 * @param {number} y 
 * @param {[]} grid 
 * @returns {boolean} whether cell is empty or not
 */
export function isEmptyCell(x,y, grid) {
  return grid[x][y] === null;
}

/**
 * Gets a random cell coordinates
 * @param {[]} grid 2-d array that holds the grid data.
 * @returns {[x,y]} random coordinates components (x,y)
 */
export function getRandomCell(grid) {
  // open loop till find empty cell
  let x = Math.floor(Math.random() * grid.length);
  let y = Math.floor(Math.random() * grid[0].length);
  return [x,y]
}