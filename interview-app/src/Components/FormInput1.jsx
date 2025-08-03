import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { db } from '../Firebase/index'
import { collection, addDoc } from "firebase/firestore"; 



// Yup schema for form validation for all fields
const schema = yup.object().shape({
  jobRole:yup.string().required('Please select a job role'),
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone must contain only digits")
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must contain only 10 digits"),
  qualification: yup.string().required("Qualification is required"),
  address: yup.string().required("Address is required"),
  experience: yup.string().required("Experience is required"),
  comments: yup.string().required("Enter your comments")
});




const FormInput1 = () => {

  const {register,handleSubmit,reset,formState: { errors }} = useForm({resolver: yupResolver(schema)});

  const onSubmit = async (data) => {
    await addFireBaseData (data);
    console.log(data);
    reset();
  };

  // console.log(errors);


// Add dummy data to FireBase
// const addFireBaseData = async (data)=>{
//   try {
//     const docRef = await addDoc(collection(db, "users"), data);
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }


const addFireBaseData = async (data)=>{
  try {
    const docRef = await addDoc(collection(db, "candidates"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


  return (
    <>
      <div className='my-2 w-full'> 
              <select name='jobRole' {...register("jobRole")} className='text-black p-2 w-full bg-gray-500 rounded'>
                <option value="">--Select Job--</option>
                <option value="frontend developer">Frontend Developer</option>
                <option value="backend developer">Backend Developer</option>
                <option value="fullstack developer">FullStack Developer</option>
              </select>
              {errors?.jobRole && <p style={{ color: 'white' }}>{errors.jobRole.message}</p>} 
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Full Name  */}
          <input
            {...register("name")}
            type="text"
            className="w-full p-2 rounded my-2 bg-white text-black"
            placeholder="Enter Full Name"
          />
          {errors?.name && <p style={{ color: 'white' }}>{errors.name.message}</p>}

          {/* Email */}
          <input
            {...register("email")}
            type="text"
            className="w-full p-2 rounded my-2 bg-white text-black"
            placeholder="Enter Email address"
          />
          {errors?.email && <p style={{ color: 'white' }}>{errors.email.message}</p>}

          {/* Phone */}
          <input
            {...register("phone")}
            type="text"
            className="w-full p-2 rounded my-2 bg-white text-black"
            placeholder="Enter Phone Number"
          />
          {errors?.phone && <p style={{ color: 'white' }}>{errors.phone.message}</p>}

          {/* Qualification */}
          <input
            {...register("qualification")}
            type="text"
            className="w-full p-2 rounded my-2 bg-white text-black"
            placeholder="Enter Qualification"
          />
          {errors?.qualification && <p style={{ color: 'white' }}>{errors.qualification.message}</p>}

          {/* Address */}
          <textarea
            {...register("address")}
            className="px-2 py-4 w-full rounded my-2 bg-white text-black"
            placeholder="Enter Address"
          ></textarea>
          {errors?.address && <p style={{ color: 'white' }}>{errors.address.message}</p>}
          
          {/* Optional Comments (no validation) */}
          <textarea
          {...register("experience")}
            className="px-2 py-4 w-full rounded my-2 bg-white text-black"
            placeholder="Add your experience and skills"
          ></textarea>
          {errors?.experience && <p style={{ color: 'white' }}>{errors.experience.message}</p>}

          {/* Optional Comments (no validation) */}
          <textarea
          {...register("comments")}
            className="px-2 py-4 w-full rounded my-2 bg-white text-black"
            placeholder="Comments"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="my-2 p-3 bg-blue-700 rounded text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};


export default FormInput1;
