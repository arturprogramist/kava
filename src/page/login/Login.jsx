import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { authFetch } from '../../settings/fetchSettings'

import './Login.scss'

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in (based on localStorage)
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle form submission
  const onSubmit = (data) => {
    authFetch(data.login, data.password)
    setIsLoggedIn(true); // Mark user as logged in
    reset(); // Clear the form inputs
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false); // Mark user as logged out
  };

  return (
    <main className='login-page'>
      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <span>LOGIN FORM</span>

        {!isLoggedIn ? (
          <>
            <input
              placeholder='login'
              {...register('login', {
                required: 'Login is required',
                minLength: {
                  value: 8,
                  message: 'Login must be at least 8 characters long'
                }
              })}
            />
            {errors.login && <p>{errors.login.message}</p>}

            <input
              placeholder='password'
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                }
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit">Submit</button>
          </>
        ) : (
          <button type="button" onClick={handleLogout}>Logout</button>
        )}
      </form>
    </main>
  )
}

export default Login