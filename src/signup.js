//signup.js
import React, { Component } from 'react'



import king from './Images/king.jpeg'
import { Link } from 'react-router-dom';

//MUI 
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';

import firebase from 'firebase';

import {signUpUser, setLoadingFalse,getUserDetails,setAuthorizationHeader } from './redux/actions/userActions';


import PropTypes from 'prop-types';
import { db } from './firebase';



const styles = (theme) => ({
  ...theme.shared
    })
    





export class Signup extends Component {



    

    //controlled component using state
    constructor(){
        super();
     this.state = {
         email: "",
         password:"",
         username:"",
         confirmPassword:"",
         errors:  {},
        
     }

    }

    /* eslint-disable */
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors)
        this.setState({
            errors: nextProps.UI.errors
        })
    }


    componentDidMount(){
        console.log("component did mount called in signup.js")




        const token = localStorage.FBToken
        if(token){
       
        window.location.href = '/';
      }
     
              

    }
    

handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
        [event.target.name]:event.target.value
    });
}



handleCancel = () => {
    console.log("handle cancel called")
   this.props.setLoadingFalse()
}


handleSubmit = (event) => {
    event.preventDefault();
    
 const user = {
email: this.state.email,

username:this.state.username,
}

firebase.auth().createUserWithEmailAndPassword( this.state.email, this.state.password)
  .then(() => {


  db.collection("users").doc(this.state.username).set(user)
  })
  .then(() =>{
this.props.getUserDetails(this.state.username)


this.setauthHeader()
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    

  });

}



setauthHeader = () => {

    console.log("setauthHeader called")


    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        // ...


        setAuthorizationHeader(idToken)

        window.location.href = '/';

      }).catch(function(error) {
        // Handle error
        console.log("error here of: " + error)

      });
}




    render() {

        console.log("signup render called")


const { classes, UI: {loading} } = this.props

const { errors } = this.state


        return (
            
            <div >
                


                <div
               
                >

<div  style={{  margin:"0 auto", width:"200px",justifyContent: "center"}}>

              
<img 
style={{marginTop: "100px"}}
src={king} alt="hammer" 
//className={}
/>


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
                    noValidate onSubmit={this.handleSubmit}>
                    
                     <TextField id='email' 
                     name="email" 
                     type="email" 
                     label="Email" 
                     className={classes.textField}
                     helperText={errors.email}
                     error={errors.email ? true : false }
                     value={this.state.email}
                     onChange={this.handleChange}
                     fullWidth
                     style={{display: "flex",justifyContent: "center"}}
                     />

                     <TextField id='password' 
                     name="password" 
                     type="password" 
                     label="Password" 
                     className={classes.textField}
                     helperText={errors.password}
                     //error seet field to be red
                     error={errors.password ? true : false }
                     value={this.state.password}
                     onChange={this.handleChange}
                     fullWidth
                     style={{display: "flex",justifyContent: "center"}}
                     />  

                        
                        <TextField id='confirmPassword' 
                     name="confirmPassword" 
                     type="password" 
                     label="Confirm Password" 
                     className={classes.textField}
                     helperText={errors.confirmPassword}
                     //error seet field to be red
                     error={errors.confirmPassword ? true : false }
                     value={this.state.confirmPassword}
                     onChange={this.handleChange}
                     fullWidth
                     style={{display: "flex",justifyContent: "center"}}
                     />  


<TextField id='username' 
                     name="username" 
                     type="text" 
                     label="Username" 
                     className={classes.textField}
                     helperText={errors.username}
                    
                     error={errors.username ? true : false }
                     value={this.state.username}
                     onChange={this.handleChange}
                     fullWidth
                     style={{display: "flex",justifyContent: "center"}}
                     />  
                       

                        {errors.general && (
                        <Typography variant="body2" 
                        className={classes.customError}
                        style={{display: "flex",justifyContent: "center"}}
                        >
                    {errors.general}
                        </Typography>
                    )}

                    <br></br>

                    {errors.error && (
                        <Typography variant="body2" 
                        className={classes.customError}
                        style={{display: "flex",justifyContent: "center"}}
                        >
                    {errors.error}
                        </Typography>
                    )}



                     <Button type="submit" 
                     variant="contained"  
                     color="primary"  
                    //  className={classes.button}
                     disabled={loading}
                     style={{ width: "100px",
  margin: "0 auto",
  display: "block"}}
                     
                    
                       >Sign Up</Button>
                     

<br></br>


{loading && loading
    ? <Button 
    onClick={ this.handleCancel}
                    variant="contained"  
                    color="primary"  
                    style={{display: "flex",justifyContent: "center", marginTop: "-0.5px"}}
                    className={classes.button}
                      >Cancel</Button>
    : null
  }
            
        

 <br></br>    
<small>  <Link 
 style={{display: "flex",justifyContent: "center"}}
to="/login" >Already have an account? login</Link>  </small>
<br></br>
<small>  <Link 
 style={{display: "flex",justifyContent: "center"}}
to="/" >Return To Home Page</Link>  </small>
 <br></br>
{ loading && (
<div
style={{display: "flex",justifyContent: "center"}}
>
<CircularProgress
 style={{display: "flex",justifyContent: "center"}}
 />
 </div>


)
    }

                    </form>
                </div>
             
            </div>
        )
    }
}



Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signUpUser:PropTypes.func.isRequired,
}

//takes in global state
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    signUpUser,
    setLoadingFalse,
    getUserDetails,
    setAuthorizationHeader,
}


export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Signup));




