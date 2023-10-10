import React, { Component } from 'react'

import { VotingProvider } from '@/context/voter'
import Navbar from '../components/navbar/navbar'




const HOME = ({Component,pageProps}) => {
  return (
  <VotingProvider>
    <div>
        <Navbar />
        <div>
        <Component {...pageProps} />
        </div>
      
      </div>
      </VotingProvider>   
  )
}
export default HOME