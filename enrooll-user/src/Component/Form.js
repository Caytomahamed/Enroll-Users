import { func, object } from 'prop-types';
import React,{useState} from 'react'
import '../App.css';
import image from './img_avatar.png';
import axios from 'axios'
import * as yup from 'yup';

const Form = () => {

    // initial object 
    const initial ={
        name:'',
        number:'',
        password:'',
        email:'',
        date:'',
        role:'',
        terms:false
    }
    
    // create state hond a initial object
    const [enroll,setEnroll] = useState(initial)
    const [errors,setErrors] = useState(initial)//errors holding

    const [users,setUser] = useState([])//diplayed user
    console.log(enroll);
 
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
                setUser(res.data)
           
                setEnroll(initial)
            })
        }



        // validation on yup 
        let schema  = yup.object().shape({
            name: yup.string().required(),
            password: yup.number().required().positive().integer(),
            number: yup.number().required().positive().integer(),
            date: yup.date().default(() => new Date()),
            email: yup.string().email().required(),
            role: yup.string(),
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
                    Password 
                   <input 
                    type='password'
                    placeholder='Enter your password'
                    name='password'
                    value={enroll.password}
                    onChange={handleChange}
                    />
                    {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
               </label>

               <label htmlFor='number'>
                 Telephone
                   <input 
                    type='number'
                    placeholder='Enter your number'
                    name='number'
                    value={enroll.number}
                    onChange={handleChange}
                    />
                    {errors.number.length > 0 ? <p className='error'>{errors.number}</p> : null}
               </label>

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

                <select name='role' value={enroll.role} onChange={handleChange}>
                 <option >  ---please select educational level -- </option>
                 <option >Primary</option>
                 <option >High school</option>
                 <option  >University</option>
                </select>

                {errors.role.length > 0 ? <p className='error'>{errors.role}</p> : null}

               <label htmlFor='date'>
                    Date   
                   <input 
                    type='date'
                    placeholder='Enter your date'
                    name='date'
                    value={enroll.date}
                    onChange={handleChange}
                    />
                    {errors.date.length > 0 ? <p className='error'>{errors.date}</p> : null}
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
         
       <div className='row'>
          <div  className='col-1-of-4'>
              <h3 className='title'>Name : {users.name}</h3>
              <p className='para'>ID : {users.id}</p>
              <p className='para'>Email : {users.email}</p>
              <p className='para'>Tel : {users.number}</p>
              <p className='para'>Level : {users.role}</p>
            
          </div>
      
              <p className='para'>  <pre>{JSON.stringify(users,null,2)}</pre></p>
            
       </div>

    
       
       </div>
   )
     
}

export default Form;