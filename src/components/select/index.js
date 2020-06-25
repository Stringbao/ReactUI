
import Tool from "@core/tool.js";
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import KEYS from "@comp/define.js";

import Left from "./left.js";
import Bottom from "./bottom.js";

export default class LeSelect extends React.Component{
    constructor(props){
        super(props);
        this._id = Tool._idSeed.newId();
        this._type = "select";
        
        this._originData = [];
        this._text = "";

        this._leftData = [];
        this._bottomData = [];
        
        this.state = {
            data:[],
            disabled:false,
            showBottom:false
        }
    }

    /*************** 辅助函数 begin *****************/
    getSelectedItems(){
        return Tool.comp.getCheckedItems(this.state.data).items;
    }
    /*************** 辅助函数 end *****************/

    /*************** 生命周期 begin *****************/
    componentWillReceiveProps(props){
        
    }

    componentDidMount(){
        
    }

    shouldComponentUpdate(props,next){
        return true;
    }
    /*************** 生命周期 end *****************/

    /*************** Event begin *****************/
    changeText=(e)=>{
        this._text = e.target.value;
        let res = [];
        this.state.data.forEach(x=>{
            if(x[this.props.displayName].indexOf(this._text) != -1){
                res.push(x);
            }
        })
        this._leftData = this.getSelectedItems();
        this._bottomData = res;
        this.setState({
            data:this.state.data
        })
    }
    clickText=(e)=>{
        this._text = e.target.value;
        if(!this._text){
            this._leftData = this.getSelectedItems();
            this._bottomData = this.state.data;
        }
        this.setState({
            showBottom:true
        })
    }

    leftCb=(item)=>{
        item._ck = !item._ck;
        this._leftData = this.getSelectedItems();
        this.setState({
            data:this.state.data,
            showBottom:true
        })
        this.props.change(this._leftData);
    }

    bottomCb=(item)=>{
        if(this.props.multiple == false){
            let flag = !item._ck;
            this.state.data.forEach(x=>{
                x._ck = false;
            })
            item._ck = flag;
        }else{
            item._ck = !item._ck;
        }
        this._leftData = this.getSelectedItems();
        this.setState({
            showBottom:this.props.multiple
        })
        this.props.change(this._leftData);
    }
    /*************** Event end *****************/

    /*************** Methods begin *****************/
    init(data){
        if(!Tool.comp.checkArrayNull(data)){
            this._originData = Tool.comp.addPrimaryAndCk(Tool.comp.cloneObj(data));
            let tmp = Tool.comp.addPrimaryAndCk(Tool.comp.cloneObj(data));
            this.setState({
                data:tmp
            })
        }
    }

    setDisabled(flag){
        this.setState({
            disabled:flag
        })
    }

    getCheckedItems(){
        return Tool.comp.getCheckedItems(this.state.data,this.props.displayValue);
    }

    setCheckedItems(ids){
        this.state.data.forEach(x=>{
            let itemValue = x[this.props.displayValue];
            if(!x._ck){
                ids && ids.split && ids.split(',') && ids.split(',').forEach(id=>{
                    if(id.toString() == itemValue.toString()){
                        x._ck = true;
                    }
                })
            }
        })
        this._leftData = this.getSelectedItems();
        this.setState({
            data:this.state.data
        })
    }

    getItemByField(field,value){
        return Tool.comp.getItemByField(this.state.data,field,value);
    }

    clear(){
        this.state.data.forEach(x=>{
            x._ck = false;
        })
        this.setState({
            data:this.state.data
        })
    }
    /*************** Methods end *****************/
    
    render(){
        if(Tool.comp.checkArrayNull(this.state.data)){
            return null;
        }
        return (
            <div>
                <Left displayName={this.props.displayName} data={this._leftData} leftCb={this.leftCb} data={this._leftData}></Left>
                <input type="text" value={this._text} onClick={this.clickText} onChange={this.changeText}></input>
                <Bottom show={this.state.showBottom} displayName={this.props.displayName} data={this._bottomData} bottomCb={this.bottomCb} data={this._bottomData}></Bottom>
            </div>
        )
    }
}

LeSelect.defaultProps = {
    displayName:"",
    displayValue:"",
    label:"",
    multiple:false,
    change:()=>{}
}

LeSelect.propTypes = {
    displayName:PropTypes.string,
    displayValue: PropTypes.string,
    label:PropTypes.string,
    multiple:PropTypes.bool,
    change:PropTypes.func
}
