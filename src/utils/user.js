const db = require("../db");

const getUserRoles = async (user_id) => {
  const sql_query = `
        SELECT a.role_id as id, r.role_name as name
        FROM assigned_roles a
            LEFT JOIN roles r on r.id = a.role_id
        WHERE user_id = $1
    `;
  const { rows } = await db.query(sql_query, [user_id]);
  return rows;
};

module.exports.getUserRoles = getUserRoles;
