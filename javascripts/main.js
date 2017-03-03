/**
 * Created by tianqiubiao on 2017/3/1.
 */
//var utils = {};

var utils= function(sel,con){
    return new utils.fn.init(sel,con,roo)
};
//utils.fn=utils.prototype={};
//utils.fn.init.prototype=utils.fn;
utils.get=function(ele,par){
    var pre=null;
    par===undefined? par=document:null;
    if("querySelector" in document){
        if(/^( +|#)/.test(ele)){
            pre=par.querySelector(ele)
        }else if(/^( +|\.)/.test(ele)) {
            pre=par.querySelectorAll(ele)
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
};


utils.getCss = function (curELe, attr) {
    var val = reg = null;
    if ('getComputedStyle' in window) {
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
};
utils.setCss = function (curEle, attr, value) {
    if (attr === "float") {
        curEle["style"]["cssFloat"] = value;
        curEle["style"]["styleFloat"] = value;
        return;
    }
    if (attr === "opacity") {
        value > 1 ? value = 1 : null;
        value < 0 ? value = 0 : null;
        curEle["style"]["opacity"] = value;
        curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
        return
    }
    var reg = /^(width|height|(padding|margin(top|left|right|bottom))|top|right|left|bottom)$/;
    if (reg.test(attr)) {
        reg = /^-?\d+(\.\d+)?$/;
        if (reg.test(value)) {
            curEle['style'][attr] = value + 'px';
            return;
        }
    }
    curEle["style"][attr] = value;
};
utils.prev = function (curEle) {
    if ("previousElementSibling" in window) {
        return curEle.previousElementSibling;
    }
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
    }
    return pre;
};
utils.prevAll = function (curEle) {
    var ary = [], pre = prev(curEle);
    while (pre) {
        ary.unshift(pre);
        pre = prev(pre);
    }
    return ary
};
utils.next = function (curEle) {
    if ("nextElementSibling" in window) {
        return curEle.nextElementSibling;
    }
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.nextSibling;
    }
    return pre;
};
utils.nextAll = function (curEle) {
    var ary = [], pre = next(curEle);
    while (pre) {
        ary.unshift(pre);
        pre = prev(pre);
    }
    return ary
};
utils.par = function (curEle) {
    var pre = curEle.parentNode;
    while (pre && pre.nodeType !== 1) {
        pre = pre.parentNode;
    }
    return pre;
};
utils.child = function (curEle) {
    var pre = curEle.childNodes, ary = [];
    for (var i = 0, len = pre.length; i < len; i++) {
        if (pre[i] && pre[i].nodeType === 1) {
            ary.unshift(pre[i]);
        }
    }
    return ary;
};
utils.getIndex = function (curEle) {
    return this.prevAll(curEle).length;
};
utils.hasClass = function (curEle, name) {
    var reg = new RegExp("(?:^| +)" + name + "(?: +|$)");
    return reg.test(curEle.className);
};
utils.addClass = function (curEle, name) {
    if (!this.hasClass(curEle, name)) {
        curEle.className += '' + name;
    }
};
utils.removeClass = function (curEle, name) {
    if (this.hasClass(curEle, name)) {
        var reg = new RegExp("(?:^| +)" + name + "(?: +|)", g);
        curEle.className = curEle.className.repeat(reg, ' ');
    }
};
utils.keyEnter = function (fn, ele,type) {
    ele === undefined ? ele = document.body || docElem.documentElement : ele;
    type === undefined ? type = 'keyup' : type;
    ele.addEventListener(type, function (e) {
                             if (e.keyCode === 13)
                                 fn();
                             return false
                         });
};



function util(elem){
  util.prototype.elem=elem
    this.get(elem)
}
util.prototype={
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
        curEle= curELe=this.get(this.elem);
        console.log(curEle)
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
        curEle= curELe=this.get(this.elem);
        if ("previousElementSibling" in window) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    },
    next : function (curEle) {
        curEle= curELe=this.get(this.elem);
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
    var ary = [], pre = next(curEle);
    while (pre) {
        ary.unshift(pre);
        pre = prev(pre);
    }
    return ary
},
    par : function (curEle) {
        curEle=this.get(this.elem);
    var pre = curEle.parentNode;
    while (pre && pre.nodeType !== 1) {
        pre = pre.parentNode;
    }
    return pre;
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
        if (!this.hasClass(curEle, name)) {
            curEle.className += ' ' + name;
        }
        return this;
    },
    removeClass : function (name) {
     var   curEle= this.get(this.elem);
        if (this.hasClass(curEle, name)) {
            var reg = new RegExp("(?:^| +)" + name + "(?: +|)", 'g');
            curEle.className = curEle.className.repeat(reg, ' ');
        }
        return this
    },
    keyEnter : function (fn,type, curEle) {
        curEle==='document'? curEle=document: curELe=this.get(this.elem);
        type === undefined ? type = 'keyup' : type;
        curEle.addEventListener(type, function (e) {
            e=e||window.event;
            if (e.keyCode === 13)
                fn();
            return false
        });
    }
};
function d(elem){
    return new util(elem);
}