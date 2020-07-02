
import Tool from "@core/tool.js";
import React from 'react';
import PropTypes from 'prop-types';

export default class Body extends React.Component{
    constructor(props){
        super(props);
    }

    /*************** 辅助函数 begin *****************/
    getCkTd(item){
        let res = null;
        if(this.props.options.showCk){
            if(this.props.options.single){
                res = (<th><input type="radio" class="singleSelected" checked={item._ck} onClick={()=>{this.this.clickCk('checkbox',item)}} /></th>);
            }else{
                res = (<th><input type="checkbox" class="singleSelected" checked={item._ck} onClick={()=>{this.this.clickCk('radio',item)}} /></th>);
            }
        }else{
            res = null;
        }
        return res;
    }
    getActionsTd(item){
        if(Tool.comp.checkArrayNull(this.props.options.actions)){
            return null;
        }
        let res = [];
        this.props.options.actions.forEach((x,idx)=>{
            res.push(<div key={idx}><input type="button" value={x.val} onClick={()=>{x.action(item)}}></input></div>)
        })
        return <td>{res}</td>;
    }
    getValByFieldInRow(item,row){
        let key = item.key;
        let val = "";
        if(typeof row[key] == "boolean"){
            val = row[key].toString();
        }else{
            let v = "row."+item.key;
            let tmp = eval("("+v+")");
            
            if(tmp == undefined){
                val = "";
            }else{
                let type = item.type;
                if(type){
                    type = type.toLowerCase();
                    switch(type){
                        case "date":
                            val = tool.date.date(tmp);
                            break;
                        case "datetime":
                            val = tool.date.dateTime(tmp);
                            break;
                        case "time":
                            val = tool.date.time(tmp);
                            break;
                        default:
                            val = tmp;
                    }
                }else{
                    val = tmp;
                }
            }
        }
        return val;
    }
    getContentTd(item){
        let res = [];
        this.props.options.map.forEach((x,idx)=>{
            res.push(
            <td key={idx}>
                <div onClick={x.action && x.action(item)}>{x.convert && this.getValByFieldInRow(x,item)}</div>
            </td>)
        })
        return res;
    }
    getItems(){
        let res = [];
        this.props.data.forEach(x => {
            let tmp = [];
            let cktd = this.getCkTd(x);
            let actionTd = this.getActionsTd(x);
            let contentTd = this.getContentTd();
            Array.prototype.push.apply(tmp,cktd);
            Array.prototype.push.apply(tmp,actionTd);
            Array.prototype.push.apply(tmp,contentTd);
            let tr = <tr>{tmp}</tr>;
            res.push(tr);
        });
        return res;
    }

    getCheckedRowCount(){
        let count = 0;
        this.props.data.forEach(x=>{
            if(x._ck){
                count++;
            }
        })
        return count;
    }
    /*************** 辅助函数 end   *****************/

    /*************** 生命周期 begin *****************/
    shouldComponentUpdate(props,state){
        return true;
    }
    /*************** 生命周期 end   *****************/

    /*************** Event begin   *****************/

    /*************** Event end     *****************/

    /*************** Methods begin *****************/
    clickCk = (tag,item)=>{
        let tmp = false;
        if(tag == "checkbox"){
            item.ck = !item.ck;
            if(this.getCheckedRowCount() == this.props.data.length){
                tmp = true;
            }
        }else{
            tmp = false;
        }

        this.props.bodyToParent(tmp);
    }
    /*************** Methods end   *****************/

    render(){
        if(this.props.data.length == 0){
            return <div>暂无数据</div>
        }
        return (
            <tbody>
                {this.getItems()}
            </tbody>
        )
    }
}

Body.defaultProps = {
    data:[],
    options:{
        showCk:false,
        single:false,
        map:[],
        actions:[]
    },
    bodyToParent:()=>{}
}

Body.propTypes = {
    options:PropTypes.object,
    bodyToParent:PropTypes.func
}
