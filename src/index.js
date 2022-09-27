const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ------------------------------- CORS SETUP ------------------------------- //
const corsDomainsEnv = process.env.CORS_DOMAINS || "";
const corsWhitelist = corsDomainsEnv.split(",").map((item) => item.trim());
const corsConfig = {
  origin: function (origin, callback) {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// ------------------------------ EXPRESS SETUP ----------------------------- //
const app = express();
app.use(express.json());
app.use(express.text());
app.use(cors(corsConfig));
app.use(cookieParser());
const port = process.env.PORT;

// ----------------------------- NON API ROUTES ----------------------------- //
app.get("/", async (req, res) => {
  res.send("Hello World! Testing");
});

// ------------------------------- API ROUTES ------------------------------- //
app.use("/api/auth", require("./routes/auth/auth"));
app.use("/api/options/roles", require("./routes/options/roles"));
app.use("/api/options/lead-sources", require("./routes/options/lead-sources"));
app.use("/api/options/lead-status", require("./routes/options/lead-status"));
app.use("/api/options/phases", require("./routes/options/phases"));
app.use("/api/options/stories", require("./routes/options/stories"));
app.use(
  "/api/options/existing-system",
  require("./routes/options/existing-system")
);
app.use("/api/options/roof-types", require("./routes/options/roof-types"));
app.use("/api/options/roof-pitch", require("./routes/options/roof-pitch"));
app.use("/api/users", require("./routes/users/users"));
app.use("/api/users", require("./routes/users/id/user"));

const unknownEndpoint = async (request, response) => {
  response.status(404).send("Unknown Endpoint");
};
app.use(unknownEndpoint);

app.use(async (error, req, res, next) => {
  console.log("---------------------- Error ----------------------");
  console.log(
    "Time: ",
    new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })
  );
  console.log("Path: ", req.path);
  console.log("Request Body: ", req.body);
  console.error("Error: ", error.message);
  console.log("---------------------------------------------------");

  return res.status(500).send("Server error");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
