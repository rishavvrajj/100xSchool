const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { authMiddleware } = require("./AuthMiddleware")
const { userModel, organizatonModel } = require("./models");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = await userModel.findOne({
        username: username
    });

    if (userExist) {
        res.status(403).json({
            msg : "User Already Exist!"
        });
        return;
    };

    const newUser = await userModel.create({
        username: username,
        password: password
    });

    res.status(200).json({
        msg : "User Created !"
    });
});

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = await userModel.findOne({
        username : username
    });

    if (!userExist) {
        res.status(403).json({
            msg : "Username doesn't exist !"
        });
        return;
    };

    console.log(userExist);

    const token = jwt.sign({
        userId : userExist._id
    }, "password");

    res.status(200).json({
        token : token
    });
});

app.post("/organization", authMiddleware, async (req, res) => {
    const userId = req.userId;

    const title = req.body.title;
    const description = req.body.description;
    const admin = userId;

    const orgExist = organizatonModel.findOne({
        title : title
    });

    if (orgExist) {
        res.status(403).json({
            msg : "Organization Already Exists."
        });
        return;
    };

    const NewOrg = await organizatonModel.create({
        title: title,
        description: description,
        admin: admin,
        member: []
    });

    res.status(200).json({
        id : NewOrg._id,
        msg : "New Organization Created !"
    });
});

app.get("/organization", authMiddleware, async (req, res) => {
    const userid = req.userid;
    const organizatontitle = req.body.organizatontitle;

    const organization = await organizatonModel.findOne({
        title : organizatontitle
    });

    if (!organization) {
        res.status(403).json({
            msg : "Organization doesn't exist !"
        });
        return;
    };

    res.status(200).json({
        msg : organization
    })
})

app.delete("/organization", authMiddleware, async (req, res) => {
    const userId = req.userId;
});

app.post("/addmember", authMiddleware, async (req, res) => {
    const userId = req.userId;

    const organizationtitle = req.body.organizationtitle;
    const memberUsername = req.body.memberUsername;

    const organization = await organizatonModel.findOne({
        title : organizationtitle
    });

    if (!organization & organization.admin !== userId) {
          res.status(403).json({
            msg : "invalid credentials !"
          });
          return; 
    };

    const member = await userModel.findOne({
        username : memberUsername
    });

    if (!member) {
        res.status(403).json({
            msg : "member desn't exist !"
        });
        return;
    };

    await organizatonModel.updateOne({
        title: organizationtitle
    }, {
        "$push" : {
            "members" : member._id
        }
    });

    res.status(200).json({
        member,
        organization
    })
});

app.listen(3000);