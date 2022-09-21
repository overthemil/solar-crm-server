const getUserSchema = (user, roles) => {
  const schema = {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    roles: roles,
    active: user.active,
    create_date: user.create_date,
    last_updated: user.last_updated,
  };
  return schema;
};

module.exports.getUserSchema = getUserSchema;
