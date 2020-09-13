import React,{useState,useEffect} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBCard } from 'mdbreact';
import axios from "axios";
import {Redirect} from 'react-router-dom'
const FormPage = () => {
  const [state,setState]=useState({
    username:"",
    Email:"",
    password:""
  })
 //handle onchange
  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
      
    })};
    //register request
   const submitHandler = async (e) => {
     e.preventDefault();
    const result= await axios
        .post("http://localhost:9000/users/register",state)
        .then(( state) => {
          
          console.log(state);
        })
        .catch((err) => {
          console.log(err);
        });
        
        setState({username:"",
        Email:"",
        password:""})
        
  
      
   }
  ;
 

  return (
<MDBContainer>


  <MDBRow>
    <MDBCol md="5">
    <div className="form">
      <form  onSubmit={submitHandler}>
        <p className="h5 text-center mb-4">Sign up</p>
        <div className="grey-text">
          <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
            success="right" name="username" value={state.username} onChange={inputHandler}/>
          <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
            success="right" name="Email" value={state.Email} onChange={inputHandler} />
          <MDBInput label="Your password" icon="lock" group type="password" validate name="password" value={state.password} onChange={inputHandler}/>
        </div>
        <div className="text-center">
          <MDBBtn type="submit" color="primary">Register</MDBBtn>
        </div>
      </form>
      </div>
    

    </MDBCol>
  </MDBRow>
  
</MDBContainer>
);
};

export default FormPage;