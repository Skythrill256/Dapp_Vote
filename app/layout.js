//index.js
"use client"

import { useState, useEffect , useContext} from 'react'
import Image from 'next/image'
import Countdown from 'react-countdown'


import { VotingContext } from '@/context/voter'
import Style from '../styles/globals.css'
import Card from '../components/card/card'
//import image from "../assets/candidate-1.jpg"

const layout = () => {
  const {votingTitle} = useContext(VotingContext) // using the using context hook to get the data that is being shared as a component by "export const VotingContext = React.createContext()" from voter.js file
  console.log(votingTitle)
  return (
    <div>{votingTitle}</div>
  )
}

export default layout