import { useMoralis } from "react-moralis";
import React, { useState } from 'react'; 
import {
    Box,
    Button,
    Code,
    Heading,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";

export default function DonateMoralis() {
    const { authenticate, isAuthenticated, user } = useMoralis();
    const [loadingState, setLoadingState] = useState(false)
    function loadingAuthenticate(){
        console.debug("attempted to login")
        setLoadingState(true)
        authenticate
        setLoadingState(false)
    }

  return (
    <Box>
        {!isAuthenticated? 
        <Box m={2}>
            <Text>
            Sign In With Moralis
            </Text>
            <Button onClick={() => authenticate({ signingMessage: "Authorize linking of your wallet" })} m={2}>
                Sign In
            </Button>
        </Box>
        :
        <Box m={2}>
        <Text> Signed In With: </Text> 
        <Code>{user.get("username")}</Code>
        </Box>
        }
    </Box>
  )
}
