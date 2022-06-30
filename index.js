const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("server started");
});

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
