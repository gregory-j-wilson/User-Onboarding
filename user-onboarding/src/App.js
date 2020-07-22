import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Form'
import axios from 'axios'
import * as yup from 'yup'


const initialUsers = []

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false
}

function App() {

  const [formValues, setFormValues] = useState(initialFormValues)

 



  const [users, setUsers] = useState(initialUsers) 

  const createUser = (name, value) => {
    
    const newUser = { ...formValues, [name]: value }
    setFormValues(newUser)
    
}



const inputChange = e => {

  e.persist();
  
        // yup.reach will allow us to "reach" into the schema and test only one part.
      // We give reach the schema as the first argument, and the key we want to test as the second.
      yup
        .reach(formSchema, e.target.name)
        //we can then run validate using the value
        .validate(e.target.value)
        // if the validation is successful, we can clear the error message
        .then(valid => {
          setErrors({
            ...errors,
            [e.target.name]: ""
          });
        })
        /* if the validation is unsuccessful, we can set the error message to the message 
          returned from yup (that we created in our schema) */
        .catch(err => {
          setErrors({
            ...errors,
            [e.target.name]: err.errors[0] 
          });
        });
  
      // Wether or not our validation was successful, we will still set the state to the new value as the user is typing
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value
      });
    };

  const submitForm = () => {

    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password
    }


    axios.post('https://reqres.in/api/users', newUser)

      .then(res => {
    
        const userFromAPI = res.data
        setUsers([userFromAPI, ...users])
    
        setFormValues(initialFormValues)
        console.log(res.data)
      })

      .catch(err => {

      })
  }



  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("You gotta put your name!"),
    email: yup
      .string()
      .email("Must be valid email address")
      .required("We need your email.."),
    password: yup
      .string()
      .min(6, "Passwords must be at least 6 characters long.")
      .required("Password is Required"),
    terms: yup
      .boolean()
      .oneOf([true], "You must accept the terms of service...")
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  });

 const [isButtonDisabled, setButtonDisabled] = useState(true)


  useEffect(() => {
    /* We pass the entire state into the entire schema, no need to use reach here. 
    We want to make sure it is all valid before we allow a user to submit
    isValid comes from Yup directly */
    formSchema.isValid(formValues).then(valid => {
      setButtonDisabled(!valid);
      console.log(isButtonDisabled)
    });
  }, [formValues]);

  

  


  return (
    <div className="App">
      <Form 
        formValues={formValues}
        update={createUser}
        submit={submitForm}
        isButtonDisabled={isButtonDisabled}

      />

      {users.map( user => {
          return (
            <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
            </div>
          )
       })}
    </div>
  );
}

export default App;
