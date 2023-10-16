import React from 'react'
import { useState, useEffect, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

import { votingContext } from "../context/voter"
import Style from '../styles/allowed-voters.modules.css'
const allowedVoters = () => {
  return (
    <div>allowedVoters</div>
  )
}

export default allowedVoters