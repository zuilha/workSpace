/**
 * Created by 田秋彪 on 2017/3/1.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");

var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    var pathquery = urlObj.query;
    if (pathname === "/getInfo") {
        var count = pathquery.count;
        var page = pathquery.page;

        var data = fs.readFileSync("./data.json", "utf8");
        data = JSON.parse(data);
        var totalPage = Math.ceil(data.length / count);
        var ary = [];
        for (var i = (page - 1) * count; i <= page * count - 1; i++) {
            var cur = data[i];
            if (i > (data.length - 1)) {
                break;
            }
            ary.push(cur);
        }
        var res = {
            "totalPage": totalPage,
            "list": ary
        };
        response.writeHead(200, {'content-type': 'application/json'});
        response.end(JSON.stringify(res));
        return;
    }
    if (pathname==='/date'){
        var date=new Date;
        response.writeHead(200, {'content-type': 'application/date'});
        response.end(data)
        return;
    }

    if (pathname === "/countdown.html") {
        var con = fs.readFileSync("./index.html", "utf8");
        response.writeHead(200, {'content-type': 'text/html'});
        response.end(con);
        return;
    }
    //if (pathname === "/detailInfo") {
    //    var num = pathquery.num;
    //    con = fs.readFileSync("./data.json", "utf8");
    //    con = JSON.parse(con);
    //
    //    var obj = null;
    //    for (var i = 0; i < con.length; i++) {
    //        var cur = con[i];
    //        if (cur.num == num) {
    //            obj = cur;
    //            break;
    //        }
    //    }

    //response.writeHead(200, {'content-type': 'application/json'});
    //response.end(JSON.stringify(obj));
    //return;
    //}
});
server.listen(8888);
