const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./src/.env" });
/**
 * Generating AccessToken
 */
const generateaccessToken = async (client) => {
  const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
  const accesstoken = jwt.sign(
    { _id: client._id, email: client.email },
    `${ACCESS_TOKEN_SECRET_KEY}`,
    {
      expiresIn: "15min",
    }
  );
  return accesstoken;
};

/**
 * Generating RedfreshToken
 */
const generaterefreshToken = async (client) => {
  const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
  const refreshtoken = jwt.sign(
    { _id: client._id, email: client.email },
    `${REFRESH_TOKEN_SECRET_KEY}`
  );
  return refreshtoken;
};

module.exports = {
  generateaccessToken,
  generaterefreshToken,
};
