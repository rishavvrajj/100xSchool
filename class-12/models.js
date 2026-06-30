const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/trello").catch(console.log("mongoose Connected!"));

const userSchema = mongoose.Schema({
    username: String,
    password: String
});

const orgSchema = mongoose.Schema({
    title: String,
    description: String,
    admin: mongoose.Types.ObjectId,
    members: [mongoose.Types.ObjectId]
});

const userModel = mongoose.model("users", userSchema);
const organizatonModel = mongoose.model("organization", orgSchema);

module.exports = {
    userModel,
    organizatonModel
};