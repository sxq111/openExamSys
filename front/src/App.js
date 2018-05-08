import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NewUser from './NewUser';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Route path='/login' render={() => {
						return (<div>login</div>)
					}} />
					<Route path='/newUser' component = {NewUser}  />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
