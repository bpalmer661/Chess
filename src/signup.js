//signup.js


import React, { useState } from 'react'


import { Link } from 'react-router-dom';

import { useDispatch } from "react-redux";

import { Typography } from '@material-ui/core';
//MUI 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


import { setAutheticated } from './redux/actions/userActions';
import firebase from 'firebase';

import { db,auth } from './firebase';

      
import elephant from './Images/elephantChess.png'






    export default function Signup() {


        const [email, setEmail] = useState("")

        const [password, setPassword] = useState("")
        
        const[confirmPassword, setConfirmPassword] = useState("");
        
        const[username, setUsername] = useState("");
        
        // const[emailError, setEmailError] = useState("");

        // const[passwordError, setPasswordError] = useState("");

      
      const[error, setError] = useState("");


      const[loading, setLoading] = useState(false);


      const loadingMarkup = loading === true? (
        <div style={{display: "flex",justifyContent: "center", alignContent:"center"}}>
        <CircularProgress/>
        </div>
): (
null
)

    const dispatch = useDispatch();


const handleSubmit = (event) => {



    event.preventDefault();
    
    setError(null)

    if (confirmPassword !== password){
        setError("Passwords Do Not Match")
        return
    }
 
if (!username){
    setError("Please Enter A Username")
    return
}

if(username.length < 5){
    setError("Username Must Be Atleast 6 Characters Long")
    return
}


setLoading(true)




firebase.auth().createUserWithEmailAndPassword( email, password)
 .then((userCredential) => {

    console.log("this is user credential + " + userCredential )

    userCredential.user.sendEmailVerification();

addUserToDatabase()
   

  }).catch((error) => {
console.log("this is error " + error)
    setError(error.message)
    setLoading(false)

  });

}



const addUserToDatabase = () => {

    const user = {
        email: email,
        inGame: false,
        username:username,
        rating: 500,
        tokens:10,
        gamesPlayed:0,
        uid: auth.currentUser.uid,
        }
    
    
      db.collection("users").doc(email).set(user).then(() => {

        dispatch(setAutheticated());

setLoading(false)
  
        window.location.href = "/"


      }).catch((error) => {
        console.log("this is error " + error)
            setError(error.message)

setLoading(false)
        
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
                          Sign Up
                            </Typography>
          


            <form 
            style={{ margin:"0 auto", width:"500px"}}
            noValidate onSubmit={handleSubmit}>
    
    <TextField 
             id='username' 
             name="username" 
             type="username" 
             label="Username" 
            //  className={classes.textField}
            //  helperText={errors.email}
            //  error={errors.email ? true : false }
             value={username}
             onChange={e => setUsername(e.target.value)}
             fullWidth
            />





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
            //  style={{marginBottom: "50px"}}
             />     


<TextField
      id="Confirm Password" 
      name="Confirm Password"  
      type="password" 
      label="Confirm Password" 
     //  className={classes.textField}
     //  helperText={errors.password}
      //error seet field to be red
     //  error={errors.password ? true : false }
      value={confirmPassword}
      onChange={e => setConfirmPassword(e.target.value)}
      fullWidth
      style={{marginBottom: "50px"}}
      />     

              <br></br>  



             <Button type="submit" 
             variant="contained"  
             style={{ width: "100px",
margin: "0 auto",
display: "block",
backgroundColor:"lightblue"}}
            //  className={classes.button}
            //  disabled={loading}
               >Sign Up</Button>

<br/>

{ error && 
    <center>
<p 
style={{color:"red"}}
> 
  
   {error}
</p>
</center>
}




<center>
{loadingMarkup}
</center>






      <br></br>    
 <small>  <Link 
 style={{display: "flex",justifyContent: "center", color:"black"}}
to="/login" >Already have an account? Login</Link>  </small>
<br></br>
<small>  <Link 
 style={{display: "flex",justifyContent: "center", color:"black"}}
to="/" >Return To Home Page</Link>  </small>
 <br></br>


            </form>
        </div>
       
    </div>
)







}






