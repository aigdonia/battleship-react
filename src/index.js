import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import BattleshipApp from './BattleshipApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BattleshipApp />, document.getElementById('root'));
serviceWorker.unregister();
