import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import routes from './config/routes';

render(
	routes,

    document.getElementById('app')
)

