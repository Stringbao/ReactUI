
import React from 'react';
import Tool from "@core/tool.js";
import PropTypes from 'prop-types';

export default class Bottom extends React.Component{
    constructor(props){
        super(props);
    }

    notifyParent = (item)=>{
        this.props.bottomCb && this.props.bottomCb(item);
    }

    getItems(){
        let res = [];
        this.props.data.forEach(item => {
            res.push(
            <div key={item._tmpId} className={item._ck?'active':''} onClick={()=>{this.notifyParent(item)}}>{item[this.props.displayName]}</div>);
        });
        return res;
    }

    getContainerShowStatus(){
        if(this.props.data.length == 0){
            return false;
        }
        return this.props.show;
    }

    render(){
        console.log("render bottom");
        if(this.props.data.length == 0){
            return null;
        }
        return (
            <div style={{display:this.getContainerShowStatus()?'block':'none'}}>{this.getItems()}</div>
        )
    }
}

Bottom.defaultProps = {
    data:[],
    disabled:false,
    bottomCb:()=>{},
    displayName:"",
    show:false
}

Bottom.propTypes = {
    data: PropTypes.array,
    disabled:PropTypes.bool,
    bottomCb:PropTypes.func,
    displayName:PropTypes.string,
    show:PropTypes.bool
}
