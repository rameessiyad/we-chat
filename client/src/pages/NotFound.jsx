import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={4}
      textAlign="center"
    >
      <Heading as="h1" size="2xl" mb={4}>
        404 - Page Not Found
      </Heading>
      <Text fontSize="lg" mb={6}>
        Sorry, the page you are looking for does not exist.
      </Text>
      <Button colorScheme="teal" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
