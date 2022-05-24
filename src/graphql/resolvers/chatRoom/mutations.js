
const chatRoom = require("../../../database/models/chatRoom");
const { GraphQLError } = require("graphql");
/**
 * Create a New ChatRoom.
*/

const CreateChatRoom = async (args, req) => {
    
    const chatroom = new chatRoom({members:[args._id1 , args._id2]});
    try {
        const result = await chatroom.save();
        return result;
    } catch (err) {
        throw err
    }
};

const UpdateChatRoomMessage = async (args, req)=>{
    const idChatRoom= args.id
  const idMessage = args.idMessage
  
    //getting the previous result
    const chatroom =   await chatRoom.findById(idChatRoom)
  
     //updating  the new message list 
    const chat_room= {
        members: chatroom.members,
        messages:[idMessage],
    };
    
    //sending update request 
    try {
        const result = await chatRoom.findByIdAndUpdate({_id: idChatRoom},{$set:chat_room},{new:true});
      
        return result;
      } catch (err) {   
        return new GraphQLError("Something whent Wrong while Updating ChatRoom !!");
      }

}

const DeleteChatRoomMessage = async (args, req)=>{
    
    const idChatRoom= args.input.id
    const idMessage= args.input.idMessage
    
    //getting the previous result
    const chatroom =   await chatRoom.findById(idChatRoom)


    const updatedList = chatroom.messages.filter((value)=>{
         return value != idMessage;
    })

    //  console.log("new  messages",updatedList)
  
     //updating the the the new message list 
    const chat_room= {
        members: chatroom.members,
        messages:updatedList,
    };
    
    //sending update request 
    try {
        const result = await chatRoom.findByIdAndUpdate({_id: idChatRoom},{$set:chat_room},{new:true});
      
        return result;
      } catch (err) {
       
        return new GraphQLError("Something whent Wrong while deleting message id!!");
       
      }

}


const DeleteChatRoomUser = async (args, req)=>{
    
    const idChatRoom= args.input.id
    const idUser= args.input.idUser
    
    //getting the previous result
    const chatroom =   await chatRoom.findById(idChatRoom)


    const updatedList = chatroom.members.filter((value)=>{
         return value != idUser;
    })

    //  console.log("new  messages",updatedList)
  
     //updating the the the new message list 
    const chat_room = {
        members: updatedList,
        messages:chatroom.messages,
    };
    
    //sending update request 
    try {
        const result = await chatRoom.findByIdAndUpdate({_id: idChatRoom},{$set:chat_room},{new:true});
      
        return result;
      } catch (err) {
       
        return new GraphQLError("Something whent Wrong while deleting User id!!");
       
      }

}

module.exports = {CreateChatRoom,UpdateChatRoomMessage,DeleteChatRoomMessage,DeleteChatRoomUser};


