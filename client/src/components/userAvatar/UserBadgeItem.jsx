/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant={"solid"}
      fontSize={12}
      bgColor={"purple.500"}
      color={"white"}
      cursor="pointer"
      onClick={handleFunction}
      display="flex"
      alignItems="center"
      gap={2}
    >
      {user.name}
      <IoMdClose onClick={handleFunction} />
    </Box>
  );
};

export default UserBadgeItem;
