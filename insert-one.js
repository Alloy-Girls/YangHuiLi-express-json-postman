var fs = require("fs");

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
    var newItem = getElement(item);
    if (typeof(newItem.barcode) !== "string" || typeof(newItem.name) !== "string" || typeof(newItem.unit) !== "string" || typeof(newItem.price) !== "number" || typeof(newItem.id) !== "number") {
        return;
    }
    else {
        return newItem;
    }
}

function insertOne(req, res) {
    var data = JSON.parse(fs.readFileSync("./items.json"));
    ID = ID + 1;
    req.body.id = ID;
    var correctType = judgeType(req.body);
    if (!correctType) {
        res.status(400).end();
    }
    else {
        data.push(correctType);
        res.status(200).json(correctType);
    }
    fs.writeFile("items.json", JSON.stringify(data), function (err) {
        if (err)
            throw err;
    });
}

exports.insertOne = insertOne;




