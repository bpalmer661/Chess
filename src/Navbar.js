



//navbar.js
import React, { Fragment } from 'react'


import { Link } from 'react-router-dom';
import MyButton from './util/MyButton'


import { setUnAutheticated } from './redux/actions/userActions';





///npm install @material-ui/core
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase'











export default function Navbar() {


    const dispatch = useDispatch();

    const signout = () => {
        firebase.auth().signOut().then(() => {
dispatch(setUnAutheticated())
      window.location.href = '/login';
          }).catch((error) => {
            // An error happened.
          });
    }



    const goToHomePage = () => {
        console.log("go to home page called")
        window.location.href = '/'
    }

    
      

const authenticated = useSelector(state => state.user.authenticated)
    
console.log("this is authenticated: " + authenticated)
        
    
        return (
            <AppBar>
            <Toolbar 
            style={{margin:"auto"}}
            className="nav-container">
{authenticated ? ( 

<Fragment>




<MyButton
tip="Logout"
onClick={goToHomePage}
>
 <p
 style={{color:"white"}}
 >Home</p>
</MyButton>


<MyButton
tip="Logout"
>
 <p
 style={{color:"white"}}
 >Account</p>
</MyButton>

<br/>



<br/>

<MyButton
tip="Deposit Funds"
onClick={signout}
>
 <p
 style={{color:"white"}}
 > Deposit Funds</p>
 
</MyButton>


<br/>

<MyButton
tip="Balance"
// onClick={signout}
>
 <p
 style={{color:"white"}}
 > Balance $11344.00</p>
  
</MyButton>


<MyButton
tip="Logout"
onClick={signout}
>
   <p
 style={{color:"white"}}
 > Log Out</p>
</MyButton>

</Fragment>

) : (

<Fragment> 

<Button color="inherit" component={Link} to="/"
//onClick={this.handleLogout}
> Home</Button>

<Button color="inherit" component={Link} to="/login"
//onClick={this.handleLogout}
> Login</Button>
<Button color="inherit" component={Link} to="/signup"> SignUp</Button>





</Fragment> 

) }
            </Toolbar>   
         </AppBar>
        )
    }
    
    


























