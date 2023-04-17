import React from 'react'
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
// import { useForm } from '../hooks/useForm';

import { useForm } from "react-hook-form";
import { useLogin } from '../hooks/useLogin';
import { useEffect } from 'react';
export const Login = ({ setLogin }) => {
  
  let { authToken, setAuthToken } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { doLogin, error, setError } = useLogin()
  const onSubmit = data => doLogin(data)

  return (
    <div className="center">
      <form>
      <label className="form-label" for="form2Example1">Email address</label>

        <div className="form-outline mb-4">
          <input {...register("email")} type="email" id="form2Example1" className="form-control"/>
        </div>
        <label className="form-label" for="form2Example2">Password</label>

        <div className="form-outline mb-4">
          <input {...register("password")} type = "password" id = "form2Example2" className = "form-control"/>
        </div>

        <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit(onSubmit)}>Sign in</button>

        <div className="text-center">
          <p>Not a member? <a href="#!" onClick={() => {
              setLogin(false)
            }}>Register</a></p>
        </div>
      </form>
    </div>
  )
}

// export default Login