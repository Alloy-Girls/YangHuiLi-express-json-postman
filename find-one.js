var fs = require('fs');

function existId(data, id) {

    for (var i = 0; i < data.length; i++)
        if (data[i].id == id) {
            return data[i];
        }
}

function findOne(req, res) {
    fs.readFile(fileName, "utf-8", function (err, data) {
        var id = req.params.id;
        if (err)
            throw err;
        else {
            data = JSON.parse(data);
            var exist = existId(data, id);
            if (exist)
                res.status(200).json(exist);
            else
                res.status(404).end()
        }
    });
}

exports.findOne = findOne;
