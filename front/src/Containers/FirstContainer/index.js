import React, { Component } from 'react'
import { connect } from 'react-redux';
@connect((store) => {
    return { userData:{...store.userData} };
}, (dispatch) => {
    return { dispatch };
})
export default class FirstContainer extends Component {
    render() {
        return (
            <div>
                您已经成功登陆
            </div>
        )
    }
}
