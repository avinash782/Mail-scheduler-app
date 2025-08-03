 import React from 'react'
import { useForm } from 'react-hook-form';


const FormInput = () => {

  const { register,handleSubmit,formState:{ errors }} = useForm();

  const onSubmit =(data) =>{
    console.log(data);
  }
  console.log(errors)
  return (
    <>
    <div>
       <form onSubmit={handleSubmit(onSubmit)}>
         
         <input type='text' 
         {...register('name',
          {required:'Name is required',pattern : {value:/^[A-Za-z]+$/i, message:'Enter text only'}})}
           className='w-full p-2 rounded my-2 bg-white text-black' placeholder='Enter Full Name'/>
         {errors?.name && <p style={{color:'white'}}>{errors.name.message}</p>}
        
        <input type='text'
        {...register('email',{required:'Email required', pattern : {value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:'Invalid Email Address'}})}
        className='w-full p-2 rounded my-2 bg-white text-black' placeholder='Enter Email address'/>
        {errors?.email && <p style={{color:'white'}}>{errors.email.message}</p>}

        <input type='number' 
        {...register('phone',{required:'Phone No required',minLength:{value:10,message:'Min 10 digits required'}})}
        className='w-full p-2 rounded my-2 bg-white text-black' placeholder='Enter Phone Number'/>
        {errors?.phone && <p style={{color:'white'}}>{errors.phone.message}</p>}

        <input type='text' 
        {...register('qualification',{required:'Qualification required'})}
        className='w-full p-2 rounded my-2 bg-white text-black' placeholder='Enter Qualification'/>
        {errors?.qualification && <p style={{color:'white'}}>{errors.qualification.message}</p>}

        <textarea 
        {...register('address',{required:'Address required'})}
        type='text' className='px-2 py-4 w-full rounded my-2 bg-white' placeholder='Enter Address'></textarea>
        {errors?.address && <p style={{color:'white'}}>{errors.address.message}</p>}

        <textarea type='text' className='px-2 py-4 w-full rounded my-2 bg-white' placeholder='comments'></textarea>

        <button type="submit" className='my-2 p-3 bg-blue-700 rounded text-white'>Submit</button>
       </form>
    </div>
    </>
  )
}
    

export default FormInput;