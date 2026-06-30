const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

mongoose.connect("mongodb://localhost:27017/todos").then(() => console.log("Mongoose Connect"));

const UserSchema = new Schema({
    username : String,
    password : String
});

const TodoSchema = new Schema({
    title : String,
    description : String,
    userId : mongoose.Types.ObjectId,
});

const userModel = mongoose.model("user", UserSchema);
const todoModel = mongoose.model("todos", TodoSchema);

module.exports = {
    userModel: userModel,
    todoModel: todoModel
};