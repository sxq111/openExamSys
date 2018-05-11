import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect,Route } from 'react-router-dom';
@connect((store) => {
    return { userData:store.userData};
}, (dispatch) => {
    return { dispatch };
})
export default class REdirectHelper extends Component {
    render() {
        console.log(this.props)
        let rst = <Redirect from = '/' to = '/login' />;
        if(this.props.userData&& this.props.userData.id){
            rst = <Route path = '/SSSXXX' render ={()=>{return 'null' }} />;
        }
        console.log(rst);
        return rst;
    }
}
