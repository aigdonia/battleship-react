import { reduce } from 'lodash';

const ships = [
  {id:'cr', name:'Carrier', size:5},
  {id:'bs', name:'Battleship', size:4},
  {id:'c1', name:'Cruiser 1', size:3},
  {id:'c2', name:'Cruiser 2', size:3},
  {id:'dr', name:'Destroyer', size:2}
];

export function createShip (id, name, size) {
  return {
    id,
    name,
    size,
    hits: 0
  }
}

export function generateShips() {
  return ships.reduce( (ships, {id, name, size}) => {
    ships[id.toLowerCase()] = createShip(id, name, size);
    return ships;
  } , {});
}

export function isAllShipsSunk(ships) {
  const [s, h] = reduce(ships, (res, ship) => {
    let [_s, _h] = res;
    _s += ship.size;
    _h += ship.hits;

    return [_s, _h];
  }, [0, 0]);
  return s === h;
}