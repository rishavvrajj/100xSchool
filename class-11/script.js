const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { authMiddleware } = require("./middleware");
const { todoModel, userModel } = require("./models");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const UserExist = await userModel.findOne({
        username : username,
        password : password
    });

    if (UserExist) {
        res.status(403).json({
            message : UserExist,
            message : "User Already Exist!"
        });
        return;
    };
    
    const newUser = await userModel.create({
        username : username,
        password : password,
    });
    
    res.json({
        id: newUser._id
    })
});

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const UserExist = await userModel.findOne({ username : username });

    if (!UserExist) {
        res.status(403).json({
            message : "User Dosn't Exist!"
        });
        return;
    };

    const token = jwt.sign({
     userId : UserExist._id
    }, "password")

    res.status(200).json({
        token : token
    })
});

app.post("/todos", authMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.userId;
    const status = false;

    const NewTodo = await todoModel.create({
        title: title,
        description: description,
        userId : userId
    })
    res.status(200).json({
        NewTodo: NewTodo
    })
});

app.get("/todos", authMiddleware, (req, res) => {

});

app.listen(3000);