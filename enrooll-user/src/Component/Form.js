import { object } from 'prop-types';
import React,{useState} from 'react'
import '../App.css';
import image from './img_avatar.png';
import axios from 'axios'

const Form = () => {

    // initial object 
    const initial ={
        name:'',
        password:'',
        email:'',
        term:false
    }
    
    // create state hond a initial object
    const [enroll,setEnroll] = useState(initial)
    const [user,setUser] = useState()
    console.log(enroll);
    // create handleChange function 
    const handleChange =(event) => {
        const newUser ={...enroll, 
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked 
            : event.target.value}

            setEnroll(newUser)

         }

        //  create handlesubmit 
        function handleSubmit(event){
            event.preventDefault()
            axios.post("https://reqres.in/api/users",enroll)
            .then((res) => {
                console.log(res);
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
               </label>

               <label htmlFor='checkbox' className="terms">
                   <input 
                    type='checkbox'
                    name='term'
                    value={enroll.term}
                    onChange={handleChange}
                    />
                     Terms of Service 
               </label>

               <button type='submit'>Submite</button>
               
               <h2>Welcome to our site</h2>
            
           </form>
        
       </div>
   )
}

export default Form;