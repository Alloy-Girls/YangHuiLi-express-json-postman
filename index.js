ID = 0;

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());  //body-parser 解析json格式数据

fs.exists('./items.json', function (exists) {
    if (!exists)
        fs.open('./items.json', 'a', function (err, fd) {
            if (err)
                console.log('创建文件失败');
            else {
                fs.writeFile('items.json', '[]', function (err) {
                        if (err)
                            throw err;
                    }
                );
            }
        });
});

app.use('/', require('./insert-one'));
app.use('/', require('./remove-one'));
app.use('/', require('./update-one'));
app.use('/', require('./find-one'));
app.use('/', require('./find-all'));

app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;



