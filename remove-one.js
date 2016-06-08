var express = require("express");
var app = express();
var fs = require("fs");

var FILE_NAME = "items.json";

app.delete("/products/:id", function (req, res) {
//modify this function
    fs.readFile(FILE_NAME, "utf-8", function (err, data) {
        if (err)
            throw err;
        else {
            data = JSON.parse(data);
            var length = data.length;

            if (length == returnItemsCount(req.params.id,data))
                res.status(404).end();
            else{
                fs.writeFile(FILE_NAME, JSON.stringify(data), function (err) {
                    if (err)
                        throw err;
                    res.status(204).end();
                });
            }
        }
    });
});

function returnItemsCount(id,data){
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id)
            data.splice(i, 1);
    }

    return data.length;
}

module.exports = app;