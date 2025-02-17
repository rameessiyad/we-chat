/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FaSearch, FaBell, FaChevronDown } from "react-icons/fa";
import { ChatState } from "../../context/ChatProvider";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user } = ChatState();
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
          <Button variant="ghost">
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
            <MenuButton>
              <Button p={2}>
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user.name}
                  src={user.pic}
                />
                <FaChevronDown style={{ marginLeft: "5px" }} />
              </Button>
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;
