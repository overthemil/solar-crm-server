const router = require("express-promise-router")();

const db = require("../../../db");
const { authenticate, authorize } = require("../../../middleware/auth");

router.get("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const sql_query = `
    SELECT *
    FROM installers 
    WHERE id = $1
  `;

  const { rows } = await db.query(sql_query, [id]);
  if (rows.length === 0) {
    return response.status(404).json({ message: "Installer not found" });
  }

  return response.status(200).json({ data: rows[0] });
});

router.patch("/:id", authenticate, async (request, response) => {
  const {
    accreditation,
    licence,
    full_name,
    email,
    phone,
    expiry,
    address,
    disabled,
  } = request.body;
  const { id } = request.params;

  const sql_query = `
      UPDATE installers SET
        accreditation = COALESCE($1, accreditation),
        licence = COALESCE($2, licence),
        full_name = COALESCE($3, full_name),
        email = COALESCE($4, email),
        phone = COALESCE($5, phone),
        expiry = COALESCE($6, expiry),
        address = COALESCE($7, address),
        disabled = COALESCE($8, disabled)
      WHERE id=$9 RETURNING *;
    `;
  const sql_values = [
    accreditation,
    licence,
    full_name,
    email,
    phone,
    expiry,
    address,
    disabled,
    id,
  ];
  const { rows } = await db.query(sql_query, sql_values);

  return response.status(200).json({ data: rows[0] });
});

router.get("/:id/files", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const sql_query = `
    SELECT f.id, f2.file_name, f2.file_ext
    FROM installer_files f
        LEFT JOIN files f2 on f2.id = f.file_id
    WHERE f.installer_id = $1 ORDER BY f2.create_date ASC;
  `;

  const { rows } = await db.query(sql_query, [id]);

  return response.status(200).json({ data: rows });
});

router.post("/:id/files", authenticate, async (request, response, next) => {
  const { id } = request.params;
  const { file_id } = request.body;

  const sql_query = `
    INSERT INTO installer_files(file_id, installer_id) 
    VALUES ($1, $2) RETURNING *;
  `;

  const { rows } = await db.query(sql_query, [file_id, id]);

  return response.status(200).json({ data: rows });
});

router.delete(
  "/:id/files/:file",
  authenticate,
  async (request, response, next) => {
    const { id, file } = request.params;

    const sql_query = `
    DELETE FROM installer_files WHERE id = $1 AND installer_id = $2
  `;

    await db.query(sql_query, [file, id]);

    return response.status(200).json({ message: "File deleted" });
  }
);

module.exports = router;
