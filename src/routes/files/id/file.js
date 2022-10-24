const router = require("express-promise-router")();
const AdmZip = require("adm-zip");

const db = require("../../../db");
const { authenticate, authorize } = require("../../../middleware/auth");

const uploadPath = process.env.UPLOAD_PATH || "files/";

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

router.get("/download/:id", authenticate, async (request, response) => {
  const { id } = request.params;

  try {
    const sqlQuery = `
            SELECT *
            FROM files WHERE id=$1;
        `;
    const values = [id];
    const { rows } = await db.query(sqlQuery, values);

    const file = `${uploadPath}${rows[0].file_path}`;
    return response.download(file);
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Error retrieving file", log: error });
  }
});

router.get("/download-multiple", authenticate, async (request, response) => {
  if (!request.query.files) {
    return response.status(400).send("Missing files IDs");
  }

  try {
    // Remove null values and empty string
    const files_uuid = Object.values(request.query.files);
    const files = Object.values(
      Object.fromEntries(
        Object.entries(files_uuid).filter(
          ([_, v]) => v !== null && v !== "" && v !== "null"
        )
      )
    );

    const sqlQuery = `
            SELECT *
            FROM files WHERE id = ANY($1);
        `;
    const values = [files];
    const { rows } = await db.query(sqlQuery, values);

    const zip = new AdmZip();

    rows.forEach((file) => {
      zip.addLocalFile(`${uploadPath}${file.file_path}`, "", file.file_name);
    });

    const zipFile = `${uploadPath}files.zip`;
    zip.writeZip(zipFile);
    return response.download(zipFile);
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Error retrieving file", log: error });
  }
});

module.exports = router;
