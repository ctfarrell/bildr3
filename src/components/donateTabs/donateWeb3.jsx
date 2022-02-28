import {
    Box,
    Button,
    Input,
    Heading,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
import Web3 from "web3";
import React, { useState, useRef } from 'react'; 


export default function DonateWeb3() {
    const [message, setMessage] = useState("Unknown")
    const messageInput = useRef("")
    const abiInfo = [ 
        { 
            "constant": false, 
            "inputs": [ 
                { 
                    "name": "message", 
                    "type": "string" 
                } 
            ], 
            "name": "updateMessage", 
            "outputs": [], 
            "payable": false, 
            "stateMutability": "nonpayable", 
            "type": "function" 
        }, 
        { 
            "inputs": [], 
            "payable": false, 
            "stateMutability": "nonpayable", 
            "type": "constructor" 
        }, 
        { 
            "constant": true, 
            "inputs": [], 
            "name": "theMessage", 
            "outputs": [ 
                { 
                    "name": "", 
                    "type": "string" 
                } 
            ], 
            "payable": false, 
            "stateMutability": "view", 
            "type": "function" 
        } 
    ]; 
    const contractAddress = "0xabb245050e7C9AF4e6C38DA786A8Ec92AE1cb885"


    function getMessage() {
        //output the current provider to ensure it is working
        const web3 = new Web3( 
            (window.web3 && window.web3.currentProvider) || 
            new Web3.providers.HttpProvider(this.Contract.endpoint)); 
        const messageContract = new web3.eth.Contract(abiInfo, contractAddress) 
        messageContract.methods.theMessage().call().then(function(result){
            console.log(result)
            setMessage(result)
        })   
    }

    function updateMessage() {
        const web3 = new Web3( 
            (window.web3 && window.web3.currentProvider) || 
            new Web3.providers.HttpProvider(this.Contract.endpoint)); 
        const messageContract = new web3.eth.Contract(abiInfo, contractAddress)
        web3.eth.getAccounts().then(function(result){
            console.log(result)
            messageContract.methods.updateMessage(messageInput).call({from:result[0]}).then(function(result){
                console.log("call result: ",result)
                messageContract.methods.theMessage().call().then(function(result){
                    console.log(result)
                    setMessage(result)
                }) 
            }) 
        })

    }
  return (
    <Box>
        <Button onClick={getMessage}>
        Check Message
        </Button>
        <Text>{"Current Message: " + message}</Text>
        <Input ref={messageInput} placeholder='message' size='md' />
        <Button onClick={updateMessage}>
            Update Message
        </Button>

    </Box>
  )
}
