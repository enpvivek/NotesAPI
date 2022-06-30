const connectToMongo = require("./db");
const express = require("express");

const app = express();
const PORT  = 3000;

connectToMongo();


app.get("/", (req, res) => {
    res.send("server started");
})

app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})

