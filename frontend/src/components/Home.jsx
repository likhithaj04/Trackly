import React, { useState } from 'react'
import Signin from './Signin'
import Login from './Login'
import Navbar from './Nav/Navbar'

function Home() {
  const [isSignin,setSignin]=useState(false)
  return (
    <>
    <Navbar/>
    <div className='w-auto h-screen flex items-center justify-center bg-lavender2  '>
      {isSignin?(
          <Signin onToggle={()=>setSignin(false)} />
      ):
      <Login onToggle={()=>setSignin(true)} />
      }
          

    </div>
    </>
  )
}

export default Home
