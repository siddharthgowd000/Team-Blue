import React from 'react'
import Uploadfile from '../components/Uploadfile'
import { useNavigate } from 'react-router-dom'
const  Upload= () => {

  const token = localStorage.getItem('relieftoken')
  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate('/signin')
      return
    }
  }, [])

  return (
    <Uploadfile/>
  )
}
export default Upload
