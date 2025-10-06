const express = require('express');
const app = express();

app.get("/sum/:a/:b", function(req, res) {
let a = parseInt(req.params.a);
let b = parseInt(req.params.b);
let result = a+b;
res.json({result});
});

app.get("/sub/:a/:b", function(req, res) {
let a = parseInt(req.params.a);
let b = parseInt(req.params.b);
let result = a-b;
res.json({result});
});

app.get("/mul/:a/:b", function(req, res) {
let a = parseInt(req.params.a);
let b = parseInt(req.params.b);
let result = a*b;
res.json({result});
});

app.get("/div/:a/:b", function(req, res) {
let a = parseInt(req.params.a);
let b = parseInt(req.params.b);
let result = a/b;
res.json({result});
});

app.listen(3001);