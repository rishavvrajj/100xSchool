const express = require('express');
const path = require('path')

const app = express();

app.use(express.static(__dirname));
app.use(express.json())

const notes = [{ title: 'rishav raj', text: 'rishav raj' }];

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + 'index.html'))
});

app.post('/notes', function (req, res) {
    const title = req.body.title;
    const text = req.body.text;
    const note = {
        title: title,
        text: text
    }
    notes.push(note);

    res.json({
        message: "Done!"
    });
});

app.get('/notes', function (req, res) {
    res.json({
        notes: notes
    });
});

app.listen(3000);