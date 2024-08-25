import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { Label,TextInput,Button, Alert, Spinner } from 'flowbite-react'
import { useState } from 'react';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import OAuth from '../components/OAuth';
function SignIn() {
  const [formData, setFormData] = useState({ email: '',password: ''});
  // taking data from store
  const {loading , error:errorMessage} = useSelector((state) => state.user);
  const navigate =useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e)=>{    
    // getting previous form data and updating the data according to the id , [e.target.id] gets the id of field which is changing
      setFormData((prevForm) =>({ ...prevForm , [e.target.id]:e.target.value.trim() }))
  }

  const handleSubmit = async (e)=>{     
      e.preventDefault();

      if(!formData.email || !formData.password){
          return dispatch(signInFailure('Please fill out all fields'))
      }
      try{
        // setting loading true for starting loading effect(using signIn start)
        dispatch(signInStart());
        
        // since we have to sent our req to backend server , but frontend and backend code are running on different ports therefore we have to use proxy(see end).

        // sending request and data to server(backend url of signin) using fetch operation
          const res = await fetch('/api/auth/signin' ,{

            // This line sends a POST request to the /api/auth/signin endpoint.
            method:'POST',

            //indicating that the request body contains JSON data.
            headers :{ 'Content-Type' : 'application/json'},  

            // converts the formData object to a JSON string and includes it in the request body.
            body:JSON.stringify(formData)
          })
          // response coming from server
          const data =await res.json();
          
          // if any failure occurs we will get its status and message from response data
          if(data.success===false){
            dispatch(signInFailure(data.message));
          }
          
          if(res.ok){
              dispatch(signInSuccess(data));
              navigate('/');
          }
      }
      catch(err){
        dispatch(signInFailure(err.message));
      }
      
      
  }
  return (
    <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
            {/* left */}
            <div className="flex-1">
            <Link  to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white'>Blogify</span>
            </Link>
            <p className='text-sm mt-5'>This is a Blog App. You can sign in with your email and password or with Google.</p>
            </div>

            {/* right */}
            <div className="flex-1">
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    {/* email */}
                    <div className="">
                      <Label value='Your Email'></Label>
                      <TextInput type='email' placeholder='abc@company.com' id='email' onChange={handleChange}></TextInput>
                    </div>
                    {/* pass */}
                    <div className="">
                      <Label value='Your Password'></Label>
                      <TextInput type='password' placeholder='' id='password' onChange={handleChange}></TextInput>
                    </div>
                    {/* button */}
                    <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading===true}>
                      {/* if our loading is true we will show loading effect else signUp , we will also disable button when loading */}
                        {
                            loading ? (
                              <>
                                <Spinner size='sm'/>
                                <span className='pl-3'>Loading...</span>
                              </>
                            ) : 'Sign In'
                        }
                    </Button>
                    <OAuth/>
                    
                </form>
                
                <div className='flex mt-3 gap-2 text-sm'>
                    <span className="">Don't Have an account?</span>
                    <Link to='/signup' className='text-blue-500'>Sign-Up</Link>
                </div>

                {/* show error Alert if sign in does not success , this is only syntax for alert */ }
                {
                  errorMessage && (
                    <Alert className='mt-5' color='failure'>
                        {errorMessage}
                    </Alert>
                  )
                }
            </div>
            
        </div>
    </div>
  )
}

export default SignIn


// see vite.config.js
// During development, you might want to send API requests to a backend server running on a different port (e.g., http://localhost:3000).
// A proxy allows you to redirect API requests from your development server to the backend server without changing the front-end code.


// useNavigate() hook allows you to navigate to different routes within your application without the need for a <Link> component or <Redirect> component.