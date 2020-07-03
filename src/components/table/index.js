
import Tool from "@core/tool.js";
import Ajax from "@core/fetch.js";
import React from 'react';
import PropTypes from 'prop-types';
import "./index.scss";
import Head from "./head.js";
import Body from "./body.js";
import Paging from "./paging.js";

export default class TableList extends React.Component{
    constructor(props){
        super(props);

        this._options = this.props.options;

        //第一次渲染 不加载组件
        this._isInit = false;
        //控制tabel组件的重复查询
        this._isLoading = false;

        this.state = {
            data:[],
            paging:{
                index:this._options.pageOption.index,
                size:this._options.pageOption.size,
                count:1,
            },
            ckAll:false
        }
    }

    /*************** 辅助函数 begin *****************/
    setNull(){
        this.setState(
            {
                data:[],
                aging:{
                    index:this._options.pageOption.index,
                    size:this._options.pageOption.size,
                    count:1,
                },
                ckAll:false
            }
        )
        this._isLoading = false;
    }
    getData(index = 1){
        if(this._isLoading){
            return;
        }
        let url = this._options.getUrl();
        if(!url){
            this.setNull();
        }else{
            this._isLoading = true;
            let suffix = url.indexOf('?') === -1?"?":"&";
            let size = this._options.pageOption.size;
            url += suffix + this._options.pageOption.indexKey + "=" + index + "&"+ this._options.pageOption.sizeKey + "=" + size;

            Ajax.getFetch(url).then(data=>{
                this._isInit = true;
                let res = this._options.analysis(data);
                if(!Tool.comp.checkArrayNull(res.data)){
                    let arr = Tool.comp.addPrimaryAndCk(res.data);
                    this.setState({
                        data:arr,
                        paging:{
                            index:index,
                            size:size,
                            count:res.count,
                        },
                        ckAll:false
                    });
                }else{
                    this.setNull();
                }
                this._isLoading = false;
            }).catch(err=>{
                this.setNull();
            })
        }
    }
    resetCkStatus(flag){
        this.state.data.forEach(x=>{
            x._ck = flag;
        })
    }
    /*************** 辅助函数 end   *****************/
    
    /*************** 生命周期 begin *****************/
    componentDidMount(){
        this.search();
    }
    /*************** 生命周期 end   *****************/

    /*************** Event begin   *****************/
    prev=()=>{
        let index = this._options.pageOption.index;
        index--;
        this.getData(index);
    }
    next=()=>{
        let index = this._options.pageOption.index;
        index++;
        this.getData(index);
    }

    headToParent = (flag)=>{
        this.resetCkStatus(flag);
        this.setState({
            ckAll:flag,
            data:this.state.data
        })
    }

    bodyToParent=(type,flag)=>{
        if(type=="checkbox"){
            this.setState({
                ckAll:flag,
                data:this.state.data
            })
        }else{
            debugger
            if(flag._ck){
                return;
            }
            this.resetCkStatus(false);
            flag._ck = true;
            this.setState({
                ckAll:false,
                data:this.state.data
            })
        }
    }

    sizeToParent = (size)=>{
        this._options.pageOption.size = size;
        this._options.pageOption.index = 1;
        this.getData(1);
    }

    prevToParent=(index)=>{
        this._options.pageOption.index = index;
        this.getData(index);
    }

    nextToParent=(index)=>{
        this._options.pageOption.index = index;
        this.getData(index);
    }
    /*************** Event end     *****************/

    /*************** Methods begin *****************/
    search(flag){
        if(flag == undefined){
            this.getData();
        }else{
            this.getData(this._options.pageOption.index);
        }
    }

    getSelectItems(field){
        return Tool.comp.getCheckedItems(this.state.data,field);
    }
    /*************** Methods end   *****************/
    render(){
        if(!this._isInit){
            return null;
        }
        return (
            <div>
                <table>
                    <Head ckAll={this.state.ckAll} options={this._options} headToParent={this.headToParent}></Head>
                    <Body options={this._options} data={this.state.data} bodyToParent={this.bodyToParent}></Body>
                </table>
                <Paging prevToParent={this.prevToParent} nextToParent={this.nextToParent} paging={this.state.paging} sizeToParent = {this.sizeToParent}></Paging>
            </div>
        )
    }
}

TableList.defaultProps = {
    options:{
        showCk:false,
        single:false,
        map:[],
        getUrl:()=>{return ""},
        pageOption:{
            sizeKey:"pageSize",
            indexKey:"pageNum",
            index:1,
            size:10
        },
        actions:[]
    },
}

TableList.propTypes = {
    options:PropTypes.object
}
