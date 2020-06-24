
import Tool from "@core/tool.js";
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import KEYS from "@comp/define.js";

export default class LeRadio extends React.Component{
    constructor(props){
        super(props);
        this._id = Tool._idSeed.newId();
        this._validataType = "radio";

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
            
            let items = this.getCheckedItems();
            this.props.change && this.props.change(items);
            this.setState({
                data:this.state.data
            })
        }
    }
    /*************** Event end *****************/

    /*************** Methods begin *****************/
    init(data){
        this._data = data;
        let cloneData = Tool.comp.cloneObj(data);
        let tmp = Tool.comp.addPrimaryAndCk(cloneData);
        this.setState({
            data:tmp
        })
    }

    setDisabled(flag){
        this.setState({
            disabled:flag
        })
    }

    getCheckedItems(){
        let res = Tool.comp.getCheckedItems(this.state.data,this.props.displayValue);
        if(res.items.length == 0){
            return null;
        }
        return {items:res.items[0],vals:res.vals[0]};
    }

    setCheckedItems(ids){
        this.state.data.forEach(x=>{
            let itemValue = x[this.props.displayValue];
            if(!x._ck){
                ids && ids.split && ids.split(',') && ids.split(',').forEach(id=>{
                    if(id == itemValue){
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

LeRadio.defaultProps = {
    displayName:"",
    displayValue:"",
    label:""
}

LeRadio.propTypes = {
    displayName:PropTypes.string,
    displayValue: PropTypes.string,
    label:PropTypes.string
}
