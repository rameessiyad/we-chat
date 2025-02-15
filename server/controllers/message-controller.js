const Chat = require("../models/chat-model");
const Message = require("../models/message-model");
const User = require("../models/user-model");
const asyncHandler = require("express-async-handler");

module.exports = {
  // @desc send a message
  // POST /api/v1/message
  // @access Private
  sendMessage: asyncHandler(async (req, res, next) => {
    const { content, chatId } = req.body;

    if (!content || !chatId)
      return next({ status: 400, message: "Invalid data" });

    let newMessage = {
      sender: req.user._id,
      content,
      chat: chatId,
    };

    try {
      let message = await Message.create(newMessage);

      message = await message.populate("sender", "name pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });

      await Chat.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message,
      });

      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }),

  // @desc fetch all messages
  // GET /api/v1/message/:chatId
  // @access Private
  fetchAllMessages: asyncHandler(async (req, res, next) => {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name pic email")
        .populate("chat");

      res.status(200).json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }),
};
