
import Tool from "@core/tool.js";
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class LeAlert extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            msg:""
        }
    }

    show(msg){
        this.setState({
            msg:msg
        })
        this.hide();        
    }
    hide(time){
        if(!time){
            time = 3000;
        }
        window.setTimeout(()=>{
            this.setState({
                msg:""
            })
        },time)
        
    }

    render(){
        return (
            <div style={{display:this.state.msg?'block':'none',color:'red'}}>{this.state.msg}</div>
        )
    }
}

LeAlert.defaultProps = {
    msg:""
}

LeAlert.propTypes = {
    msg:PropTypes.string
}
