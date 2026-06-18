const express = require('express');
const jwt = require("jsonwebtoken");
const authMiddleware = require('./auth.js')
const path = require('path');

const app = express();

app.use(express.static(__dirname));
app.use(express.json());

const user = [
    { username: 'rishav', password: 'rishav1234' },
];

const notes = [
    { user: 'rishav', title: 'rishav raj', text: 'rishav raj - 18-year-old aspiring founder and polymath from Patna, Bihar' },
    { user: 'rishav', title: 'Skills', text: 'Full-stack development (React, Next.js, TypeScript), AI/ML engineering, Product design, Business analysis' },
    { user: 'rishav', title: 'Projects', text: 'Building AI voice platforms (Eleven Labs clone), Open source contributions, Full-stack web applications' },
    { user: 'rishav', title: 'Learning Goals', text: 'System design, MLOps, Quantitative finance, Startup funding, Advanced full-stack engineering' },
    { user: 'rishav', title: 'Interests', text: 'Coffee, Chess, Sketching, Music, Gaming (Genshin Impact), Web series' },
    { user: 'rishav', title: 'Tools', text: 'VS Code, GitHub, Discord, React/Next.js ecosystem, Prisma, MLflow, DVC, Figma' },
    { user: 'rishav', title: 'Career Focus', text: 'Becoming a founder with combined skills in business analysis, product design, and AI engineering' }
];

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/signin', function (req, res) {
    res.sendFile(path.join(__dirname, 'signin.html'));
});


app.post('/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = user.find(user => user.username === username);

    if (userExist) {
        return res.status(403).json({
            message: "UserName Already Exist."
        });
    };

    user.push({
        username: username,
        password: password
    });

    res.json({
        message: "User Created"
    });
});

app.post('/signin', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = user.find(user => user.username === username && user.password === password);

    if (!userExist) {
        res.status(403).json({
            message: "User Dosn't Exist!"
        });
        return;
    };

    const token = jwt.sign({
        username: username
    }, password);

    res.json({
        token: token
    });
});

app.post('/notes', authMiddleware, function (req, res) {
    const title = req.body.title;
    const text = req.body.text;

    const note = {
        user: req.username,
        title: title,
        text: text
    };

    notes.push(note);

    res.json({
        message: "Done!"
    });
});

app.get('/notes', authMiddleware, function (req, res) {
    const UserNotes = notes.filter(note => note.user === req.username);

    res.json({
        notes: UserNotes
    });
});

app.listen(3000);