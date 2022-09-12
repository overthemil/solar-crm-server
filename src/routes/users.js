const express = require("express");

const db = require("../db");
const router = express.Router();

router.get("/", async (request, response) => {
  db.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.log(error);
      return response.status(500).send("Server error");
    }

    return response.status(200).json(results.rows);
  });
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;

  db.query("SELECT * FROM users WHERE id=$1", [id], (error, results) => {
    if (error) {
      console.log(error);
      return response.status(500).send("Server error");
    }

    return response.status(200).json(results.rows[0]);
  });
});

module.exports = router;
