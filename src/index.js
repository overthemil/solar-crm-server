const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.text());
const port = 3000;

// ----------------------------- NON API ROUTES ----------------------------- //
app.get("/", async (req, res) => {
  res.send("Hello World! Testing");
});

// ------------------------------- API ROUTES ------------------------------- //
app.use("/api/options/roles", require("./routes/options/roles"));
app.use("/api/users", require("./routes/users/users"));
app.use("/api/users", require("./routes/users/id/user"));

const unknownEndpoint = async (request, response) => {
  response.status(404).send("Unknown Endpoint");
};
app.use(unknownEndpoint);

app.use(async (error, req, res, next) => {
  console.log("---------------------- Error ----------------------");
  console.log("Path: ", req.path);
  console.log("Request Body: ", req.body);
  console.error("Error: ", error.message);
  console.log("---------------------------------------------------");

  return res.status(500).send("Server error");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
