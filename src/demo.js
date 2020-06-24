
import React from 'react'
import {LeInput, LeButton, LeCheckbox, LeRadio} from "./out/index.js";
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

    

    getClick(num){
        if(num == 1){
            console.log(this.state.value);
        }else{
            console.log(this.state.value1);
        }
    }

    setClick(num){
        if(num == 1){
            this.setState({
                value:"yyyyy"
            })
        }else{
            this.setState({
                value1:"rrrrr"
            })
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

        window.setTimeout(()=>{
            this.refs["ck1"].setCheckedItems("1,2");

            console.log(this.refs["ck1"].getItemByField("name","aaa"));
        },3000)
     }

     changeCheckboxItem(data){
         console.log(data);
     }

    render(){
        return (
            <div>
                <LeInput cb = {this.dome.bind(this)} field="value" placeholder="enter name" value={this.state.value} label="Name:"></LeInput>

                <LeInput cb = {this.dome.bind(this)} field="value1" placeholder="enter age" value={this.state.value1} label="Age:" ></LeInput>

                <LeButton value="click" click={(e)=>this.btnClick(e)}></LeButton>
                <LeButton value="submit" submit={()=>this.promiseFn()}></LeButton>
                <input type="button" value="get1" onClick={e=>this.getClick(1)}></input>
                <input type="button" value="get2" onClick={e=>this.getClick(2)}></input>
                <br />
                <input type="button" value="set1" onClick={e=>this.setClick(1)}></input>
                <input type="button" value="set2" onClick={e=>this.setClick(2)}></input>


                <LeCheckbox change={this.changeCheckboxItem} ref='ck1' displayName="name" displayValue="id" label="请选择"></LeCheckbox>

                <LeRadio change={this.changeCheckboxItem} ref='rd1' displayName="name" displayValue="id" label="请选择"></LeRadio>
            </div>
        );
    }
}