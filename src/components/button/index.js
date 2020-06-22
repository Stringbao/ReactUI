import React from 'react';
import "./index.scss";
import Tool from "@core/tool.js";

export default class extends React.Component{
    constructor(props){
        super(props);
        this._id = Tool._idSeed.newId();

        this.state = {
            disabled:false
        }
    }
    
    componentDidMount(){
        this.refs[this._id].addEventListener('click',function(e){
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
    render(){
        return (<button ref={this._id} className="btn">Click Me</button>)
    }
}