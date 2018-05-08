import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import {creaters} from '../ActionCreaters';

@connect((store)=>{
    return {store};
},(dispatch) =>{
    return {dispatch};
})
export default class NewUser extends Component {
    state = {
        id: '',
        pwd: ''
    }
    render() {
        console.log(this.props)
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
                <button onClick = {()=>{
                    this.props.dispatch(creaters.action1({aaaa:'aaaa'}));
                    // axios.post('http://localhost:4396/newUserPrepare',this.state).then(rst=>{
                    //     console.log(rst);
                    // })
                }}>注册</button>
            </div>
        )
    }
}
