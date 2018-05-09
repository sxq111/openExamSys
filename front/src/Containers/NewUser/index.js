import React, { Component } from 'react'
import { connect } from 'react-redux';
import { creaters } from 'SRC/ActionCreaters';

@connect((store) => {
    return { ...store.regeister };
}, (dispatch) => {
    return { dispatch };
})
export default class NewUser extends Component {
    state = {
        id: '',
        pwd: '',
        email: '',
        checkCode: ''
    }
    render() {
        // console.log(this.props)
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
                <input value={this.state.email} placeholder='邮箱' onChange={(event) => {
                    this.setState({ email: event.target.value })
                }} />
                <br />
                <button onClick={() => {
                    this.props.dispatch(creaters.getCheckCode(this.state));
                }}>获取验证码</button>
                {
                    this.props.showCheckCodeInput && <div>
                        <input value={this.state.checkCode} placeholder='验证码'
                            onChange={(event) => { this.setState({ checkCode: event.target.value }) }}
                        />
                        <button onClick={() => {
                            this.props.dispatch(creaters.sendCryptoToServe({ id: this.state.id, pwd: this.state.pwd, checkCode: this.state.checkCode }));
                        }}>注册</button>
                    </div>
                }
            </div>
        )
    }
}
