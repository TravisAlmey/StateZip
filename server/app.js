const http = require('http');
let express = require('express');
let cors = require('cors');

const mockData = {
    "Alabama": [35004, 35203],
    "California": [90028, 90210],
    "Wisconsin": [53203, 53715]
};

const port = 3000;
const httpOK = 200;
const httpError = 500;
const errorMessage = "Invalid state zip combination submitted."

let app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json(mockData);
});

app.post('/', (req, res) => {
    let selection = {
        state: req.body.state,
        zip: req.body.zip
    };

    let isValid = validateRequest(selection);

    if (isValid) {
        res.status(httpOK).json(req.body);
    } else {
        res.status(httpError).send(errorMessage);
    }
});

app.listen(port, function () {
    console.log(`CORS-enabled web server listening on port ${port}`)
  });

function validateRequest(selection) {

    if (!selection || !selection.state || !selection.zip) {
        return false;
    }

    const validZips = mockData[selection.state];
    

    return validZips.includes(+(selection.zip))
}
