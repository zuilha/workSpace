/**
 * Created by 田秋彪 on 2017/3/1.
 */
    var http=require('http');
    var url=require('url');
    var fs=require('fs');

//数据库
//    var mongoose = require('mongoose');
//通信
//    var io = require('socket.io').listen(88);
    http.createServer(function(request,response){
        var urlObj =url.parse(request.url,true);
        var pathName= urlObj.pathname;
        var pathQuery=urlObj.query;
        var con=null;
        console.log(urlObj);
        if(pathName==='/'){
             con=fs.readFileSync('/workSpace/static-files/index.html');
            //var Jfile=fs.readFileSync('user.json');
            response.writeHead(200,{'content-type':'text/html'});
            //response.writeHead(200,{'content-type':'application/json'});
            response.end(con);
            //response.end(Jfile);
            return;
        }
//img
        if(/jbmp|jpg|png|tiff|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|ico/i.test(pathName)){
            var type=pathName.split('.');
            try {
                con=fs.readFileSync('/workSpace'+pathName);
                response.writeHead('200',{'content-type':type[1]});
                response.end(con);
            } catch (a){
                response.writeHead('404',{'content-type':type[1]});
                response.end();
            }
            return;
        }
//css
        if(/css/i.test(pathName)){
            try {
                con=fs.readFileSync('/workSpace'+pathName);
                response.writeHead('200',{'content-type':'text/css'});
                response.end(con);
            } catch (a){
                response.writeHead('404',{'content-type':'text/css'});
                response.end();
            }
            return;
        }
//js
        if(/js/i.test(pathName)){
            try {
                con=fs.readFileSync('/workSpace'+pathName);
                response.writeHead('200',{'content-type':'application/javascript'});
                response.end(con);
            } catch (a){
                response.writeHead('404',{'content-type':'application/javascript'});
                response.end();
            }
            return;
        }

        //登录
        if(pathName==='/index.html'){
            con=fs.readFileSync('/workSpace/static-files/index.html');
            //var Jfile=fs.readFileSync('user.json');
            response.writeHead(200,{'content-type':'text/html'});
            //response.writeHead(200,{'content-type':'application/json'});
            response.end(con);
            //response.end(Jfile);
            return;
                console.log(pathName)
        }



        //通信
        if(pathName === '/talk'){
            con=fs.readFileSync('/workSpace/static-files/index.html');
        }


        //console.log()
    }).listen(9999);


//数据库
//   mongoose.connect('mongodb://localhost/test');
//   var Cat = mongoose.model('Cat', { name: String });
//
//   var kitty = new Cat({ name: 'Zildjian' });
//   kitty.save(function (err) {
//       if (err) {
//           console.log(err);
//       } else {
//           console.log('meow');
//       }
//   });