
import Tool from "@core/tool.js";
import React from 'react';
import PropTypes from 'prop-types';

export default class Head extends React.Component{
    constructor(props){
        super(props);
    }

    /*************** 辅助函数 begin *****************/
    getHeaderCk(){
        let res = null;
        if(this.props.options.showCk && !this.props.options.single){
            res = <th><input type="checkbox" checked={this.props.ckAll} onChange={this.ckAllFn} /></th>;
        }else{
            res = <th></th>;
        }
        return res;
    }

    getActions(){
        let res = [];
        if(!Tool.comp.checkArrayNull(this.props.options.actions)){
            res = <th>操作</th>;
        }else{
            res = null;
        }
        return res;
    }

    getCols(){
        let res = [];
        if(!Tool.comp.checkArrayNull(this.props.options.map)){
            this.props.options.map.forEach((x) => {
                res.push(<th key={x.key}>{x.val}</th>);
            });
        }
        return res;
    }
    /*************** 辅助函数 end   *****************/

    /*************** 生命周期 begin *****************/
    shouldComponentUpdate(props,state){
        let flag = Tool.object.equalsObject(this.props.options.map,props.options.map);
        if(flag){
            return false;
        }
        return true;
    }
    /*************** 生命周期 end   *****************/

    /*************** Event begin   *****************/
    ckAllFn=()=>{
        this.props.headToParent(!this.props.ckAll);
    }
    /*************** Event end     *****************/

    /*************** Methods begin *****************/

    /*************** Methods end   *****************/
    render(){
        return (
            <thead>
                <tr>
                    {this.getHeaderCk()}
                    {this.getActions()}
                    {this.getCols()}
                </tr>
            </thead>
        )
    }
}

Head.defaultProps = {
    ckAll:false,
    headToParent:()=>{},
    options:{
        showCk:false,
        single:false,
        map:[],
        actions:[]
    },
}

Head.propTypes = {
    headToParent:PropTypes.func,
    ckAll:PropTypes.bool,
    options:PropTypes.object
}