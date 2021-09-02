import { object } from 'prop-types';
import React,{useState} from 'react'
import '../App.css';
import image from './img_avatar.png';
import axios from 'axios'
import * as yup from 'yup';

const Form = () => {

    // initial object 
    const initial ={
        name:'',
        password:'',
        email:'',
        terms:false
    }
    
    // create state hond a initial object
    const [enroll,setEnroll] = useState(initial)
    const [errors,setErrors] = useState(initial)

    const [user,setUser] = useState()
 
    // create handleChange function 
    const handleChange =(event) => {
        const newUser ={...enroll, 
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked 
            : event.target.value}

            handlevalidationOnchange(event)

            setEnroll(newUser)

         }

        //  create handlesubmit 
        function handleSubmit(event){
            event.preventDefault()
            axios.post("https://reqres.in/api/users",enroll)
            .then((res) => {
                console.log(res);

                setEnroll(initial)
            })
        }


        // validation on yup 
        let schema  = yup.object().shape({
            name: yup.string().required(),
            password: yup.number().required().positive().integer(),
            email: yup.string().email().required(),
            terms: yup.boolean().oneOf([false], "Must Accept Terms of Service")
        }
        )

        function handlevalidationOnchange(event){
            yup 
            .reach(schema, event.target.name)
            .validate(event.target.value)
            .then((valid) => {
                setErrors({...errors, [event.target.name]: ''})
            })
            .catch((err) => {
                setErrors({...errors, [event.target.name]: err.errors[0]})
            })
        }
    
   return(
       <div>

            <div className='header'>

              <h1> 
               <span className='color'>Enrolling</span> if you want to join an  
               <span className='color'> our course </span>
              </h1>

                    <img src={image} alt='image' />
            </div>

           <form onSubmit={handleSubmit}>
               <label htmlFor='name'>
                   Name 
                   <input 
                    type='text'
                    placeholder='Enter your Name'
                    name='name'
                    value={enroll.name}
                    onChange={handleChange}
                    />
                    {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
               </label> 

               <label htmlFor='password'>
                 password 
                   <input 
                    type='password'
                    placeholder='Enter your password'
                    name='password'
                    value={enroll.password}
                    onChange={handleChange}
                    />
                    {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
               </label><br/>

               <label htmlFor='Email'>
                    Email 
                   <input 
                    type='email'
                    placeholder='Enter your Email'
                    name='email'
                    value={enroll.email}
                    onChange={handleChange}
                    />
                    {errors.email.length > 0 ? <p className='error'>{errors.email}</p> : null}
               </label>

               <label htmlFor='checkbox' className="terms">
                   <input 
                    type='checkbox'
                    name='terms'
                    value={enroll.terms}
                    onChange={handleChange}
                    />
                     Terms of Service 
                     {errors.terms.length > 0 ? <p className='error'>{errors.terms}</p> : null}
               </label>

               <button type='submit'>Submite</button>
               
               <h2>Welcome to our site</h2>
            
           </form>
        
       </div>
   )
}

export default Form;