import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NewUser from './NewUser';
import Helper from './historyHelper';
import store from './store';
import { Provider } from 'react-redux'


class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		// console.log(this.props)
	}
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Helper/>
						<Route path='/login' render={() => {
							return (<div>login</div>)
						}} />
						<Route path='/newUser' component={NewUser} />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
