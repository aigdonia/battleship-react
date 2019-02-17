import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BattleScreen from './components/BattleScreen';

class BattleshipApp extends Component {
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