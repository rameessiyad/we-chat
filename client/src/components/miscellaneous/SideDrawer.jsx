/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FaSearch, FaBell, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const navigate = useNavigate();

  const { user } = ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        width="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip hasArrow placement="bottom" label="Search Users to chat">
          <Button variant="ghost" onClick={onOpen}>
            <FaSearch size={20} />
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          We-Chat
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <FaBell />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} p={2}>
              <HStack spacing="5px">
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user.name}
                  src={user.pic}
                />
                <FaChevronDown />
              </HStack>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
