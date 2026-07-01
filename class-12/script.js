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

    const organizatontitle = req.body.organizatontitle;
    const description = req.body.description;
    const admin = userId;

    const organizationExist = await organizatonModel.findOne({
        title : organizatontitle
    });

    if (organizationExist) {
        res.status(403).json({
            msg : "Organization Already Exists."
        });
        return;
    };

    const NewOrg = await organizatonModel.create({
        title: organizatontitle,
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
    const userId = req.userId;

    const organization = await organizatonModel.find({
        admin : userId
    });

    console.log(organization)

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

    const organizationtitle = req.body.organizationtitle;
    
    const organizationExist = await organizatonModel.findOne({
        title : organizationtitle
    });

    if (!organizationExist && organizationExist.admin != userid) {
        res.status(403).json({
            msg : "Organization Doesn't Exist or Invalid Credentials!"
        });
        return;
    };

    await organizatonModel.deleteOne({
        title : organizationtitle
    });

    res.status(200).json({
        msg : "Successfully deleted !",
        organization : deletedorganization
    })
});

app.post("/member", authMiddleware, async (req, res) => {
    const userId = req.userId;

    const organizationtitle = req.body.organizationtitle;
    const memberUsername = req.body.memberUsername;

    const organizationExist = await organizatonModel.findOne({
        title : organizationtitle
    });

    if (!organizationExist || organizationExist.admin != userId) {
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

    const organization = await organizatonModel.updateOne({
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

app.delete("/member", authMiddleware, async (req, res) => {
    const userid = req.userid;

    const organizationtitle = req.body.organizationtitle;
    const memberUsername = req.body.memberUsername;

    const memberExist = await userModel.findOne({
        username : memberUsername
    });

    if (!memberExist) {
        res.status(403).json({
            msg : "Username Doesn't exist !"
        });
        return;
    };

    const memberId = memberExist._id;

    const organizationExist = await organizatonModel.findOne({
        title : organizationtitle
    });

    if (!organizationExist && organizationExist.admin != userid) {
        res.status(403).json({
            msg : "organization doesn't exist ! or you don't have access to this Org."
        });
        return;
    };

    const organizationId = organizationExist._id;

    const deleteMember = await organizatonModel.updateOne({
        _id: organizationId
    }, {
            "$pull": {
                members: memberId
            }
    });

    res.status(200).json({
        member : deleteMember,
        msg : "member removed !"
    })
});

app.listen(3000);