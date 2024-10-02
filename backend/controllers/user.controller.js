import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import Conversation from "../models/conversation.model.js";

export const getUsers = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // // Find all conversations where the current user is a participant
  // const conversations = await Conversation.find({
  //   participants: { $in: [userId] },
  // }).select("participants"); // Only fetch the participants

  // // Get a list of user IDs from those conversations (excluding the current user's ID)
  // const participantIds = conversations.flatMap((convo) =>
  //   convo.participants.filter(
  //     (participant) => participant.toString() !== userId.toString()
  //   )
  // );

  // // Find the users by their IDs
  // const users = await User.find({ _id: { $in: participantIds } });

  const users = await User.find({ _id: { $ne: userId } });

  // Return the users
  res.json(users);
});
