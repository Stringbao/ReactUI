
import React from 'react';
import Tool from "@core/tool.js";
import PropTypes from 'prop-types';

export default class Left extends React.Component{
    constructor(props){
        super(props);
    }

    notifyParent = (item)=>{
        Tool._event_publisher.broadcast("leftchanged");
        this.props.leftCb && this.props.leftCb(item);
    }   

    getItems(){
        let res = [];
        this.props.data.forEach(item => {
            res.push(
            <span key={item._tmpId}>{item[this.props.displayName]}
                <i onClick={e=>{this.notifyParent(item)}}>del</i>
            </span>);
        });
        return res;
    }

    shouldComponentUpdate(props,state){
        return !Tool.object.equalsObject(this.props.data,props.data);
    }

    render(){
        console.log("render left");
        if(Tool.comp.checkArrayNull(this.props.data)){
            return null;
        }
        return (
            <div>{this.getItems()}</div>
        )
    }
}

Left.defaultProps = {
    displayName:"",
    data:[],
    disabled:false,
    leftCb:()=>{}
}

Left.propTypes = {
    displayName:PropTypes.string,
    data: PropTypes.array,
    disabled:PropTypes.bool,
    leftCb:PropTypes.func
}
