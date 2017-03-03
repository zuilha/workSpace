/**
 * Created by 田秋彪 on 2017/3/1.
 */
var http=require('http');
var url=require('url');
var fs=require('fs');
//数据库
var mongoose = require('mongoose');
//通信
var io = require('socket.io').listen(88);
io.sockets.on('connection',function(socket){
    socket.emit('news',{})
})