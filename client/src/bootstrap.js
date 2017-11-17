import React from 'react';
import {render} from 'react-dom';
import App from './components/app';

const appNode = document.querySelector('#app');

appNode && render(<App/>, appNode);
