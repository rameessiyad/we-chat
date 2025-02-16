/* eslint-disable no-unused-vars */
import axios from "axios";
import { baseUrl } from "../constants";
import { useEffect } from "react";
import { ChatState } from "../context/ChatProvider";

const ChatPage = () => {
  const { user } = ChatState();
  return <div>ChatPage</div>;
};

export default ChatPage;
