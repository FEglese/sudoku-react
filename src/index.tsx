// Packages
import React from 'react';
import ReactDOM from 'react-dom';

// Modules
import Sudoku from './components/sudoku';

// Style
import './style/main.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <Sudoku />,
  document.getElementById('root')
);
