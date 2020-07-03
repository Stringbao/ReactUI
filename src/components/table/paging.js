
import Tool from "@core/tool.js";
import React from 'react';
import PropTypes from 'prop-types';

export default class Paging extends React.Component{
    constructor(props){
        super(props);
        
        this._size = this.props.paging.size;
    }

    /*************** 辅助函数 begin *****************/
    
    /*************** 辅助函数 end   *****************/

    /*************** 生命周期 begin *****************/
    componentWillReceiveProps(props){
        // this._size = props.paging.size;
    }

    shouldComponentUpdate(props,state){
        return !Tool.object.equalsObject(this.props.paging,props.paging);
    }
    /*************** 生命周期 end   *****************/

    /*************** Event begin   *****************/
    changeSize = (e)=>{
        this._size = parseInt(e.target.value);
        this.props.sizeToParent(this._size);
    }

    goPrev=()=>{
        if(this.props.paging.index == 1){
            return;
        }
        let index = this.props.paging.index - 1;
        this.props.prevToParent(index);
    }
    goNext=()=>{
        let total = this.getTotal();
        if(this.props.paging.index == total){
            return;
        }
        let index = this.props.paging.index + 1;
        this.props.nextToParent(index);
    }
    /*************** Event end     *****************/

    /*************** Methods begin *****************/
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
        console.log("render table paging");
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
