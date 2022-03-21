const Client = require("../../../database/models/client");
const bcrypt = require("bcryptjs");
const { createAccountMail, updateAccountMail } = require("../../../middlewares/mailer");
const { GraphQLError } = require("graphql");
const { resetCodeMail, resetPasswordMail } = require("../../../middlewares/mailer");
const Codes = require("../../../database/models/resetCode");

/**
 * Create a New Client.
*/

const CreateClient = async (args, req) => {
  const HashedPassword = await bcrypt.hash(args.input.password, 15);

  const userExist = await Client.findOne({ email: args.input.email })
  if (userExist) return new GraphQLError("Account Exist, Try with another E-mail !!");
  
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
    // console.log(err)
    return new GraphQLError("Something whent Wrong !!");
  }
};

/**
 * Upadate Client details .
*/

const UpdateClient = async(args,req)=>{

  const _id = args.input._id;
  const client = {
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
    // console.log(err)
    return new GraphQLError("Something whent Wrong while Updating !!");
  }
}

/**
* Generating & Saving a Password Reset Code .
*/
  const ResetCode = async ({email}) => {
    try {
      const userExist = await Client.findOne({ email: email })
      if (!userExist) return new GraphQLError("Account Does not Exist, Try another E-mail !!");
      
      /**
       * Generating a 6 digit Reset Code.
      */
      const ResetCode = Math.floor(100000 + Math.random() * 900000);
      const codeExist = await Codes.findOne({ email: email });

      if (!codeExist) {
        const NewCode = new Codes({
          user: userExist._id,
          email: email,
          resetcode: ResetCode
        });
        try {
          const result = await NewCode.save();
          resetCodeMail(email, ResetCode);
        } catch (err) {
          console.log(err)
        }
      } else {
        const updateCode = {
          user: userExist._id,
          email: email, 
          resetcode: ResetCode
        }
        try {
          const result = await Codes.findByIdAndUpdate({ _id: codeExist._id }, { $set: updateCode }, { new: true });
          resetCodeMail(email, ResetCode);
        } catch (err) {
          console.log(err)
        }
      }
      return "Code Sent Successfully";

    } catch (err) {
      console.log(err)
    }
}

/**
* Password Reset.
*/
const ResetPassword = async ({code,newPassword}) => {
  const codeExist = await Codes.findOne({ resetcode: code });
  const HashedPassword = await bcrypt.hash(newPassword, 15);
  if (codeExist) {
    try {
    const updatePassword = await Client.findOneAndUpdate({ _id: codeExist.user }, { $set: { 'password': HashedPassword } }, { new: true })
    resetPasswordMail(updatePassword.email)
    } catch (err) {
      console.log(err)
    }
    return ("Password Reset Successfully .")
  } else {
    return new Error("Invalid Reset Code !!, Check your code in the E-mail and try again.")
  }
 
}

module.exports = {CreateClient,UpdateClient,ResetCode,ResetPassword};
