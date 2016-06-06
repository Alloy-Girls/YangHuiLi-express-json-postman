ID = 0;

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: false
}));

fs.exists('./items.json', function (exists) {
    if (!exists)
        fs.open('./items.json', 'a', function (err, fd) {
            if (err)
                console.log('创建文件失败')
            else {
                fs.writeFile('items.json', '[]', function (err) {
                        if (err)
                            throw err;
                    }
                );
            }
        });
});

var insertOne = require('./insertOne');
var removeOne = require('./removeOne');
var updateOne = require('./updateOne');
var findOne = require('./findOne');
var findAll = require('./findAll');

app.use('/', insertOne);
app.use('/', removeOne);
app.use('/', updateOne);
app.use('/', findOne);
app.use('/', findAll);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;



