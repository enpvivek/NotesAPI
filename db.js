const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://enpvivek:enpvivek@cluster0.pbqwcd8.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = () => {
 mongoose.connect(mongoURI, () => {
    console.log("Connected to MongoDB Successfully")
 })
};

module.exports = connectToMongo;