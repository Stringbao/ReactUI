
import React from 'react';
import Tool from "@core/tool.js";
import PropTypes from 'prop-types';

export default class Bottom extends React.Component{
    constructor(props){
        super(props);
        this._needUpdate = false;
    }

    shouldComponentUpdate(props,state){
        if(this.props.show == props.show){
            let flag = Tool.object.equalsObject(this.props.data,props.data);
            if(!flag || this._needUpdate){
                this._needUpdate = false;
                return true;
            }
            return false;
        }
        return true;
    }

    notifyParent = (item)=>{
        this._needUpdate = true;
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

    componentDidMount(){
        Tool._event_publisher.on("leftchanged",()=>{
            this._needUpdate = true;
        })
    }

    getContainerShowStatus(){
        if(this.props.show == false){
            return false;
        }
        if(this.props.data.length > 0){
            return true;
        }
        return false;
    }

    render(){
        console.log("render bottom");
        return (
            <div style={{display:this.getContainerShowStatus()?'block':'none'}}>{this.getItems()}</div>
        )
    }
}

Bottom.defaultProps = {
    displayName:"",
    data:[],
    disabled:false,
    bottomCb:()=>{},
    show:false
}

Bottom.propTypes = {
    displayName:PropTypes.string,
    data: PropTypes.array,
    disabled:PropTypes.bool,
    show:PropTypes.bool,
    bottomCb:PropTypes.func
}
