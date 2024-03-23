const bcrypt = require("bcrypt");

const saltRounds = 10;

const encoded = async (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const compared = async (password, valid_password) => {
  return bcrypt.compareSync(myPlaintextPassword, exemplo_db);
};

module.exports = {
  encoded,
  compared,
};
