const Client = require("../../../database/models/client");
const bcrypt = require("bcryptjs/dist/bcrypt");
const {
  generateaccessToken,
  generaterefreshToken,
} = require("../../../helpers/tokens");

/**
 *  All client List.
*/

const ClientList = async () => {
  try {
    const clients = await Client.find();
    return clients;
  } catch (err) {
    throw err;
  }
};

/**
 * Client by ID.
 */

const ClientbyID = async ({id}) => {
  try {
    const client = await Client.findById(id);
    return client;
  } catch (err) {
    throw err;
  }
};

/**
 * Client LogIn.
 */

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
  ClientbyID
};
