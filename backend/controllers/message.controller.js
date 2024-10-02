import { catchAsync } from "../utils/catchAsync.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = catchAsync(async (req, res, next) => {
  const { message } = req.body;
  const senderId = req.user._id;
  const receiverId = req.params.id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = new Conversation({
      participants: [senderId, receiverId],
    });
    await conversation.save();
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  await Promise.all([conversation.save(), newMessage.save()]);

  const socketId = getReceiverSocketId(receiverId);
  io.to(socketId).emit("newMessage", newMessage);

  res.status(201).send(newMessage);
});
export const getMessages = catchAsync(async (req, res, next) => {
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  if (!conversation) {
    return res.status(200).json([]);
  }

  const messages = conversation.messages;

  res.status(200).json(messages);
});
