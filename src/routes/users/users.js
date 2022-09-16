const express = require("express");

const db = require("../../db");
const router = express.Router();

router.get("/", async (request, response, next) => {
  const { active } = request.query;

  const getQuery = () => {
    if (active === "true") {
      return {
        sql_query:
          "SELECT * FROM users WHERE active=TRUE ORDER BY create_date ASC",
        values: [],
      };
    } else if (active === "false") {
      return {
        sql_query:
          "SELECT * FROM users WHERE active=FALSE ORDER BY create_date ASC",
        values: [],
      };
    }

    return {
      sql_query: "SELECT * FROM users ORDER BY create_date ASC",
      values: [],
    };
  };
  const { sql_query, values } = getQuery();
  const { rows } = await db.query(sql_query, values);
  return response.status(200).json(rows);
});

module.exports = router;
