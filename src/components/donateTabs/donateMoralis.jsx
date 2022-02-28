import { useMoralis } from "react-moralis";
import {
    Box,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";

export default function DonateMoralis() {
    const { authenticate, isAuthenticated, user } = useMoralis();

  return (
    <Box>
        <Text>
            Sign In With Moralis
        </Text>
        <Button onClick={authenticate} >
            {!isAuthenticated? "Sign In" : "Connected"}
        </Button>
    </Box>
  )
}
