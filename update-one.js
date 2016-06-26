var fs = require("fs");

function existId(data, id) {

    for (var i = 0; i < data.length; i++)
        if (data[i].id == id) {
            return data[i];
        }
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
    var newItem = getElement(item);
    if (typeof(newItem.barcode) !== "string" || typeof(newItem.name) !== "string" || typeof(newItem.unit) !== "string" || typeof(newItem.price) !== "number" || typeof(newItem.id) !== "number") {
        return;
    }
    else {
        return newItem;
    }
}

function updateOne(req, res) {
    var item = req.body;
    item.id = JSON.parse(req.params.id);
    var data = JSON.parse(fs.readFileSync("./items.json"));
    var exist = existId(data, item.id);
    var correctType = judgeType(item);
    if (!correctType) {
        res.status(400).end();
    }
    else if (!exist)
        res.status(404).end();
    else {
        data.push(correctType);
        res.status(200).json(correctType);
    }
    fs.writeFile("items.json", JSON.stringify(data), function (err) {
        if (err)
            next(err);
    });
}

exports.updateOne = updateOne;