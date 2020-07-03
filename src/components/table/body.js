
import Tool from "@core/tool.js";
import React from 'react';
import PropTypes from 'prop-types';

export default class Body extends React.Component{
    constructor(props){
        super(props);

        this._needUpdate = false;

        this._radioName = Tool._idSeed.newId();
    }

    /*************** 辅助函数 begin *****************/
    getCkTd(item){
        let res = null;
        if(this.props.options.showCk){
            if(this.props.options.single){
                res = <td><input type="radio" name={this._radioName} className="singleSelected" checked={item._ck} onChange={()=>{this.clickCk('radio',item)}} /></td>;
            }else{
                res = <td><input type="checkbox" className="singleSelected" checked={item._ck} onChange={()=>{this.clickCk('checkbox',item)}} /></td>;
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
            res.push(<input key={idx} type="button" value={x.val} onClick={()=>{x.action(item)}}></input>)
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
            let tmp = null;
            if(x.convert){
                tmp = <>{x.convert(item)}</>;
            }else{
                tmp = <>{this.getValByFieldInRow(x,item)}</>;
            }
            res.push(
            <td key={idx} onClick={x.action && x.action(item)}>
                {tmp}
            </td>)
        })
        return res;
    }
    getItems(){
        let res = [];
        this.props.data.forEach(x => {
            let cktd = this.getCkTd(x);
            let actionTd = this.getActionsTd(x);
            let contentTd = this.getContentTd(x);
            let tr = <tr key={x._tmpId}>{cktd}{actionTd}{contentTd}</tr>;
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
        let dataFlag = Tool.object.equalsObject(this.props.data,props.data);
        if(!dataFlag || this._needUpdate){
            this._needUpdate = false;
            return true;
        }
        return false;
    }

    componentDidMount(){
        Tool._event_publisher.on("CkAllChanged",()=>{
            this._needUpdate = true;
        });
    }
    /*************** 生命周期 end   *****************/

    /*************** Event begin   *****************/

    /*************** Event end     *****************/

    /*************** Methods begin *****************/
    clickCk = (tag,item)=>{
        let tmp = false;
        if(tag == "checkbox"){
            item._ck = !item._ck;
            if(this.getCheckedRowCount() == this.props.data.length){
                tmp = true;
            }
            this.props.bodyToParent("checkbox",tmp);
        }else{
            this.props.bodyToParent("radio",item);
        }
        this._needUpdate = true;
    }
    /*************** Methods end   *****************/

    render(){
        console.log("render table body");
        if(this.props.data.length == 0){
            return <tbody><tr><td>暂无数据</td></tr></tbody>
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
