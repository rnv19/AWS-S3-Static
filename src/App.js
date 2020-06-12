import React from 'react';
import './App.css';
import Login from './components1/Login';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <Login />;
	}
}
