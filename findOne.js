var express = require("express");
var app = express();
var fs = require('fs');

function existId(data, id) {
    var exist;

    for (var i = 0; i < data.length; i++)
        if (data[i].id == id)
            exist = data[i];

    return exist;
}

app.get("/products/:id", function (req, res) {
    fs.readFile("items.json", "utf-8", function (err, data) {
        var id = req.params.id;
        if (err)
            res.status(404).end();
        else {
            data = JSON.parse(data);
            var exist = existId(data, id);
            if (exist)
                res.status(404).json(exist);
            else
                res.status(404).end();
        }
    });
});

module.exports = app;