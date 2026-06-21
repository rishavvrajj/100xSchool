const jwt = require("jsonwebtoken");
const express = require("express");
const { Authmiddleware } = require("./middleware")

const app = express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = [
    { id: 1, username: 'username', password: 'passworld' },
];

let userId = 1;

const organizations = [
    { id: 1, title: 'title', description: 'description', admin: 'admin', member: [1,2,3] },
];

let organizationId = 1;

const board = [
    { id: 1, title: 'title', boardid: 1 },
];

const issues = [
    { id: 1, title: 'title', boardid: 1, status : 'In_Progress' },
];

// All Post Request

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userExist = user.find(user => user.username === username);

    if (userExist) {
        res.status(411).json({
            message : 'User Already Exist.'
        });
        return;
    };

    user.push({
        id : userId++,
        username : username,
        password : password,
    });

    res.status(200).json({
        messages : 'User Created.'
    });
});

app.post('/signin', (req, res) => {
    const username = req.body.username; 
    const password = req.body.password; 
    const userExist = user.find(user => user.username === username && user.password === password);

    if (!userExist) {
        res.status(411).json({
            message : "Invalid credentials or User dosn't exist"
        });
        return;
    };

    const token = jwt.sign({
        userId : userExist.id
    }, "password");
    
    res.status(200).json({
        token
    });
});

app.post('/organization', Authmiddleware, (req, res) => {
    const userId = req.userId;

    const title = req.body.title;
    const description = req.body.description;
    const admin = userId

    organizations.push({
        id : organizationId++,
        title : title,
        description : description,
        admin : admin,
        members : []
    });

    res.status(200).json({
        messages : "Organization Created."
    });
});

app.post('/member', Authmiddleware, (req, res) => {
    const userId = req.userId;
    const orgTitle = req.body.title;
    const orgExist = organizations.find(org => org.title === orgTitle);
    
    const memberUsername = req.body.username;
    const memberExist = user.find(user => user.username === memberUsername);

    if (!orgExist || orgExist.admin !== userId){
        res.status(411).json({
            message : "Invalid Credentials"
        })
        return;
    };

    if (!memberExist) {
        res.status(411).json({
            message : "Invalid Credentials"
        });
        return;
    };

    orgExist.members.push(memberExist.id);

    res.json({
        message : "New Member Added."
    });
});

app.post('/board', Authmiddleware, (req, res) => {

});

app.post('/issue', Authmiddleware, (req, res) => {

});

// All Get Request

app.get('/boards', (req, res) => {

});

app.get('/issues', (req, res) => {

});

app.get('/Member', (req, res) => {

});

// All Put Request

app.put('/boards', (req, res) => {

});

app.put('/issues', (req, res) => {

});

// All Delete Request

app.delete('/Member', (req, res) => {

});

app.delete('/issues', (req,res) => {

});

app.delete('/boards', (req, res) => {

});




app.listen(3000);