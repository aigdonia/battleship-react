import { CELL_HIT, CELL_MISS } from "./constants";
import { getRandomCell } from "./battlefield";

export function getFreshRandomCell(grid) {
    while(true) {
      let [x,y] = getRandomCell(grid);
      if(!(grid[x][y] === CELL_HIT || grid[x][y] === CELL_MISS)) return [x,y];
    }
}