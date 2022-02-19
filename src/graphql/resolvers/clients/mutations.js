const Client = require("../../../database/models/client");
const bcrypt = require("bcryptjs");
const { createAccountMail } = require("../../../middlewares/mailer");

const CreateClient = async (args, req) => {
  const HashedPassword = await bcrypt.hash(args.input.password, 15);

  const client = new Client({
    username: args.input.username,
    age: args.input.age,
    email: args.input.email,
    phone: args.input.phone,
    password: HashedPassword,
  });

  try {
    const result = await client.save();
    createAccountMail(args.input.email);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { CreateClient };
