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
/**
 * AUTH
 */
app.use("/api/auth", require("./routes/auth/auth"));

/**
 * OPTIONS
 */
app.use("/api/options/roles", require("./routes/options/roles"));
app.use("/api/options/lead-sources", require("./routes/options/lead-sources"));
app.use("/api/options", require("./routes/options/status"));
app.use("/api/options/phases", require("./routes/options/phases"));
app.use("/api/options/stories", require("./routes/options/stories"));
app.use(
  "/api/options/existing-system",
  require("./routes/options/existing-system")
);
app.use("/api/options/roof-types", require("./routes/options/roof-types"));
app.use("/api/options/roof-pitch", require("./routes/options/roof-pitch"));
app.use("/api/options/stock-types", require("./routes/options/stock-types"));
app.use("/api/options/states", require("./routes/options/states"));

/**
 * USERS
 */
app.use("/api/users", require("./routes/users/users"));
app.use("/api/users", require("./routes/users/id/user"));

/**
 * FILES
 */
app.use("/api/files", require("./routes/files/files"));
app.use("/api/files", require("./routes/files/id/file"));

/**
 * UPLOAD
 */
app.use("/api/upload", require("./routes/upload"));

/**
 * CUSTOMERS
 */
app.use("/api/customers", require("./routes/customers/customers"));
app.use("/api/customers", require("./routes/customers/id/customer"));

/**
 * STOCK
 */
app.use("/api/stock", require("./routes/stock/stock-list"));

/**
 * SERVICES
 */
app.use("/api/services", require("./routes/services/services"));
app.use("/api/services", require("./routes/services/id/service"));

/**
 * LEADS
 */
app.use("/api/leads", require("./routes/leads/leads"));
app.use("/api/leads", require("./routes/leads/id/lead"));

// ----------------------------- END API ROUTES ----------------------------- //

const unknownEndpoint = async (request, response) => {
  response.status(404).json({ message: "Unknown Endpoint" });
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

  return res.status(500).json({ message: "Server error" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
