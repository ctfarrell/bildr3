import {
    Box,
    Button,
    Input,
    Heading,
    Code,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
import { RepeatIcon, EditIcon } from "@chakra-ui/icons";
import Web3 from "web3";
import React, { useState, useRef } from 'react'; 
import { contractAddress, abiInfo } from "../../data/utils/contract"

export default function DonateWeb3() {
    const [message, setMessage] = useState("Unknown")
    const [inputMessage, setInputMessage] = useState("")
    const [updateLoading, setUpdateLoading] = useState(false)
    const handleChange = (event) => setInputMessage(event.target.value)

    function getMessage() {
        //output the current provider to ensure it is working
        const web3 = new Web3( 
            (window.web3 && window.web3.currentProvider) || 
            new Web3.providers.HttpProvider(this.Contract.endpoint)); 
        const messageContract = new web3.eth.Contract(abiInfo, contractAddress) 
        messageContract.methods.theMessage().call().then(function(result){
            console.log(result)
            setMessage(result)
        }).catch(function(reason){
            console.debug("get message error with web3: ", reason)
        })   
    }

    function updateMessage() {
        setUpdateLoading(true)
        const web3 = new Web3( 
            (window.web3 && window.web3.currentProvider) || 
            new Web3.providers.HttpProvider(this.Contract.endpoint)); 
        const messageContract = new web3.eth.Contract(abiInfo, contractAddress)
        console.log(message)
        web3.eth.getAccounts().then(function(result){
            console.log(result)
            messageContract.methods.updateMessage(inputMessage).send({from:result[0]}).then(function(result){
                console.log("call result with web3: ",result)
                setUpdateLoading(false)
            }).catch(function(reason){
                console.log("address error with web3: ", reason)
                setUpdateLoading(false)
            })
        }).catch(function(reason){
            setUpdateLoading(false)
            console.log("call error with web3: ", reason)})

    }
  return (
    <Box>
        <Button leftIcon = {<RepeatIcon/>} m={2} colorScheme = "blue" variant = "outline" onClick={getMessage}>
        Check Message
        </Button>
        <Box display = "flex">
            <Text m={2}>Current Message with Web3:</Text>{" "}
            <Code m={2} variant = "solid" colorScheme = "blue">{message}</Code>   
        </Box>
        <Input m={2} onChange = {handleChange} placeholder='message' size='md' />
        <Button leftIcon = {<EditIcon/>} m={2} colorScheme = 'blue' onClick={updateMessage} isLoading = {updateLoading} loadingText = "Updating Text">
            Update Message
        </Button>

    </Box>
  )
}
