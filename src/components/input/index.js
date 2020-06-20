
import Tool from "@core/tool.js";
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import KEYS from "@comp/define.js";

export default class LeInput extends React.Component{
    constructor(props){
        super(props);
        this._id = Tool._idSeed.newId();
        this._validataType = "input";
        this._label = this.props.label?this.props.label:"";

        this.state = {
            cls:"",
            focus:this.props.value?true:false
        }
    }

    getPlaceHolder(){
        let _placeholder = "";
        if(!this.state.focus){
            _placeholder = "";
        }else{
            _placeholder = this.props.value?"":this.props.placeholder;
        }
        return _placeholder;
    }

    UNSAFE_componentWillReceiveProps(props){
        // this._value = props.value;
    }

    componentDidMount(){

    }

    shouldComponentUpdate(props,next){
        if(this.state.focus == next.focus && this.props.value == props.value){
            console.log("not render");
            return false;
        }
        console.log("will render");
        return true;
    }

    callbackDomEvent(type,event){
        this.props.cb(this.props.field,type,event);
        // this.props.onDomEvent && this.props.onDomEvent(type,event);
    }   

    changeHandler(event){
        this.callbackDomEvent(KEYS.EVENT_KEY.CHANGE,event);
    }

    focusHandler(event){
        this.setState({focus:true});
        this.callbackDomEvent(KEYS.EVENT_KEY.FOCUS,event);
    }

    blurHandler(event){
        if(this.props.value){
            this.setState({
                focus:true
            })
        }else{
            this.setState({
                focus:false
            })
        }
        this.callbackDomEvent(KEYS.EVENT_KEY.BLUR,event);
    }

    keyDownHandler(event){
        if(event.keyCode == "13"){
            this.callbackDomEvent(KEYS.EVENT_KEY.ENTER,event);
        }
        // this.callbackDomEvent(KEYS.EVENT_KEY.PRESS,event);
    }

    getValue(){
        return this.props.value;
    }

    render(){
        return (
            (
            <div className={`input_group ${this.state.focus?"focus":""}`}>
                <div className="input_control">
                    <div className="input_slot">
                        <div className="text_field">
                            <label>{this._label}</label>
                            <input value = {this.props.value} type="text" 
                                placeholder = {this.getPlaceHolder()}
                                onFocus={(e)=>this.focusHandler(e)} 
                                onBlur={(e)=>this.blurHandler(e)}
                                onChange={(e)=>this.changeHandler(e)}
                                onKeyDown={(e)=>this.keyDownHandler(e)}
                            />
                        </div>
                    </div>
                    <div className="input_detail"></div>
                </div>
            </div>)
            )
    }
}


// LeInput.defaultProps = {
//     disabled: false,
//     tips:"",
//     errorMessage:"",
//     placeholder:"",
//     label:"",
//     value:"",
//     reg:""
// }

// LeInput.propTypes = {
//     disabled: PropTypes.bool,
//     tips:PropTypes.string,
//     errorMessage:PropTypes.string,
//     placeholder:PropTypes.string,
//     label:PropTypes.string,
//     value:PropTypes.string,
//     reg:PropTypes.string
// }
