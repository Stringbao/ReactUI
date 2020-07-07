
import Tool from "@core/tool.js";
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import KEYS from "@comp/define.js";

export default class LeRadio extends React.Component{
    constructor(props){
        super(props);
        this._id = Tool._idSeed.newId();
        this._type = "radio";

        this._data = [];
        this.state = {
            data:[],
            disabled:false
        }
    }

    /*************** 辅助函数 begin *****************/
    getCheckboxItems(){
        const listItems = [];
        this.state.data.map(x=>{
            listItems.push(
                <div key={x._tmpId} id={x._tmpId}>
                    <label>{x[this.props.displayName]}</label>
                    <span><input name={this._id} type="radio" checked={x._ck} onChange={()=>{this.changeItem(x)}}></input></span>
                </div>
            )
        })
        return listItems;
    }

    /*************** 辅助函数 end *****************/

    /*************** 生命周期 begin *****************/
    componentWillReceiveProps(props){}

    componentDidMount(){
        
    }

    shouldComponentUpdate(props,next){
        return true;
    }
    /*************** 生命周期 end *****************/

    /*************** Event begin *****************/
    changeItem = (item)=>{
        if(!item._ck){
            this.state.data.forEach(x=>{
                if(x._tmpId == item._tmpId){
                    item._ck = true;
                }else{
                    x._ck = false;
                }
            })
            
            let items = this.getCheckedItem();
            this.props.field && (this.props.field.context[this.props.field.key] = items);

            this.props.change && this.props.change(items);
            this.setState({
                data:this.state.data
            })
        }
    }
    /*************** Event end *****************/

    /*************** Methods begin *****************/
    init(data){
        if(data && data instanceof Array && data.length != 0){
            this._data = data;
            let cloneData = Tool.comp.cloneObj(data);
            let tmp = Tool.comp.addPrimaryAndCk(cloneData);
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

    getCheckedItem(){
        let res = Tool.comp.getCheckedItems(this.state.data,this.props.displayValue);
        if(res.items.length == 0){
            return null;
        }
        return {items:res.items[0],vals:res.vals[0]};
    }

    setCheckedItem(id){
        this.state.data.forEach(x=>{
            if(id == x[this.props.displayValue]){
                x._ck = true;
            }else{
                x._ck = false;
            }
        })
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
        return (
            this.state.data.length ==0?null:this.getCheckboxItems()
        )
    }
}

LeRadio.defaultProps = {
    displayName:"",
    displayValue:"",
    label:"",
    field:{}
}

LeRadio.propTypes = {
    displayName:PropTypes.string,
    displayValue: PropTypes.string,
    label:PropTypes.string,
    field:PropTypes.object
}
