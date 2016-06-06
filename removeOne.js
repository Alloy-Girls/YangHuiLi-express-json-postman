var express = require("express");
var app = express();
var fs = require("fs");

app.delete("/products/:id", function (req, res) {

    fs.readFile("items.json", "utf-8", function (err, data) {
        if (err)
            throw err;
        else {
            data = JSON.parse(data);
            var length = data.length;
            for (var i = 0; i < data.length; i++) {
                if (data[i]['id'] == req.params.id)
                    data.splice(i, 1);
            }
            if(length==data.length)
                res.status(404).end();
            else
                res.status(204).end();
            fs.writeFile("items.json", JSON.stringify(data), function (err) {
                if (err)
                    throw err;
            });
        }
    });
});

module.exports = app;