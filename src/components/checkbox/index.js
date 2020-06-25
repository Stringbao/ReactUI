
import Tool from "@core/tool.js";
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import KEYS from "@comp/define.js";

export default class LeCheckbox extends React.Component{
    constructor(props){
        super(props);
        this._id = Tool._idSeed.newId();
        this._type = "checkbox";

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
                    <span><input type="checkbox" checked={x._ck} onChange={()=>{this.changeItem(x)}}></input></span>
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
        item._ck = !item._ck;
        let items = this.getCheckedItems();
        this.props.change && this.props.change(items);
        this.setState({
            data:this.state.data
        })
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

    getCheckedItems(){
        let res = Tool.comp.getCheckedItems(this.state.data,this.props.displayValue);
        return res;
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

LeCheckbox.defaultProps = {
    displayName:"",
    displayValue:"",
    label:""
}

LeCheckbox.propTypes = {
    displayName:PropTypes.string,
    displayValue: PropTypes.string,
    label:PropTypes.string
}
