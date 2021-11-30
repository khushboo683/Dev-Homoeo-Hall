import React from 'react'
import {Redirect} from 'react-router-dom'
import {useEffect} from 'react'

export default function Logout({setIsAuthenticated,logout,setIsAdmin}){

   useEffect(() => {
    const log=async()=>{
        try{
           
            const response=await fetch('https://devhomoeoback.herokuapp.com/logout',{
              method: "POST",
              headers: {
                Authorization : "Bearer " +localStorage.token
              }
            });
            const parseRes = await response.json();
            }catch(err){
              console.log(err.message)
            }
            console.log("cleared")
       
    }
   
    log();
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setIsAdmin(false)
    logout(false)
  
    })

        return (<Redirect to="/" />)
    
}