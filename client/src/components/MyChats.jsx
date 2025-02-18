/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { baseUrl } from "../constants";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";

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

      setChats(data);
      // if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(loggedInUser);

  return (
    <Box
      display={{ base: selectedChats ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<IoMdAdd />}
        >
          New Group Chat
        </Button>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => selectedChats(chat)}
                cursor="pointer"
                bg={selectedChats === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChats === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat && loggedInUser
                    ? getSender(loggedInUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
