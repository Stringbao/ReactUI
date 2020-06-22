
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

    /*************** 辅助函数 begin *****************/
    getPlaceHolder(){
        let _placeholder = "";
        if(!this.state.focus){
            _placeholder = "";
        }else{
            _placeholder = this.props.value?"":this.props.placeholder;
        }
        return _placeholder;
    }

    getClearIconStatus(){
        if(this.props.value == ""){
            return "none";
        }
        if(!this.state.focus){
            return "none";
        }
        return "block";
    }
    /*************** 辅助函数 end *****************/

    /*************** 生命周期 begin *****************/
    componentWillReceiveProps(props){}

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

    /*************** 生命周期 end *****************/


    /*************** Event begin *****************/
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
    /*************** Event end *****************/


    /*************** Methods begin *****************/
    getValue(){
        return this.props.value;
    }

    setValue(){

    }

    setFocus(){
        document.getElementById(this._id).focus();
    }

    doClear(e){
        e.target.value = "";
        document.getElementById(this._id).focus();
        this.callbackDomEvent(KEYS.EVENT_KEY.CHANGE,event);
    }
    /*************** Methods end *****************/
    

    render(){
        return (
            (
            <div className={`input_group ${this.state.focus?"focus":""}`}>
                <div className="input_control">
                    <div className="input_slot">
                        <div className="text_field">
                            <label>{this._label}</label>
                            <input id={this._id} value = {this.props.value} type={this.props.type =="text"?"text":"password"}
                                placeholder = {this.getPlaceHolder()}
                                onFocus={(e)=>this.focusHandler(e)} 
                                onBlur={(e)=>this.blurHandler(e)}
                                onChange={(e)=>this.changeHandler(e)}
                                onKeyDown={(e)=>this.keyDownHandler(e)}
                            />
                            <i style={{display:this.getClearIconStatus()}} onClick={(e) => this.doClear(e)} className='input_icon_close'></i>
                        </div>
                    </div>
                    <div className="input_detail"></div>
                </div>
            </div>)
            )
    }
}


LeInput.defaultProps = {
    type:"text",
    disabled: false,
    tips:"",
    errorMessage:"",
    placeholder:"",
    label:"",
    value:"",
    reg:"",
    field:"",
    cb:function(){}
}

LeInput.propTypes = {
    type:PropTypes.string,
    disabled: PropTypes.bool,
    tips:PropTypes.string,
    errorMessage:PropTypes.string,
    placeholder:PropTypes.string,
    label:PropTypes.string,
    value:PropTypes.string,
    reg:PropTypes.string,
    field:PropTypes.string,
    cb:PropTypes.func
}
