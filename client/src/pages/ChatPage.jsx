/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { baseUrl } from "../constants";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";

const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {/* {user && <SideDrawer />} */}
      <Box>
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
