const express = require('express');
const path = require('path')

const app = express();

app.use(express.static(__dirname));
app.use(express.json())

const notes = [
  { title: 'rishav raj', text: 'rishav raj - 18-year-old aspiring founder and polymath from Patna, Bihar' },
  { title: 'Skills', text: 'Full-stack development (React, Next.js, TypeScript), AI/ML engineering, Product design, Business analysis' },
  { title: 'Projects', text: 'Building AI voice platforms (Eleven Labs clone), Open source contributions, Full-stack web applications' },
  { title: 'Learning Goals', text: 'System design, MLOps, Quantitative finance, Startup funding, Advanced full-stack engineering' },
  { title: 'Interests', text: 'Coffee, Chess, Sketching, Music, Gaming (Genshin Impact), Web series' },
  { title: 'Tools', text: 'VS Code, GitHub, Discord, React/Next.js ecosystem, Prisma, MLflow, DVC, Figma' },
  { title: 'Career Focus', text: 'Becoming a founder with combined skills in business analysis, product design, and AI engineering' }
];

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