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

/**
 * Check if user has any of the roles passed to the function
 * @param user
 * @param {[String]} roles
 */
const userHasRole = (user, roles) => {
  const has_role = user.roles.some((a) => roles.includes(a.name));
  return has_role;
};

module.exports.getUserRoles = getUserRoles;
module.exports.userHasRole = userHasRole;
