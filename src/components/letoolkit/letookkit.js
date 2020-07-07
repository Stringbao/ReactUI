
import React from 'react';
import ReactDom from 'react-dom';
import Loadable from 'react-loadable';

// const LeAlert = Loadable({
//     loader:() => import('@comp/alert/index.js'),
//     loading:()=><div></div>
// });


import LeAlert from '@comp/alert/index.js';

let AlertFactory = {
    _divDom:null,
    _alert:null,
    getComp(){
        return <LeAlert ref={(comp)=>{this._alert = comp;}}></LeAlert>
    },
    init(parent){
        this._divDom = document.createElement('div');
        document.body.appendChild(this._divDom);
        ReactDom.render(this.getComp(), this._divDom);
    },
    show(msg){
        this._alert.show(msg);
    }
}

export default AlertFactory;