const express = require('express');
const bcrypt = require('bcrypt');
const z = require('zod');

const { Pool } = require('pg');

const pool  = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_o0t7wRGucJLm@ep-purple-paper-ao9r07b1-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})

const app = express();
app.use(express.json());

const signupSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
    email: z.email()
})

app.post("/signup", async (req, res) => {
    const { data, success, error } = signupSchema.safeParse(req.body);

    if (!success) {
        res.status(403).json({
            msg : "Incorrect inputs",
            error : JSON.parse(error)[0].message
        })
        return;
    }

    const username = data.username;
    const email = data.email;
    const password = data.password;

    const hasedPassword = await bcrypt.hash(password, 10);

    const response = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hasedPassword])

    res.status(200).json({
        msg: "signup done"
    })
});

app.post("/signin", async (req, res) => {
    const { data, success, error } = signupSchema.safeParse(req.body);

    if (!success) {
        res.status(403).json({
            msg : "Incorrect inputs",
            error : JSON.parse(error)[0].message
        })
        return;
    }

    const email = data.email;
    const password = data.password;

    const hasedPassword = await bcrypt.hash(password, 10);

    const response = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    const userExist = response.rows[0];

    if (!userExist) {
        res.status(403).json({
            msg : "invalid Cred !"
        });
        return;
    } else {
        const correctpassword = await bcrypt.compare(password, userExist.password);
        if (correctpassword) {
            res.json({
                token : "ajuiwhgkjdghsfjhsgfjk"
            });
        } else { 
            res.status(403).json({
                msg : "invalid Cred !"
            });
            return;
        }
    };

    res.status(200).json({
        msg: "signin done"
    })
})

app.listen(3000);