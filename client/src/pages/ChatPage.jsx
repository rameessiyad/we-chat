import axios from "axios";
import { baseUrl } from "../constants";
import { useEffect } from "react";

const ChatPage = () => {
  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/chat`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return <div>ChatPage</div>;
};

export default ChatPage;
