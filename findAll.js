var express = require("express");
var app = express();
var fs = require("fs");

app.get("/products", function (req, res) {
    fs.readFile("items.json", "utf-8", function (err, data) {

        if (err)
            throw err;
        else
            res.status(200).json( JSON.parse(data) );
    });
});

module.exports = app;