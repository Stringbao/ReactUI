
import Tool from "@core/tool.js";
import React from 'react';
import PropTypes from 'prop-types';

export default class Paging extends React.Component{
    constructor(props){
        super(props);
        
        this._size = this.props.paging.size;
        this._enterText = "";
    }

    /*************** 辅助函数 begin *****************/
    
    /*************** 辅助函数 end   *****************/

    /*************** 生命周期 begin *****************/
    componentWillReceiveProps(props){
        this._size = props.paging.size;
    }

    shouldComponentUpdate(props,state){
        let flag = Tool.object.equalsObject(this.props.paging,props.paging);
        if(flag){
            return false;
        }
        return true;
    }
    /*************** 生命周期 end   *****************/

    /*************** Event begin   *****************/
    changeSize = ()=>{
        this.props.sizeToParent(this._size);
    }

    changeText = (e)=>{
        this._enterText = e.target.value;
    }
    goPrev=()=>{
        if(this.props.paging.index == 1){
            return;
        }
        let index = this.props.paging.index--;
        this.prevToParent(index);
    }
    goNext=()=>{
        let total = this.getTotal();
        if(this.props.paging.index == total){
            return;
        }
        let index = this.props.paging.index++;
        this.nextToParent(index);
    }
    /*************** Event end     *****************/

    /*************** Methods begin *****************/
    goTo(){
        this.props.enterToParent(this._enterText);
    }

    getTotal(){
        let total = -1;
        let count = this.props.paging.count;
        let size = this._size;
        if(parseInt(count)%size == 0){
            total = parseInt(count)/size;
        }else{
            total = parseInt(parseInt(count)/size) + 1;
        }
        return total;
    }
    /*************** Methods end   *****************/

    render(){
        return (
            <div>
                <select value={this._size} onChange={this.changeSize} >
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                </select>
                总条数:{this.props.paging.count}
                当前页:{this.props.paging.index}/{this.getTotal()}
                <input type="button" value="上一页" onClick={this.goPrev}></input>
                <input type="button" value="下一页" onClick={this.goNext}></input>
                跳转:<input type="text" value={this._enterText} onChange={this.changeText}></input>
                <input type="button" onClick={this.goTo}></input>
            </div>
        )
    }
}

Paging.defaultProps = {
    data:[],
    paging:{
        count:0,
        index:1,
        size:10
    },
    sizeToParent:()=>{},
    enterToParent:()=>{},
    prevToParent:()=>{},
    nextToParent:()=>{}
}

Paging.propTypes = {
    paging:PropTypes.object,
    sizeToParent:PropTypes.func,
    enterToParent:PropTypes.func,
    prevToParent:PropTypes.func,
    nextToParent:PropTypes.func
}
