import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import preloadChunks from './App.preload';

preloadChunks();

ReactDOM.render(<App />, document.getElementById('root'));
