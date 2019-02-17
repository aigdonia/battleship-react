import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ROWS, COLS } from './helpers/constants';
import { initBattleGrid } from './helpers/battlefield';
import './styles.scss';
import BattleScreen from './components/BattleScreen';

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
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={BattleScreen}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default BattleshipApp;