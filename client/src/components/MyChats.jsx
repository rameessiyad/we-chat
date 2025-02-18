/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { baseUrl } from "../constants";

const MyChats = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const { user, selectedChats, setSelectedChats, chats, setChats } =
    ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${baseUrl}/api/v1/chat`, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return <div>MyChats</div>;
};

export default MyChats;
