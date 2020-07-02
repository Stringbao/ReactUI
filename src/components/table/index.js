
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

        this.state = {
            data:[],
            paging:{
                index:this._options.pageOption.index,
                size:this._options.pageOption.size,
                count:1,
            },
            ckAll:false,
            isLoading:false
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
                ckAll:false,
                isLoading:false
            }
        )
    }
    showLoading(flag){
        this.setState(
            {
                isLoading:flag
            }
        )
    }
    getData(index = 1){
        if(this.state.isLoading){
            return;
        }
        let url = this._options.getUrl();
        if(!url){
            this.setNull();
        }else{
            this.showLoading(true);
            let suffix = url.indexOf('?') === -1?"?":"&";
            let size = this._options.pageOption.size;
            url += suffix + this._options.pageOption.indexKey + "=" + index + "&"+ this._options.pageOption.sizeKey + "=" + size;

            Ajax.getFetch(url).then(data=>{
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
                        ckAll:false,
                        isLoading:false
                    });
                }else{
                    this.setNull();
                }
            }).catch(err=>{
                this.setNull();
            })
        }
    }
    resetCkStatus(flag){
        this.state.data.forEach(x=>{
            x._ck = false;
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
    gIndex=(index)=>{
        this.getData(index);
    }
    /*************** Event end     *****************/

    /*************** Methods begin *****************/
    headToParent = (flag)=>{
        this.resetCkStatus(flag);
        this.setState({
            ckAll:flag,
            data:this.state.data
        })
    }

    bodyToParent=(flag)=>{
        this.setState({
            ckAll:flag,
            data:this.state.data
        })
    }

    sizeToParent = (size)=>{
        this._options.pageOption.size = size;
        this.getData(1);
    }

    enterToParent=(index)=>{
        this._options.pageOption.index = index;
        this.getData(index);
    }

    prevToParent=(index)=>{
        this._options.pageOption.index = index;
        this.getData(index);
    }

    nextToParent=(index)=>{
        this._options.pageOption.index = index;
        this.getData(index);
    }

    search(flag){
        if(flag == undefined){
            this.getData();
        }else{
            this.getData(this._options.pageOption.index);
        }
    }

    /*************** Methods end   *****************/
    render(){
        return (
            <div>
                <table>
                    <Head ckAll={this.state.ckAll} options={this._options} headToParent={this.headToParent}></Head>
                    {/* <Body options={this._options} data={this.state.data} bodyToParent={this.bodyToParent}></Body> */}
                    
                </table>
                {/* <Paging prevToParent={this.prevToParent} nextToParent={this.nextToParent} paging={this.state.paging} enterToParent={this.enterToParent} sizeToParent = {this.sizeToParent}></Paging> */}
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
