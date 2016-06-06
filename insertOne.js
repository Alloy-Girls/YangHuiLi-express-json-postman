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
    var valueType = {};

    valueType.id = typeof(item.id);
    valueType.barcode = typeof(item.barcode);
    valueType.name = typeof(item.name);
    valueType.unit = typeof(item.unit);
    valueType.price = typeof(item.price);

    return valueType;
}

function resolveErr(item, data, res) {
    var element;

    var length = buildLength(item);
    var valueType = judgeType(item);
    if (length < 5) {
        element = getElement(item);
        data.push(element);
        res.status(401).end();
    }
    else if (valueType.id != "number" || valueType.barcode != "string" || valueType.name != "string" || valueType.unit != "string" || valueType.price != "number") {
        res.status(401).end();
    }
    else {
        element = getElement(item);
        data.push(element);
        res.status(201).json(element);
    }

    return data;
}

app.post("/products", function (req, res) {
    var item = req.body;

    fs.readFile("items.json", "utf-8", function (err, data) {
        if (err)
            throw err;
        else {

            if (data === "[]") {
                data = JSON.parse(data);
                ID = ID + 1;
                item.id = ID;
                data = resolveErr(item, data, res);
            }
            else {
                data = JSON.parse(data);
                ID = ID + 1;
                item.id = ID;
                data = resolveErr(item, data, res);

            }
            fs.writeFile("items.json", JSON.stringify(data), function (err) {
                if (err)
                    throw err;
            });
        }
    });
});

module.exports = app;