import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { historyChangeListener } from '../store'; 

let temphistory;
@withRouter
export default class Helper extends Component {
    componentDidMount(){
        temphistory = this.props.history;
        this.props.history.listen(historyChangeListener)
    }
    render() {
        return (
            null
        )
    }
}

export const getHistory =()=>{return temphistory}
