import React from 'react'
import cat from '../assets/cat.webm'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import api from '../utils/api'
import { useAuth } from './Auth/AuthContext'
import { useNavigate } from 'react-router-dom'

function Signin({onToggle}) {
  const navigate=useNavigate()
  const {login}=useAuth()
  const formSchema=z.object({
      uname:z.string({required_error:"Name is required"}).trim()
            .min(3,{message:"Name must have atleat 3 charecters"})
            .max(250,{message:"Maximum charecters exceded"}),
  
      email:z.string({required_error:"Email is required"}).trim()
             .email({message:"invalid Email Address"})
             .max(255)
                 .transform(val => val.toLowerCase()),
  
      password:z.string({required_error:"password is required"}).trim()
              .min(8,{message:"minimum 8 charecters required"})
              .max(25,{message:"maximum 25 charects only"}),

    //  skills:z.string({required_error:" skills is required"}).trim(),
    //            projects:z.string({required_error:" projects is required"}).trim()

  })

    const {
      register,
      handleSubmit,
      formState:{errors}
    }=useForm({resolver:zodResolver(formSchema)});

 
  async function onsubmit(data) {
    console.log("DATA BEFORE SEND:", data);

    try {
      const res = await api.post("/adduser", data);

      console.log(res.data);

      // cookie already stored automatically
      login(res.data.user);

      alert("Check your mail for verification");

      navigate("/app/addjob");
    } catch (err) {
      console.error(err);

      alert(
        "Login failed: " +
          (err.response?.data?.message || "Server error")
      );
    }
  }
  
  return (
    <div className='md:w-190 w-auto md:p-6  h-110 md:h-160 border border-red rounded-xl flex flex-row md:gap-5 items-center bg-rose2  ring-periwinkle shadow-xl shadow-dusty'>
       
       <form className='flex flex-col items-center justify-center p-2 md:p-5 gap-3 md:gap-10' onSubmit={handleSubmit(onsubmit)}>
        
         <div className='flex  gap-3'>
        <label htmlFor='username' className='w-20 md:w-24 text-rose  md:text-xl font-medium'>Username</label>
        <input type='text' 
        {...register('uname')}
        className='border border-blackcream  md:py-1 md:px-3'>
        </input>
                  {errors.uname && <p className='text-black'>{errors.uname.message}</p>}

      </div>
       
       <div  className='flex  gap-3'>
        <label htmlFor='email' 
        className='w-20 md:w-24  text-rose font-medium md:text-xl '>Email</label>
        <input type='text' className='border border-blackcream  md:py-1 md:px-3 '
         {...register('email')}
        >    
</input>
       {errors.email && <p>{errors.email.message}</p>}

      </div>
      
       <div className='flex gap-3'>
        <label htmlFor='password'  
        
        className='w-20  md:w-24  text-rose font-medium md:text-xl'>Password</label>
        <input type='password' 
        name='password' id='password'
        className='border border-blackcream  md:py-1 md:px-3'        
        {...register('password')}>           
      </input>
             {errors.password && <p>{errors.password.message}</p>}

      </div>
      
      {/* <div className='flex gap-3'>
        <label htmlFor='skills'  
        
        className='w-20  md:w-24  text-rose font-medium md:text-xl'>Skills</label>
        <input type='skills' 
        name='skills' id='skills'
        className='border border-blackcream  md:py-4 md:px-3'        
        {...register('skills')}>           
      </input>
             {errors.skills && <p>{errors.skills.message}</p>}

      </div>

        <div className='flex gap-3'>
        <label htmlFor='skills'  
        
        className='w-20  md:w-24  text-rose font-medium md:text-xl'>Projects</label>
        <input type='projects' 
        name='projects' id='projects'
        className='border border-blackcream  md:py-1 md:px-3'        
        {...register('projects')}>           
      </input>
             {errors.projects && <p>{errors.projects.message}</p>}

      </div> */}

      <div className='flex gap-3'>
        <button name='btn-signup' 
        type='submit'
        className='border rounded-l bg-primary hover:bg-major2 hover:shadow-xs hover:ring-accent1 md:hover:scale-125 md:font-bold border-blackcream text-blackcream shadow-xs shadow-rose py-1 px-2 cursor-pointer' >
          SignIn
          </button>
          
      </div>

        <div className='flex'>
            <p className='text-blackcream  font-medium'> Already have an account <span className="cursor-pointer font-bold text-rose-400 ml-1" onClick={onToggle}>LogIn</span></p>

          </div>

       </form>
     <div className=''>
      <video src={cat} type='video/webm' autoPlay loop
    muted
     className=' w-30 h-30 md:w-90 md:h-90'></video>
     </div>
    
    </div>
  
  )
}

export default Signin
