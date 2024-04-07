import React from 'react';
import ReactDOM from 'react-dom';
import Graph2D from './components/Graph2D/Graph2D';
import Header from './components/Header/Header';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Graph2D />
  </React.StrictMode>,
  document.getElementById('root')
);
