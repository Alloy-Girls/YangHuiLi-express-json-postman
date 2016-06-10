var fs = require("fs");

function returnItemsCount(id, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id)
            data.splice(i, 1);
    }

    return data.length;
}

function removeOne(req, res) {
    fs.readFile(fileName, "utf-8", function (err, data) {
        if (err)
            throw err;
        else {
            data = JSON.parse(data);
            var length = data.length;

            if (length == returnItemsCount(req.params.id, data))
                res.status(404).end();
            else {
                fs.writeFile(fileName, JSON.stringify(data), function (err) {
                    if (err)
                        throw err;
                    res.status(204).end();
                });
            }
        }
    });
}

exports.removeOne = removeOne;