import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ProfilePage = () => {
    const {id}=useParams()
    useEffect(()=>{
        axios.get('http://localhost:4000/profileinfo')

    },[id])
  return (
    <div>ProfilePage:{id}</div>
  )
}

export default ProfilePage