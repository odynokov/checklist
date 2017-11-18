import React from 'react';
import {render} from 'react-dom';
import dataProvider from './data-provider';
import App from './components/app';

const appNode = document.querySelector('#app');
const Application = dataProvider(App);


appNode && render(<Application/>, appNode);
