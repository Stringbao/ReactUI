
import React from 'react'
import {LeInput, LeButton, LeCheckbox, LeRadio, LeSelect, AutoCompleted,TableList, LeUpload, AlertFactory} from "./out/index.js";
import Tool from "@core/tool.js";
import Ajax from "@core/fetch.js";

//aaaa|b|c
//c,aa
//return aaaa|b|d|
function compareCode(orginCode,newCode){
    var originArr = orginCode.split('|');
    var newArr = newCode.split(',');
    var temp = [];
    originArr.forEach(function(x){
        var exist = false;
        newArr.forEach(function(xx){
            if(x == xx){
                exist = true;
            }
        })
        if(!exist){
            temp.push(x);
        }
    });
    return temp;
}
compareCode("aaaa|b|c","c,aa")

export default class Demo extends React.Component{
    constructor(props){
        super(props);

        AlertFactory.init(this);

        this.state = {
            value:"",
            value1:"a",
            value2:"b"
        }
        this._radioSelect = "";

        this.tableOptions = {
            showCk: true,
            single: false,
            map: [
                { key: "partnerId", val: "<#BP ID#>",convert:this.comb },
                { key: "bpname", val: "<#BP Name#>"},
                { key: "account", val: "<#Email#>" },
                { key: "custId", val: "<#Customer Id#>" },
                { key: "groupName", val: "<#group Name#>" },
                { key: "userType", val: "<#user Type#>" },
                { key: "company", val: "<#company#>" },
            ],
            getUrl: () => {
                return "/admin/accountAPI/admin/group/getusergroups";
            },
            pageOption: {
                sizeKey: "pageSize",
                indexKey: "pageNum",
                index: 1,
                size: 10
            },
            actions: [
                {
                    key: "update",
                    val: "<#编辑#>",
                    action: this.edit,
                }
            ],
            analysis: data => {
                if (data && data.data) {
                    return {
                        data: data.data.rows,
                        count: data.data.total
                    };
                } else {
                    return {
                        data: [],
                        count: 0
                    };
                }
            }
        }

        this._uploadSrcs = {src:""};
        this.uploadOpts = {
            field:{context:this,key:"_uploadSrcs.src"},
            label:"上传头像",
            multiple:true,
            vtype:"png,jpg",
            size:"2",
            url:"/admin/file/img/upload",
            fname:"file",
            msg:"上传头像必须为xxx格式",
            tip:"提示：图片格式为png",
            analysis:(d)=>{
                return d.data;
            },
        }
    }

    comb(item){
        if(item.id > 500){
            return <span style={{color:'Red'}}>{item.id}</span>;
        }else{
            return <span style={{color:'green'}}>{item.id}</span>;
        }
        
    }

    edit(item){
        debugger
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

    //  changeCheckboxItem(data){
    //     console.log(data);
    //  }

    analysis(data){
        return data;
    }

    enterItem(item){
        console.log(item._index);
    }

    btnLogin(){
        let uid = "wupeng5";
        let pwd = "Chen19910208aaa";
        Ajax.postFetch("/admin/login",{userid:uid,password:pwd,lang:"en",code:""}).then(res=>{
            Tool.cookie.setCookie("jid",res.data.jid);
            Tool.cookie.setCookie("tid",res.data.tid);
            Tool.cookie.setCookie("userName",res.data.uname);
            Tool.cookie.setCookie("userid",uid);
        }).catch(err=>{
                
        })
    }

    btnTableSearch(){
        this.refs.table.search(true);
    }

    showAlert(){
        AlertFactory.show("this is me!!!");
    }

    render(){
        return (
            <div>
                <div>---------Login-----------</div>
                <LeButton value="Login" click={(e)=>this.btnLogin(e)}></LeButton>
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
                <LeRadio field={{context:this,key:"_radioSelect"}} change={this.changeCheckboxItem} ref='rd1' displayName="name" displayValue="id" label="请选择"></LeRadio>
                <LeButton value="Get" click={(e)=>{let res = this.refs.rd1.getCheckedItem();console.log(res)}}></LeButton>
                <LeButton value="Set" click={e=>{this.refs.rd1.setCheckedItem("1")}}></LeButton>
                <LeButton value="Submit" click={e=>{console.log(this._radioSelect)}}></LeButton>

                <div>---------LeSelect-----------</div>
                <LeSelect multiple change={(data)=>{console.log(data)}} ref='select' displayName="name" displayValue="id"></LeSelect>
                <LeButton value="Get" click={(e)=>{let res = this.refs.select.getCheckedItems();console.log(res)}}></LeButton>
                <LeButton value="Set" click={e=>{this.refs.select.setCheckedItems("1,2")}}></LeButton>

                <div>----------AutoCompleted------------------</div>
                <AutoCompleted enter={this.enterItem} url="/suggest?keyword=" displayName="resultCount" analysis={this.analysis}></AutoCompleted>
            
                <div>----------TableList------------------</div>
                <TableList ref='table' options={this.tableOptions}></TableList>
                <LeButton value="Search" click={(e)=>this.refs.table.search(true)}></LeButton>
                <LeButton value="Get" click={(e)=>{let res = this.refs.table.getSelectItems("id");console.log(res);}}></LeButton>

                <div>----------Upload------------------</div>
                <LeUpload options={this.uploadOpts}></LeUpload>

                <div>----------Alert------------------</div>
                <LeButton value="ShowAlert" click={this.showAlert}></LeButton>
            </div>
        );
    }
}