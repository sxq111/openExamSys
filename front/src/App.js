import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import NewUser from './Containers/NewUser';
import Login from './Containers/Login';
import Helper from './historyHelper';
import store from './store';
import { Provider } from 'react-redux';
import TestContainer from './Containers/FirstContainer';
import RedirectHelper from './historyHelper/redirectContainer';
 

class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		// console.log(this.props)
	}
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Helper />
							<Route path='/login' component={Login} />
							<Route path='/newUser' component={NewUser} />
							<RedirectHelper/>
							<Route path='/test' component={TestContainer} />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
