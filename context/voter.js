// all the api calls and communicating with our smart contract will be done here
import React, { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { create as ipfshttpclient } from "ipfs-http-client"
import axios from 'axios'
import { useRouter } from 'next/router'

import { VotingAddress, VottingAddressABI } from './constant'
const client = ipfshttpclient('https://ipfs.infura.io:5001/api/v0')
const fetchContract = (Provider) => new ethers.Contract(VotingAddress, VottingAddressABI, Provider) //creating the new instance of the contract
export const VotingContext = React.createContext()  // shares the entire data in react

//@dev //this functio will share the value to the rest of the compoments in the applicatoion, we can easily get the data from one page to another
export const VotingProvider = ({ children }) => {
    const votingTitle = "My first app"
    return (
        <VotingContext.Provider value ={{votingTitle}}> 
            {children}
        </VotingContext.Provider> //{{}} , here I can pass any value to get rendered in to html to display in my app
)
}

//
const voter = () => {
  return (
    <div>voter</div>
  )
}

export default voter