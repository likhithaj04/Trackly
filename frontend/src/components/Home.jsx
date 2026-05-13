import React, { useState } from 'react'
import Signin from './Signin'
import Login from './Login'

function Home() {
  const [isSignin,setSignin]=useState(false)
  return (
    <>
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
