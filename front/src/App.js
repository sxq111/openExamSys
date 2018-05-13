import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NewUser from './Containers/NewUser';
import Login from './Containers/Login';
import Helper from './historyHelper';
import store from './store';
import { Provider } from 'react-redux';
import TestContainer from './Containers/FirstContainer';
import RedirectHelper from './historyHelper/redirectContainer';
import GMessager from './Containers/GlobalMessage';

class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		// console.log(this.props)
	}
	render() {
		console.log('father render',store);
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<GMessager />
						<Helper ignore={{ '/login': true, '/newuser': true }} main={'/login'} />
						<Route path='/login' component={Login} />
						<Route path='/newuser' component={NewUser} />
						<Route path='/test' component={TestContainer} />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
