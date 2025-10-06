const express = require('express');
const app = express();

app.get("/sum", function(req, res) {
let a = parseInt(req.query.a);
let b = parseInt(req.query.b);
let result = a+b;
res.json({result});
});

app.get("/sub", function(req, res) {
let a = parseInt(req.query.a);
let b = parseInt(req.query.b);
let result = a-b;
res.json({result});
});

app.get("/mul", function(req, res) {
let a = parseInt(req.query.a);
let b = parseInt(req.query.b);
let result = a*b;
res.json({result});
});

app.get("/div", function(req, res) {
let a = parseInt(req.query.a);
let b = parseInt(req.query.b);
let result = a/b;
res.json({result});
});

app.listen(3000);