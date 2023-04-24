let express = require('express');
let bodyparser = require('body-parser');
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(function middleware(req, res, next) {
    // Do something
    // Call the next function in line:
    var string = req.method + ' ' + req.path + ' - ' + req.ip;
    console.log(string);
    next();
});
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({
            message: 'Hello json'.toUpperCase(),
        });
    } else {
        res.json({
            message: 'Hello json',
        });
    }
});

app.get(
    '/now',
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.send({
            time: req.time,
        });
    }
);
app.get('/:word/echo', (req, res) => {
    const { word } = req.params;
    res.send({
        echo: word,
    });
});
app.get('/name', (req, res) => {
    // var firstName = req.query.first;
    // var lastName = req.query.last;
    var { first: firstName, last: lastName } = req.query;
    res.json({
        name: `${firstName} ${lastName}`,
    });
});
app.post('/name', (req, res) => {
    var string = req.body.first + ' ' + req.body.last;
    res.send({
        name: string,
    });
});
module.exports = app;
