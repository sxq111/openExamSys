import React, { Component } from 'react'
import { connect } from 'react-redux';
import { creaters } from '../../ActionCreaters';

@connect((store) => {
    return { ...store };
}, (dispatch) => {
    return { dispatch };
})
export default class Login extends Component {
    state = {
        id: '',
        pwd: ''
    }
    componentDidUpdate(){
        if(this.props.userData && this.props.userData.id){
        setTimeout(()=>{
                this.props.history.push('/test');
        },1000);

        }
    }
    render() {
        return (
            <div>
                <input value={this.state.id} placeholder='用户名' onChange={(event) => {
                    this.setState({ id: event.target.value })
                }} />
                <br />
                <input value={this.state.pwd} placeholder='密码' onChange={(event) => {
                    this.setState({ pwd: event.target.value })
                }} />
                <br />
                <button
                    onClick={() => {
                        this.props.dispatch(creaters.requestLogin(this.state));
                    }}
                >登陆</button>
                                {/* <button
                    onClick={() => {
                        this.props.history.push('/test');
                    }}
                >TEST</button> */}
            </div>
        )
    }
}
