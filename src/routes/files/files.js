const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

router.get(
  "/",
  authenticate,
  authorize(["System Administrator", "Manager"]),
  async (request, response, next) => {
    const sql_query = `
        SELECT * FROM files; 
    `;

    const { rows } = await db.query(sql_query);

    return response.status(200).json(rows);
  }
);

router.post("/", authenticate, async (request, response, next) => {
  const { file_name, file_ext, file_path, pond_id } = request.body;

  const sql_query = `
    INSERT INTO files(file_name, file_ext, file_path, pond_id) 
        VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const { rows } = await db.query(sql_query, [
    file_name,
    file_ext,
    file_path,
    pond_id,
  ]);

  return response.status(201).json(rows[0]);
});

module.exports = router;
