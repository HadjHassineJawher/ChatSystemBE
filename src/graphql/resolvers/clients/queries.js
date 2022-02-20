const Client = require("../../../database/models/client");
const bcrypt = require("bcryptjs/dist/bcrypt");
const {
  generateaccessToken,
  generaterefreshToken,
} = require("../../../helpers/tokens");

const ClientList = async () => {
  try {
    const clients = await Client.find();
    return clients;
  } catch (err) {
    throw err;
  }
};

const ClientLogin = async ({ email, password }) => {
  const client = await Client.findOne({ email: email });
  if (!client) {
    throw new Error("Client does not exist !!");
  }
  const isEqual = await bcrypt.compare(password, client.password);
  if (!isEqual) {
    throw new Error("Password is incorrect !!");
  }

  const token = generateaccessToken(client);
  const refreshtoken = generaterefreshToken(client);

  return {
    token: token,
    refreshtoken: refreshtoken,
  };
};

module.exports = {
  ClientList,
  ClientLogin,
};
