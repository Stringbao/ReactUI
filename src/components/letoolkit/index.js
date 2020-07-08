
import React from 'react';
import ReactDom from 'react-dom';

import loadable from '@loadable/component';
import CONFIG from "./config.js";

// import LeAlert from '@comp/alert/index.js';
const LeAlert = loadable(() => import('@comp/alert/index.js'))

let MessageManager = function(){
    this.init = function(){

    }

    this.factory = function(type){
        if(!MessageManager.prototype.hasOwnProperty(type) || typeof(MessageManager.prototype[type]) != "function"){
            // throw new Error(type+" doesnot exist");
            return;
        }
        //由工厂出去的实体，都会继承init方法
        MessageManager.prototype[type].prototype = new MessageManager();

        return MessageManager.prototype[type]();
    }
}

MessageManager.prototype.alert = function(){
    let Alert = function(){
        this._divDom = null;
        this._alert = null;
        this.getComp = ()=>{
            return <LeAlert ref={(comp)=>{this._alert = comp;}}></LeAlert>;
        }
        this.init = (parent)=>{
            this._divDom = document.createElement('div');
            document.body.appendChild(this._divDom);
            ReactDom.render(this.getComp(), this._divDom);
        }
        this.show = (msg)=>{
            this._alert.show(msg);
        }
    }
    return new Alert();
}

MessageManager.prototype.confirm = function(){

}

MessageManager.prototype.notify = function(){

}

class LeToolkit{
    constructor(){
        this._messageManager = new MessageManager();
        this._alert = this._messageManager.factory(CONFIG.MESSAGE.ALERT);
        this._confirm = this._messageManager.factory(CONFIG.MESSAGE.CONFIRM);    
        this._notify = this._messageManager.factory(CONFIG.MESSAGE.NOTIFY);    

        this._http = null;
    }
    
    init(){
        this._alert.init();
    }

    $alert(msg){
        this._alert.show(msg);
    }

    $get(){

    }
}

export default new LeToolkit();