const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

router.get("/", authenticate, async (request, response, next) => {
  const { rows } = await db.query(
    "SELECT id, status_name as label, colour FROM lead_status ORDER BY ord ASC"
  );
  return response.status(200).json({ data: rows });
});

module.exports = router;
