const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat-model");
const User = require("../models/user-model");
const Message = require("../models/message-model");

module.exports = {
  // @desc access chat
  // POST /api/v1/chat
  //access private
  accessChat: asyncHandler(async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) return next({ status: 400, message: "UserId required" });

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );

        res.status(200).json({
          success: true,
          data: fullChat,
        });
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  }),

  // @desc fetch chats
  // GET /api/v1/chat
  // @access Private
  fetchChats: asyncHandler(async (req, res, next) => {
    try {
      await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });

          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }),

  // @desc create group chat
  // POST /api/v1/chat/group
  // @access Private
  createGroupChat: asyncHandler(async (req, res, next) => {
    if (!req.body.users || !req.body.name)
      return next({ status: 400, message: "Please fill all the fields" });

    let users = JSON.parse(req.body.users);

    if (users.length < 2)
      return next({
        status: 400,
        message: "More than 2 users are required to create a group",
      });

    users.push(req.user);

    try {
      const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
      });

      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }),

  // @desc rename group chat
  // PATCH /api/v1/chat/rename
  // @access Private
  renameGroup: asyncHandler(async (req, res, next) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return next({ status: 404, message: "Chat not found" });
    } else {
      res.status(200).json(updatedChat);
    }
  }),

  // @desc add user to group chat
  // PATCH /api/v1/chat/groupadd
  // @access Private
  addtoGroup: asyncHandler(async (req, res, next) => {
    const { chatId, userId } = req.body;

    const added = Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      return next({ status: 404, message: "Chat not found" });
    } else {
      res.status(201).json({
        success: true,
        message: "user added",
        data: added,
      });
    }
  }),

  // @desc remove from group
  // PATCH /api/chat/groupremove
  // @access Private
  removeFromGroup: asyncHandler(async (req, res, next) => {
    const { chatId, userId } = req.body;

    const remove = Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!remove) {
      return next({ status: 404, message: "Chat not found" });
    } else {
      res.status(201).json({
        success: true,
        message: "User removed",
        data: remove,
      });
    }
  }),
};
