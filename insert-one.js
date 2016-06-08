var express = require("express");
var app = express();
var fs = require("fs");

function buildLength(object) {
    var length = 0;
    var i;

    for (i in object)
        length++;

    return length;
}

function getElement(item) {
    var element = {};

    element.id = item.id;
    element.name = item.name;
    element.barcode = item.barcode;
    element.unit = item.unit;
    element.price = item.price;

    return element;
}

function judgeType(item) {

    if(typeof(item.barcode) === "string" && typeof(item.name) === "string" && typeof(item.unit) === "string" && typeof(item.price) === "number"){
        return true;
    }

}

function resolveErr(item, data, res) {
    var element;

    var length = buildLength(item);


    if(judgeType(item)){
        element = getElement(item);
        data.push(element);
        res.status(200).json(element);
    }
    else if(length<5){
        element = getElement(item);
        data.push(element);
        res.status(400).end();
    }
    else {
        res.status(401).end();
    }

    return data;
}

app.post("/products", function (req, res) {
    var item = req.body;

    fs.readFile("items.json", "utf-8", function (err, data) {
        if (err)
            throw err;
        else {
            data = JSON.parse(data);
            ID = ID + 1;
            item.id = ID;
            data = resolveErr(item, data, res);
            fs.writeFile("items.json", JSON.stringify(data), function (err) {
                if (err)
                    throw err;
            });
        }
    });
});

module.exports = app;