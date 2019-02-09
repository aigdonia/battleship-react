export function initBattleGrid(rows, cols){
    let field = Array(rows).fill().map(() => Array(cols).fill(null));
    return field;
}

export function cloneBattleGrid(grid) {
    return JSON.parse(JSON.stringify(grid));
}