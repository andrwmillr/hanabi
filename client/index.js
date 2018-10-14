import React from 'react';
import ReactDOM from 'react-dom';
import LogRocket from 'logrocket';

import App from './app';
import './socket';

LogRocket.init('w23csi/hanabi');

ReactDOM.render(<App />, document.getElementById('app'));
