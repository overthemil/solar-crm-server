const router = require("express-promise-router")();

const db = require("../../../db");
const { authenticate, authorize } = require("../../../middleware/auth");

router.get("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const sql_query = `
    SELECT * FROM files WHERE id = $1; 
  `;

  const { rows } = await db.query(sql_query, [id]);

  if (rows.length === 0) {
    return response.status(404).json({ message: "Not found" });
  }

  return response.status(200).json({ data: rows[0] });
});

router.delete(
  "/filepond/:id",
  authenticate,
  async (request, response, next) => {
    const { id } = request.params;

    const { rows: file_rows } = await db.query(
      "SELECT * FROM files WHERE pond_id = $1",
      [id]
    );
    if (file_rows.length === 0) {
      return response.status(404).json({ message: "Not found" });
    }

    const sql_query = `
    DELETE FROM files WHERE pond_id = $1; 
  `;
    await db.query(sql_query, [id]);

    return response.status(200).json({ message: "File deleted" });
  }
);

router.delete("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const { rows: file_rows } = await db.query(
    "SELECT * FROM files WHERE id = $1",
    [id]
  );
  if (file_rows.length === 0) {
    return response.status(404).json({ message: "Not found" });
  }

  const sql_query = `
    DELETE FROM files WHERE id = $1; 
  `;
  await db.query(sql_query, [id]);

  return response.status(200).json({ message: "File deleted" });
});

module.exports = router;
