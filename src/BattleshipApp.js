import React, {Component} from 'react';
import { ROWS, COLS } from './helpers/constants';
import Battlefield from './components/Battlefield'
import { initBattleGrid } from './helpers/battlefield';
import './styles.scss';

class BattleshipApp extends Component {
    playerGrid = null;
    oppentGrid = null;

    componentWillMount() {
        this.playerGrid = initBattleGrid(ROWS, COLS);
        this.playerGrid[0][5] = 0;
        this.playerGrid[1][5] = 0;
        this.playerGrid[2][5] = 1;

        this.playerGrid[4][6] = 2;
        this.oppentGrid = initBattleGrid(ROWS, COLS);
    }

    render() {
        return(
            <div>
                <Battlefield rows={ROWS} cols={COLS} grid={this.playerGrid} />
                <hr/>
                <Battlefield rows={ROWS} cols={COLS} grid={this.oppentGrid} />
            </div>
        );
    }
}

export default BattleshipApp;