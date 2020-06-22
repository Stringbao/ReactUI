import React from 'react';
import "./index.scss";
import Tool from "@core/tool.js";
import PropTypes from 'prop-types';
import KEYS from "@comp/define.js";

export default class LeButton extends React.Component{
    constructor(props){
        super(props);
        this._id = Tool._idSeed.newId();

        this.state = {
            disabled:false
        }
    }

    /*************** Methods begin *****************/
    setDiabled(flag){
        this.setState({
            disabled:flag
        });
    }
    /*************** Methods end   *****************/

    /*************** Event begin *****************/
    click(e){
        this.props.click && this.props.click(e);
    }

    submit(fn){
        if(this.state.disabled){
            return;
        }
        this.setDiabled(true);
        fn().then(x=>{
            window.setTimeout(()=>{
                this.setDiabled(false);
            },3000);
        }).catch(error=>{
            this.setDiabled(false);
        })
    }
    /*************** Event end   *****************/

    /*************** 生命周期 begin *****************/
    componentDidMount(){
        document.getElementById(this._id).addEventListener('click',function(e){
            let x = e.offsetX;
            let y = e.offsetY;
            let ripples = document.createElement("span");
            ripples.classList.add("_ripples")
            ripples.style.left = x + "px";
            ripples.style.top = y + "px";
            e.target.appendChild(ripples);
            setTimeout(() => {
                ripples.remove();
            }, 1000);
        })
    }

    shouldComponentUpdate(props,state){
        if(this.state.disabled == state.disabled){
            return false;
        }
        return true;
    }

    /*************** 生命周期 end *****************/

    render(){
        return (<button 
            onClick={this.props.click?(e)=>this.click(e):()=>this.submit(this.props.submit)} id={this._id} 
            className="btn">{this.props.value + "===" + this.state.disabled}</button>)
    }
}

LeButton.defaultProps = {
    value:"default",
    iconName: "",
    disabled:false,
    type:""
}

LeButton.propTypes = {
    value:PropTypes.string,
    iconName: PropTypes.string,
    disabled:PropTypes.bool,
    type:PropTypes.string
}
