import {
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    Box,
    chakra,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { NextSeo } from "next-seo";
  import NextImage from "next/image";
  
  import { seo, data } from "config";
  import DonateWeb3 from "@/components/donateTabs/donateWeb3";
  import DonateMoralis from "@/components/donateTabs/donateMoralis";
  import DonateEthers from "@/components/donateTabs/donateEthers";

  export default function message() {
    return (
        <Box>
            <chakra.a fontSize="2rem" fontWeight="700">
                Update the Message!
            </chakra.a>
            <DonateMoralis/>
            <Tabs>
            <TabList>
                <Tab>with Ethers</Tab>
                <Tab>with Web3</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <DonateEthers/>
                </TabPanel>
                <TabPanel>
                    <DonateWeb3/>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Box>    
        )
  }
  