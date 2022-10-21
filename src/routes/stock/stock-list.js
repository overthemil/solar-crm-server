const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

router.get("/", authenticate, async (request, response, next) => {
  const sql_query = `
    SELECT s.id,
        s.stock_type   as type_id,
        st.option_name as type,
        s.brand,
        s.series,
        s.model,
        s.active,
        s.datasheet,
        s.warranty,
        s.count
    FROM stock_item s
        LEFT JOIN stock_types st on s.stock_type = st.id
    ORDER BY brand, series, model;
  `;

  const { rows } = await db.query(sql_query);

  return response.status(200).json({ data: rows });
});

router.get("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const sql_query = `
    SELECT s.id,
        s.stock_type   as type_id,
        st.option_name as type,
        s.brand,
        s.series,
        s.model,
        s.active,
        s.datasheet,
        s.warranty,
        s.count
    FROM stock_item s
        LEFT JOIN stock_types st on s.stock_type = st.id
    WHERE s.id = $1
    ORDER BY brand, series, model;
  `;

  const { rows } = await db.query(sql_query, [id]);

  return response.status(200).json({ data: rows });
});

router.post(
  "/",
  authenticate,
  authorize([
    "System Administrator",
    "General Manager",
    "Operations Manager",
    "Operations",
    "Warehouse",
    "Accounts",
  ]),
  async (request, response, next) => {
    const { type, brand, series, model } = request.body;

    const { rows } = await db.query(
      "INSERT INTO stock_item(stock_type, brand, series, model) VALUES ($1, $2, $3, $4) RETURNING *",
      [type, brand, series, model]
    );

    return response.status(201).json({ data: rows[0] });
  }
);

router.patch(
  "/:id",
  authenticate,
  authorize([
    "System Administrator",
    "General Manager",
    "Operations Manager",
    "Operations",
    "Warehouse",
    "Accounts",
  ]),
  async (request, response) => {
    const { type, brand, series, model, active, datasheet, warranty, count } =
      request.body;
    const { id } = request.params;

    const sql_query = `
      UPDATE stock_item SET
        stock_type = COALESCE($1, stock_type),
        brand = COALESCE($2, brand),
        series = COALESCE($3, series),
        model = COALESCE($4, model),
        active = COALESCE($5, active),
        datasheet = COALESCE($6, datasheet),
        warranty = COALESCE($7, warranty),
        count = COALESCE($8, count)
      WHERE id=$9 RETURNING *;
    `;
    const sql_values = [
      type,
      brand,
      series,
      model,
      active,
      datasheet,
      warranty,
      count,
      id,
    ];
    const { rows } = await db.query(sql_query, sql_values);

    return response.status(200).json({ data: rows[0] });
  }
);

module.exports = router;
