const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

router.get("/", authenticate, async (request, response, next) => {
  const { rows } = await db.query("SELECT * FROM lead_status");
  return response.status(200).json(rows);
});

module.exports = router;
