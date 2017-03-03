/**
 * Created by tianqiubiao on 2017/3/2.
 */
function zero(elem){
    zero.prototype.elem=elem;
    this.get(elem)
}
zero.prototype={
    get:function(ele,par){
        ele=this.elem;
        var pre=null;
        par===undefined? par=document:null;
        if("querySelector" in document){
            if(/^( +|#)/.test(ele)){
                pre=par.querySelector(ele)
            }else if(/^( +|\.)/.test(ele)) {
                pre=par.querySelector(ele)
            }else {
                pre=par.querySelectorAll(ele)
            }
        }else {
            if(/^( +|#)/.test(ele)){
                ele=ele.replace('#','');
                pre=document.getElementById(ele);
            }else if(/^( +|\.)/.test(ele)){
                ele=ele.replace('.','');
                pre=par.getElementsByClassName(ele);
            }else {
                pre=par.getElementsByTagNameNS(ele);
            }
        }
        return pre;
    },
    getCss:function (attr,curELe) {
        curELe=this.get(this.elem);
        var val = reg = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curELe, null)[attr]
        } else {
            if (attr === 'opacity') {
                val = curELe.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curELe.currentStyle[attr];
            }
        }
        return val;
    },
    setCss: function (attr, value,curEle) {
        curEle=this.get(this.elem);
        var reg = /^(width|height|(padding|margin(top|left|right|bottom))|top|right|left|bottom)$/;
        if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;

        }
        else if (attr === "opacity") {
            value > 1 ? value = 1 : null;
            value < 0 ? value = 0 : null;
            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";

        }
        else if (reg.test(attr)) {
            reg = /^-?\d+(\.\d+)?$/;
            if (reg.test(value)) {
                curEle['style'][attr] = value + 'px';
                return;
            }else {
                curEle["style"][attr] = value;
            }
        }
        return this;
    },
    prev: function (curEle) {

        curEle ===undefined? curEle=this.get(this.elem):curEle;
        if ("previousElementSibling" in window) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    },
    prevAll : function (curEle) {
        curEle= curELe=this.get(this.elem);
    var ary = [], pre = this.prev(curEle);
    while (pre) {
        ary.unshift(pre);
        pre =this. prev(pre);
    }
    return ary
},
    next : function (curEle) {
        curEle ===undefined? curEle=this.get(this.elem):curEle;
        if ("nextElementSibling" in window) {
            return curEle.nextElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.nextSibling;
        }
        return pre;
    },
    nextAll : function (curEle) {
        curEle= curELe=this.get(this.elem);
        var ary = [], pre =this. next(curEle);
        while (pre) {
            ary.unshift(pre);
            pre =this. prev(pre);
        }
        return ary
    },
    par : function (curEle) {
        curEle=this.get(this.elem);
        var pre = curEle.parentNode;
        while (pre && pre.nodeType !== 1) {
            pre = pre.parentNode;
        }
        return  this;
    },
    child : function () {
        var   curEle= this.get(this.elem);
        var pre = curEle.childNodes, ary = [];
        for (var i = 0, len = pre.length; i < len; i++) {
            if (pre[i] && pre[i].nodeType === 1) {
                ary.unshift(pre[i]);
            }
        }
        return ary;
    },
    getIndex : function () {
        var   curEle= this.get(this.elem);
        return this.prevAll(curEle).length;
    },
    hasClass : function ( name) {
        var curEle=this.get(this.elem);
        var reg = new RegExp("(?:^| +)" + name + "(?: +|$)");
        return reg.test(curEle.className);
    },
    addClass : function (name) {
        var  curEle=this.get(this.elem);
        if (!this.hasClass( name)) {
            curEle.className += ' ' + name;
        }
        return  this;
    },
    removeClass : function (name) {
        var   curEle= this.get(this.elem);
        if (this.hasClass(name)) {
            var reg = new RegExp("(?:^| +)" + name + "(?: +|)",'g');
            curEle.className = curEle.className.replace(reg, ' ');
        }
        return  this;
    },
    keyEnter : function (fn,type, curEle) {
        curEle===undefined? curEle=document: curELe=this.get(this.elem);
        type === undefined ? type = 'keyup' : type;
        curEle.addEventListener(type, function (e) {
            e=e||window.event;
            if (e.keyCode === 13)
                fn();
            return false
        });
        return  this
    }
};
function $(elem){
    return new zero(elem);
}