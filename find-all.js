var fs = require("fs");

function findAll(req, res) {
    fs.readFile(fileName, "utf-8", function (err, data) {
        if (err)
            throw err;
        else
            res.status(200).json(JSON.parse(data));
    });
}

exports.findAll = findAll;