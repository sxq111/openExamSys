import React, { Component } from 'react'

export default class Login extends Component {
    state={
        id:'',
        pwd:''
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
                <br/>
                <button>登陆</button>
            </div>
        )
    }
}
