import React from 'react'
import axios from 'axios'
import * as yup from 'yup'
import './App'

function Form (props) {

    const { formValues, update, submit, isButtonDisabled } = props

    const handleChange = evt => {
     
        if (evt.target.type === 'checkbox') {
            const { name, checked} = evt.target
            update(name, checked) 
        } else {
            const { name, value } = evt.target
            update(name, value)
        }

    }

    const onSubmit = evt => {
        evt.preventDefault()
        
        submit()
    }

    return (
        <div className='form'>
        <h1>Sign up!</h1>
        
        <form onSubmit={onSubmit}>
            <label htmlFor='name'>Full Name:</label>
            <input 
                id='name'
                name='name'
                type='text'
                placeholder='Full Name'
                value={formValues.name}
                onChange={handleChange}
            />
            <br></br>
            <label htmlFor='email'>Email Address:</label>
            <input 
                id='email'
                name='email'
                type='email'
                placeholder='Email'
                value={formValues.email}
                onChange={handleChange}
                
            />
            <br></br>
            <label htmlFor='password'>Password:</label> 
            <input 
                id='password'
                name='password'
                type='password'
                placeholder='Password'
                value={formValues.password}
                onChange={handleChange}
            />
            <br></br>
            <label htmlFor='terms'>I accept the terms of service</label>
            <input 
                id='terms'
                name='terms'
                type='checkbox'
                checked={formValues.terms === true}
                onChange={handleChange}
            />
            <br></br>
            <input type="submit" value="Submit" disabled={isButtonDisabled} />  
            
        </form>
        
        
        </div>
    )
    
}





export default Form

