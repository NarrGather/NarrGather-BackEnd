const crypto = require("crypto");

const generateRandomToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};

module.exports = generateRandomToken;
