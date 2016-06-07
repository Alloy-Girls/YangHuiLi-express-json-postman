var express = require("express");
var app = express();
var fs = require("fs");


function getLength(object) {
    var length = 0;
    var i;

    for (i in object)
        length++;

    return length;
}

function existSameId(id, data) {
    var exist = {};

    for (var i = 0; i < data.length; i++)
        if (data[i].id == id)
            exist = data[i];

    return exist;
}

function updateElement(item, existSameId) {
    var newItem = existSameId;

    newItem.name = item.name;
    newItem.barcode = item.barcode;
    newItem.unit = item.unit;
    newItem.price = item.price;

    return newItem;
}

function existId(data, id) {
    var exist;

    for (var i = 0; i < data.length; i++)
        if (data[i].id == id)
            exist = data[i];

    return exist;
}

function judgeType(item) {
    var valueType = {};

    valueType.id = typeof(item.id);
    valueType.barcode = typeof(item.barcode);
    valueType.name = typeof(item.name);
    valueType.unit = typeof(item.unit);
    valueType.price = typeof(item.price);

    return valueType;
}

function resolveErr(item, data, res) {
    var length = getLength(item);
    var valueType = judgeType(item);

    if (length < 5) {
        data.push(item);
        res.status(400).end();
    }
    else if (valueType.id != "number" || valueType.barcode != "string" || valueType.name != "string" || valueType.unit != "string" || valueType.price != "number") {
        res.status(400).end();
    }
    else {
        data.push(item);
        res.status(200).json(item);
    }

    return data;
}


app.put("/products/:id", function (req, res) {
    var item = req.body;
    item.id = req.params.id;
    var SameId;
    var exist = existId(data, item.id);
    fs.readFile("items.json", "utf-8", function (err, data) {
        if (err)
            throw err;
        else {
            data = JSON.parse(data);
            SameId = existSameId(item.id, data);
            if (SameId) {
                var newItem = updateElement(item, SameId);
                data = resolveErr(newItem, data, res);
            }
            else if (exist)
                res.status(404).end();
            else
                res.status(404).end();
        }
        fs.writeFile("items.json", JSON.stringify(data), function (err) {
            if (err)
                throw err;
        });
    });
});

module.exports = app;