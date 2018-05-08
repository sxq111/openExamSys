import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { historyChangeListener } from '../store'; 
@withRouter
export default class Helper extends Component {
    componentDidMount(){
        this.props.history.listen(historyChangeListener)
    }
    render() {
        return (
            null
        )
    }
}
