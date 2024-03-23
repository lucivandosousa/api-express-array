const bcrypt = require("bcrypt");

const saltRounds = 10;

const encoded = async (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const compared = async (password, valid_password) => {
  return bcrypt.compareSync(password, valid_password);
};

module.exports = {
  encoded,
  compared,
};
