import {
    Box,
    Button,
    Input,
    Heading,
    Code,
    useToast,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
import { RepeatIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState, useRef } from 'react'; 
import { contractAddress, abiInfo } from "../../data/utils/contract"
import { ethers } from "ethers";



export default function DonateEthers() {
    const [message, setMessage] = useState("Unknown")
    const [inputMessage, setInputMessage] = useState("")
    const [updateLoading, setUpdateLoading] = useState(false)
    const handleChange = (event) => setInputMessage(event.target.value)
    const toast = useToast()


    async function getMessage() {
        //output the current provider to ensure it is working
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        const messageContract = new ethers.Contract(contractAddress, abiInfo, provider);
        messageContract.theMessage().then(function(result){
            console.log(result)
            setMessage(result)
        }).catch(function(reason){
            console.debug("get message error with web3: ", reason)
        })    
    }

    async function updateMessage() {
        setUpdateLoading(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const messageContract = new ethers.Contract(contractAddress, abiInfo, provider);
        console.log(message)
        const messageContractWithSigner = messageContract.connect(signer)
        messageContractWithSigner.functions.updateMessage(inputMessage).then(function(result){
                console.log("transaction result: ",result)
                toast({
                    title: 'Transaction Submitted',
                    description: "Please wait a moment while it is confirmed on the blockchain",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                result.wait().then(function(result){
                    console.log("call result with Ethers: ",result)
                    setUpdateLoading(false)
                })
                .catch(function(reason){
                    console.log("wait error with Ethers:", reason)
                })
            }).catch(function(reason){
                console.log("transaction error with Ethers: ",reason)
                setUpdateLoading(false)
            })

    }
  return (
    <Box>
        <Button leftIcon = {<RepeatIcon/>} m={2} colorScheme = "pink" variant = "outline" onClick={getMessage}>
        Check Message
        </Button>
        <Box display = "flex">
            <Text m={2}>Current Message with Ethers:</Text>{" "}
            <Code m={2} variant = "solid" colorScheme = "pink">{message}</Code>   
        </Box>
        <Input m={2} onChange = {handleChange} placeholder='message' size='md' />
        <Button leftIcon = {<EditIcon/>} m={2} colorScheme = 'pink' onClick={updateMessage} isLoading = {updateLoading} loadingText = "Updating Text">
            Update Message
        </Button>

    </Box>
  )
}
