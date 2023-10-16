import React from 'react'
import { useState, useEffect, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

import { votingContext } from "../context/voter"
import Style from '../styles/allowed-voters.modules.css'
//import images from '../assets'
import Button from '../components/button/button'
import Input from '../components/input/input'

const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, setFormInput] = useState({
    name: "", 
    address: "",
    position: "",
  })
  
  const router = useRouter()
  const { uploadToIPFS } = useContext(votingContext)
  
  // voters Image Drop
  
  const onDrop = useCallback(async (acceptedFile) => {
    
    const url = await uploadToIPFS(acceptedFile[0])
    setFileUrl(url)
  })
  
  const {}
  
  return (
    <div>
    
    </div>

)
}



export default allowedVoters