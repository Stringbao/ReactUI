import React from 'react';
import "./index.scss";
import Tool from "@core/tool.js";
import PropTypes from 'prop-types';
import Ajax from "@core/fetch.js";

export default class LeUpload extends React.Component{
    constructor(props){
        super(props);
        this._id = Tool._idSeed.newId();

        this._doUploading = false;

        this._value = "";
        this.state = {
            disabled:this.props.options.disabled == undefined?false:his.props.options.disabled,
            showError:false,
            srcs:[],
            names:[]
        }

        this._multiple = this.props.options.multiple == undefined?false:this.props.options.multiple;
    }

    /*************** 辅助函数 begin *****************/
    getItems(){
        if(this.state.srcs.length == 0){
            return null;
        }
        let html = [];
        this.state.srcs.forEach((x,idx)=>{
            html.push(<div key={idx}><a target="_blank" href={x}>{this.state.names[idx]}</a></div>)
        })
        return html;
    }
    uploadFile(fileList){
        if(this._doUploading){
            return;
        }
        let formData = new FormData();
        let names = [];
        for(let i=0;i<fileList.length;i++){
            formData.append(this.props.options.fname,fileList[i]);
            names.push(fileList[i].name);
        }
        this._doUploading = true;
        Ajax.uploadFetch(this.props.options.url, formData).then((result) => {
            let srcs = this.props.options.analysis?this.props.options.analysis(result):result;
            this.setState({
                showError:false,
                srcs:srcs.split(','),
                names:names
            })        
            this._doUploading = false;     
            this.props.options.successCallback && this.props.options.successCallback(result);
        }).catch((err) => {
            this._doUploading = false;
            this.setState({
                showError:true,
                srcs:[],
                names:[]
            })   
            this.props.options.errorCallback && this.props.options.errorCallback(err);
        });
        
    }
    /*************** 辅助函数 end   *****************/

    /*************** Event begin *****************/
    changeFile = (e)=>{
        let fileList = e.target.files;
        this.uploadFile(fileList);
    }
    /*************** Event end   *****************/

    /*************** 生命周期 begin *****************/
    componentDidMount(){
        
    }

    shouldComponentUpdate(props,state){
        return true;
    }

    /*************** 生命周期 end *****************/

    /*************** Methods begin *****************/
    setDiabled(flag){
        this.setState({
            disabled:flag
        });
    }
    setShowError(flag){
        this.setState({
            showError:flag
        });
    }
    /*************** Methods end   *****************/

    render(){
        return (
            <div>
                {this.getItems()}
                <label style={{display:this.props.options.label?'block':'none'}}>{this.props.options.label}</label>
                <input disabled={this.state.disabled} multiple={this._multiple} value={this._value} onChange={this.changeFile} type="file" />
                <span style={{display:this.props.options.tip?'block':'none'}} className="rules">{this.props.options.tip}</span>
                <span className="rules">{this.props.options.msg}</span>
            </div>
        )
    }
}

LeUpload.defaultProps = {
    options:{
        multiple:false,
        vtype:"",
        url:"",
        fname:"",
        tip:"",
        msg:"",
        label:"",
        disabled:false,
        analysis:(d)=>{
            return d.data;
        },
        successCallback:()=>{},
        errorCallback:()=>{}
    }
}

LeUpload.propTypes = {
    options:PropTypes.object
}
