import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { historyChangeListener } from '../store';
import { connect } from 'react-redux';

let temphistory;
@withRouter
@connect((store) => {
    return { userData:{...store.userData} };
}, (dispatch) => {
    return { dispatch };
})
export default class Helper extends Component {
    componentDidMount() {
        temphistory = this.props.history;
        this.props.history.listen(historyChangeListener)
    }
    componentDidUpdate(){

    }
    render() {
        let pathName = this.props.location.pathname;
        if(pathName === this.props.main)return null;
        if(!this.props.ignore[pathName]){
            if(!(this.props.userData&& this.props.userData.id)){
                this.props.history.push(this.props.main)
            }
        }
        // console.log(this.props)
        return (
            null
        )
    }
}

export const getHistory = () => { return temphistory }
