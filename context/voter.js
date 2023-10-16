// all the api calls and communicating with our smart contract will be done here
"use client"
import React, { useState, useEffect, createContext } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { create as ipfshttpclient } from "ipfs-http-client"
import axios from 'axios'
import { useRouter } from 'next/router'

import { VotingAddress, VottingAddressABI } from './constant'
const client = ipfshttpclient('https://ipfs.infura.io:5001/api/v0')
const fetchContract = (Provider) => new ethers.Contract(VotingAddress, VottingAddressABI, Provider) //creating the new instance of the contract and communicate with our smart contract
export const VotingContext = createContext() // shares the entire data in react

//@dev //this function will share the value to the rest of the compoments in the applicatoion, we can easily get the data from one page to another
export const VotingProvider = ({ children }) => {
    
    const router = useRouter()
    const [currentAccount, setCurrentAccount] = useState('')
    const [candidateLength, setCandidateLength] = useState('')
    const pushCandidate = []
    const candidateIndex = []
    const [candidateArray, setCandidateArray] = useState(pushCandidate)
    
    // end of candidate
    
    const [error, setError] = useState('')
    const highestVoote = []
    
    // voter section
    
    const pushVoter = []
    const [voterArray, setVoteArray] = useState(pushVoter)
    const [voterLength, setVoterLength] = useState('')
    const [voterAddress, setVoterAddress] = useState([])
    
    //end of voters section
    
    //connecting wallet
    
    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return setError("Please Insatll a wallet")
        const account = await window.ethereum.request({ method: "eth_accounts" })
        if (account.length) {
            setCurrentAccount(account[0])
        }
        else {
            setError("Please Install Metamask & connect and reload")
            }
        }
    // end of wallet connect
    
    // connectwallet
    const connectWallet = async () => {
        if (!window.ethereum) return setError("Please install metamask")
           const account = await window.ethereum.request({ method: "eth_requestAccounts" })
            setCurrentAccount(account[0])
    }
    
    //end of connectwallet
    
    //upload to IPFS
    
    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file })
            const url = 'http://ipfs.infura.io/ipfs/${added.path}'
            return url
        }
        catch (error) {
        setError("Error uploading to ipfs")
        }
    }
    
    return (
        <VotingContext.Provider value={{ checkIfWalletIsConnected , connectWallet }}> 
            {children}
        </VotingContext.Provider> //{{}} , here I can pass any value to get rendered in to html to display in my app
)
}


//


