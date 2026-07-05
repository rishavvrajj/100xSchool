const express = require("express");

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_o0t7wRGucJLm@ep-purple-paper-ao9r07b1-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
})

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const response = await pool.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}') RETURNING id;`);
    console.log(response);

    res.json({
        message: "Signup done",
        id: response.rows[0].id,
    }); 
});

app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const userExist = await pool.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}'`);
    console.log(userExist.rows[0]);

    res.json({
        msg : userExist.rows[0]
    })
})

app.listen(3000);