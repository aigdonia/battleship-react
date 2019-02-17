import React from 'react';

import { ROWS, COLS } from '../helpers/constants';
import Battlefield from './Battlefield'
import { initBattleGrid } from '../helpers/battlefield';

let oppentGrid = initBattleGrid(ROWS, COLS);

const ArrangeScreen = () => {
    return (<div>
        {/* <Battlefield rows={ROWS} cols={COLS} grid={this.playerGrid} />
        <hr/>
        <Battlefield rows={ROWS} cols={COLS} grid={this.oppentGrid} /> */}
        <Battlefield rows={ROWS} cols={COLS} grid={oppentGrid} />
    </div>)
};

export default ArrangeScreen;