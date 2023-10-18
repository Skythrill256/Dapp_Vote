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
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  
  return (
    <div className={Style.createVoter}>
      <div>
        { fileUrl && (
          <div className={Style.voterInfo}>
            <img src={fileUrl} alt="Voter Image" />
            <div className={Style.voterInfo_paragraph}>
              <p>
                Name: <span>&nbps; {formInput.name}</span>
              </p>
              <p>
                Add: &nbps; <span>{formInput.address.slice(0, 20)}</span>
              </p>
              <p>
                pos: &nbps; <span>{formInput.position}</span>
              </p>
              </div>
          </div>
        )}
        {
          !fileUrl && (
            <div className={Style.sideInfo}>
              <div className={Style.sideInfo_box}>
                <h4>Make a new Candidate for the election</h4>
                <p>
                Blockchain voting organization , provide ethereume ecosystem
                </p>
              </div>
            </div>
            
        )
        }
      </div>
      </div>
      

)
}
      


export default allowedVoters