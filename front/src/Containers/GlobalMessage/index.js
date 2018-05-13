import React, { Component } from 'react';
import { connect } from 'react-redux';
import { creaters } from '../../ActionCreaters';
import styles from './style.css';

@connect((store) => {
    console.log('1',store)
    return { messages: store.message.messageList };
}, (dispatch) => {
    return { dispatch };
})
export default class GlobalMessageBox extends Component {
    itemDie(key){
        setTimeout(()=>{
            this.props.dispatch(creaters.setMessageVisiblity({key:key,visible:false}));
        },5000)
        // let arr = [];
        // arr.filter
    }
    render() {
        console.log('2 render',this.props)
        return (
            <div className={styles.outSide} >
                {
                    this.props.messages.filter(m=>{
                        return m.show
                    }).map(m => {
                        return (<MessageItem {...m} callback = {this.itemDie.bind(this,m.key)} />)
                    })
                }
            </div>
        )
    }
}

class MessageItem extends Component {
    componentDidMount(){
        this.props.callback();
    }
    render() {
        return (
            <div className={styles.item} >
                {this.props.type}
                <br />
                {this.props.message}
            </div>
        )
    }
}