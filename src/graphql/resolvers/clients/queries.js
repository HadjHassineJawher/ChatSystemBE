const Client = require("../../../database/models/client");

const ClientList = async () => {
  try {
    const clients = await Client.find();
    return clients;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  ClientList,
};
