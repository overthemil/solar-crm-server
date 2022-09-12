const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.text());
const port = 3000;

// ----------------------------- NON API ROUTES ----------------------------- //
app.get("/", (req, res) => {
  res.send("Hello World! Testing");
});

// ------------------------------- API ROUTES ------------------------------- //
app.use("/api/users", require("./routes/users"));

const unknownEndpoint = (request, response) => {
  response.status(404).send("Unknown Endpoint");
};
app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
