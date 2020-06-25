import React from 'react';
import "./index.scss";
import Tool from "@core/tool.js";
import PropTypes from 'prop-types';

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
    click = (e)=>{
        this.props.click && this.props.click(e);
    }

    submit = (e)=>{
        if(this.state.disabled){
            return;
        }
        this.setDiabled(true);
        this.props.submit().then(x=>{
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
        document.getElementById(this._id).addEventListener('click', function (e) {
            e.preventDefault();
            let rippleBox = document.createElement("div");
            rippleBox.style.width = e.target.offsetWidth  + "px";
            rippleBox.style.height = e.target.offsetHeight + "px";
            rippleBox.classList.add("_ripples")
            let x = e.offsetX;
            let y = e.offsetY;
            let ripples = document.createElement("span");
            ripples.style.left = x + "px";
            ripples.style.top = y + "px";
            rippleBox.appendChild(ripples);
            e.target.appendChild(rippleBox);
            setTimeout(() => {
                rippleBox.remove();
            }, 1500);
        })
    }
    componentWillUnmount(){
        document.getElementById(this._id).removeEventListener("click");
    }

    shouldComponentUpdate(props,state){
        if(this.state.disabled == state.disabled){
            return false;
        }
        return true;
    }

    /*************** 生命周期 end *****************/

    render(){
        //return null 并不会影响当前组件的声明周期，只是当前组件不会渲染
        return (<button disabled={this.state.disabled}
            onClick={this.props.click?this.click:this.submit} id={this._id} 
            className="btn">{this.props.value}</button>)
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
