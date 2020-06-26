
import Tool from "@core/tool.js";
import Ajax from "@core/fetch.js";
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import KEYS from "@comp/define.js";
import Bottom from "./bottom.js";

export default class AutoCompleted extends React.Component{
    constructor(props){
        super(props);
        this._id = Tool._idSeed.newId();
        this._type = "autocompleted";

        this._text = "";
        this._activeIndex = -1;

        this.state = {
            data:[],
            disabled:false,
            showBottom:false
        }
    }

    /*************** 辅助函数 begin *****************/
    setCurrentActive(item){
        this.state.data.forEach(x=>{
            if(x._tmpId == item._tmpId){
                x._ck = true;
            }else{
                x._ck = false;
            }
        })
    }

    getActiveIndex(){
        let _index = -1;
        this.state.data.forEach(x=>{
            if(x._ck){
                _index = x._index;
            }
        })
        return _index;
    }

    showBottom(flag){
        this.setState({
            showBottom:flag?flag:false
        })
    }
    /*************** 辅助函数 end *****************/

    /*************** 生命周期 begin *****************/
    componentWillReceiveProps(props){}

    componentDidMount(){
        
    }
    /*************** 生命周期 end *****************/

    /*************** Event begin *****************/
    changeText = (e)=>{
        this._text = e.target.value;
        if(this._text == ""){
            return;
        }
        Ajax.getFetch(this.props.url + this._text,false).then(x=>{
            let tmp = this.props.analysis(x.data);
            if(!Tool.comp.checkArrayNull(tmp)){
                tmp = Tool.comp.addPrimaryAndCk(tmp);
                this.setState((prevState)=>{
                    return {
                        data:tmp,
                        showBottom:true
                    }
                })
                this._activeIndex = -1;
            }
        })
    }

    clickText=(e)=>{
        this.showBottom(true);
    }

    keyUp = (e)=>{
        if(this.state.data.length == 0){
            return;
        }
        if(e.keyCode == "40"){
            if(this._activeIndex == -1 || this._activeIndex == this.state.data.length - 1){
                this._activeIndex = 0;
            }else{
                this._activeIndex += 1;
            }
        }
        if(e.keyCode == "38"){
            if(this._activeIndex == -1 || this._activeIndex == 0){
                this._activeIndex = this.state.data.length - 1;
            }else{
                this._activeIndex -= 1;
            }
        }
        
        let currentItem = this.state.data[this._activeIndex];
        if(!currentItem){
            return;
        }
        this.setCurrentActive(currentItem);
        this.setState({
            data:this.state.data
        })
        if(e.keyCode == "13"){
            this.props.enter(currentItem);
            this.showBottom(false);
        }
    }
    bottomCb=(item)=>{
        this._activeIndex = item._index;
        this.props.enter(item);
        this.setCurrentActive(item);
        this.setState({
            data:this.state.data,
            showBottom:false
        })
    }
    /*************** Event end *****************/

    /*************** Methods begin *****************/
    setDisabled(flag){
        this.setState({
            disabled:flag
        })
    }
    
    clear(){

    }
    /*************** Methods end *****************/
    
    render(){
        return (
            <div>
                <input onKeyUp={this.keyUp} type="text" onClick={this.clickText} onChange={this.changeText}></input>
                <Bottom show={this.state.showBottom} data={this.state.data} displayName={this.props.displayName} bottomCb={this.bottomCb}></Bottom>
            </div>
        )
    }
}

AutoCompleted.defaultProps = {
    displayName:"",
    url:"",
    analysis:()=>{},
    requestType:"get",
    label:"",
    enter:()=>{}
}

AutoCompleted.propTypes = {
    displayName:PropTypes.string,
    requestType:PropTypes.string,
    url:PropTypes.string,
    analysis: PropTypes.func,
    label:PropTypes.string,
    enter: PropTypes.func
}
