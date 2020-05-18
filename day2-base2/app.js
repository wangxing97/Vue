
const http = require('http');
//这个核心模块可以帮我们解析URL地址，从而拿到pathname query
const urlModule = require('url');
const server = http.createServer();

server.on('request',function(req,resp){

    // const url = req.url;

    const {pathname: url, query} = urlModule.parse(req.url,true);
    console.log("pathname:"+url);

    console.log("query:"+ query.callback);
    
    if(url === '/getscript'){
        let data = {
            name: '王小星',
            age: 18,
            gender: '男'
        };

        let scriptStr = `${query.callback}(${JSON.stringify(data)})`;
        console.log("scriptStr:" + scriptStr);
        resp.end(scriptStr);
    }else{
        resp.end('404');
    }
})

server.listen(3000,function(){
    console.log("server listen at http://127.0.0.1:3000");
})