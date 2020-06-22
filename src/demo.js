
import React from 'react'
import {LeInput, LeButton} from "./out/index.js";

export default class Demo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            value:"",
            value1:"a",
            value2:"b"
        }
    }

    componentDidMount(){
       
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
            let tmp = {};
            tmp[field] = e.target.value;
            this.setState(tmp);
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

    render(){
        return (
            <div>
                <LeInput cb = {this.dome.bind(this)} field="value" placeholder="enter name" value={this.state.value} label="Name:"></LeInput>

                <LeInput cb = {this.dome.bind(this)} field="value1" placeholder="enter age" value={this.state.value1} label="Age:" ></LeInput>

                {/* <LeButton value="click" click={(e)=>this.btnClick(e)}></LeButton> */}
                <LeButton value="submit" submit={()=>this.promiseFn()}></LeButton>
                <input type="button" value="get1" onClick={e=>this.getClick(1)}></input>
                <input type="button" value="get2" onClick={e=>this.getClick(2)}></input>
                <br />
                <input type="button" value="set1" onClick={e=>this.setClick(1)}></input>
                <input type="button" value="set2" onClick={e=>this.setClick(2)}></input>
            </div>
        );
    }
}