const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/sum', function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  const sum = a + b;

  res.json({
    ans: sum
  });
});

app.post('/sub', function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  const sub = a - b;

  res.json({
    ans: sub
  });
});

app.post('/mul', function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  const mul = a * b;

  res.json({
    ans: mul
  });
});

app.post('/div', function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  const mul = a / b;

  res.json({
    ans: mul
  });
});

app.listen(5000);