
import React from 'react'
import {LeInput, LeButton, LeCheckbox, LeRadio,LeSelect} from "./out/index.js";
import Tool from "@core/tool.js";

export default class Demo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            value:"",
            value1:"a",
            value2:"b"
        }
    }

    dome(field,type,e){
        if(type == "change"){
            this.setState({
                [field]:e.target.value
            });
        }
        if(type == "enter"){
            console.log(id,event.target.value);
        }
        if(type == "click"){
            console.log(event.target.value);
        }
    }

    btnClick(e){
        console.log("clicked");
    }

    promiseFn(){
        console.log(1);
        return new Promise((resolve,reject)=>{
            resolve(1);
        })
    }

    componentDidMount(){
        let data = [
            {name:"aaa",id:"1",age:"1"},
            {name:"bbb",id:"2",age:"2"},
            {name:"ccc",id:"3",age:"3"}
        ];
        this.refs["ck1"].init(data);

        this.refs["rd1"].init(Tool.object.cloneObj(data));

        this.refs["select"].init(Tool.object.cloneObj(data));
     }

     changeCheckboxItem(data){
         console.log(data);
     }

    render(){
        return (
            <div>
                <div>---------Input-----------</div>
                <LeInput cb = {this.dome.bind(this)} field="value" placeholder="enter name" value={this.state.value} label="Name:"></LeInput>

                <LeInput cb = {this.dome.bind(this)} field="value1" placeholder="enter age" value={this.state.value1} label="Age:" ></LeInput>

                <div>---------Btn-----------</div>
                <LeButton value="ClickFn" click={(e)=>this.btnClick(e)}></LeButton>
                <LeButton value="SubmitFn" submit={()=>this.promiseFn()}></LeButton>

                <div>---------Checkbox-----------</div>
                <LeCheckbox change={this.changeCheckboxItem} ref='ck1' displayName="name" displayValue="id" label="请选择"></LeCheckbox>
                <LeButton value="Get" click={(e)=>{let res = this.refs.ck1.getCheckedItems();console.log(res)}}></LeButton>
                <LeButton value="Set" click={e=>{this.refs.ck1.setCheckedItems("1,2")}}></LeButton>

                <div>---------Radio-----------</div>
                <LeRadio change={this.changeCheckboxItem} ref='rd1' displayName="name" displayValue="id" label="请选择"></LeRadio>
                <LeButton value="Get" click={(e)=>{let res = this.refs.rd1.getCheckedItem();console.log(res)}}></LeButton>
                <LeButton value="Set" click={e=>{this.refs.rd1.setCheckedItem("1")}}></LeButton>

                <div>---------LeSelect-----------</div>
                <LeSelect multiple ref='select' displayName="name" displayValue="id"></LeSelect>
            </div>
        );
    }
}