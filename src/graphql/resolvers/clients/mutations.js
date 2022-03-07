const Client = require("../../../database/models/client");
const bcrypt = require("bcryptjs");
const { createAccountMail, updateAccountMail } = require("../../../middlewares/mailer");

/**
 * Create a New Client.
*/

const CreateClient = async (args, req) => {
  console.log(args.input.username)
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

/**
 * Upadate Client details .
*/

const UpdateClient = async(args,req)=>{

  const _id = args.input._id;
  const client ={
    username: args.input.username,
    age: args.input.age,
    email: args.input.email,
    phone: args.input.phone,
  };

  try {
    const result = await Client.findByIdAndUpdate({_id: _id},{$set:client},{new:true});
    updateAccountMail(args.input.email);
    return result;
  } catch (err) {
    throw err;
  }

}

module.exports = { CreateClient,UpdateClient };
