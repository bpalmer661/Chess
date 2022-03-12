







// import { auth, db } from './firebase'



import React, { useState } from "react";
import { Link } from 'react-router-dom';

import { useDispatch } from "react-redux";

//MUI 
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// npm

import firebase from 'firebase';
import { setAutheticated } from './redux/actions/userActions';


      
import elephant from './Images/elephantChess.png'




export default function Login() {


  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");


          
    const dispatch = useDispatch();
     
              

const handleSubmit = (event) => {
    event.preventDefault();
    
    


firebase.auth().signInWithEmailAndPassword( email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
  
console.log("this is userCredentials: " + JSON.stringify(user))


  })
  .then(() => {
   

    dispatch(setAutheticated());

    
      window.location.href = '/';
   
  })
  .catch((error) => {
  
    alert("this is error" + error.code)

  });

}  

    return (
            
                    <div>
        
        
        
                        <div >


                            <div  style={{  margin:"0 auto", width:"200px",justifyContent: "center"}}>

                            <center>

<img 
style={{width:"150px", 
padding:"20px",
marginTop:"100px",

}}
src={elephant} alt="elephant" 
/>

 </center>              
                  

</div>
        
                            <Typography 
                             style={{display: "flex",justifyContent: "center"}}
                            variant="h3" 
                            //className={classes.pageTitle}
                            > 
                          Login
                            </Typography>
        
                          
        
                            <form 
                            style={{ margin:"0 auto", width:"500px"}}
                            noValidate onSubmit={handleSubmit}>
                    
                             <TextField 
                             
                             id='email' 
                             name="email" 
                             type="email" 
                             label="Email" 
                            //  className={classes.textField}
                            //  helperText={errors.email}
                            //  error={errors.email ? true : false }
                             value={email}
                             onChange={e => setEmail(e.target.value)}
                             fullWidth
                           
                                                  />
        
                             <TextField
                      
                             id='password' 
                             name="password" 
                             type="password" 
                             label="Password" 
                            //  className={classes.textField}
                            //  helperText={errors.password}
                             //error seet field to be red
                            //  error={errors.password ? true : false }
                             value={password}
                             onChange={e => setPassword(e.target.value)}
                             fullWidth
                             style={{marginBottom: "50px"}}
                             />     

                              <br></br>  
{/*                                 
                                {errors.general && (
                                <Typography variant="body2" 
                                className={classes.customError}
                                >
                            {errors.general}
                                </Typography>
                            )}
         */}
        
                            {/* {errors.error && (
                                <Typography variant="body2" 
                                className={classes.customError}
                                >
                            {errors.error}
                                </Typography>
                            )} */}
        
        
        
                             <Button type="submit" 
                             variant="contained"  
                            //  color="primary"  
                             style={{ width: "100px",
  margin: "0 auto",
  display: "block",
  backgroundColor: "lightblue",
  }}
                            //  className={classes.button}
                            //  disabled={loading}
                               >Login</Button>
        
        
        
        
        
        
        
        
                           
         <br></br>
         <br></br>    
        <small>  <Link to="/signup"
         style={{display: "flex",justifyContent: "center", color:"black"}}
        >Don't have an account? Sign Up</Link>  </small>
        <br/>
        <small>  <Link to="/forgotPassword"
         style={{display: "flex",justifyContent: "center", color:"black"}}
        >Forgot Password?</Link>  </small>
        <br></br>
         <br></br>
        
        
                 </form>
                        </div>
                       
                    </div>
                )
}






















