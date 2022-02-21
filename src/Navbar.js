



//navbar.js
import React, { Fragment,useState,useEffect } from 'react'


import { Link } from 'react-router-dom';
import MyButton from './util/MyButton'

import { auth,db } from './firebase'
import { setUnAutheticated,setPlayerRating,setPlayersTokens,setPlayersUsername,setPendingWithdrawal } from './redux/actions/userActions';

import { useHistory } from 'react-router-dom'


///npm install @material-ui/core
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase'








export default function Navbar() {


const dispatch = useDispatch();

const history = useHistory()

    const signout = () => {
        firebase.auth().signOut().then(() => {
dispatch(setUnAutheticated())
      window.location.href = '/login';
          }).catch((error) => {
            // An error happened.
          });
    }

    const goToAdminPayPendingWithdrawalsPage = () => {
        history.push('/adminPayPendingWithdrawalsPage')
        
    }



    const goToHomePage = () => {
        window.location.href = '/'
    }



const [rating, setRating] = useState()
const [tokens, setTokens] = useState()


const adminMakePaymentMarkup = auth.currentUser && auth.currentUser.email === "benpalmer661@icloud.com" ? (
    
<MyButton
tip="Logout"
onClick={goToAdminPayPendingWithdrawalsPage}
>
 <p
 style={{color:"white"}}
 >Admin Make Payments</p>
</MyButton>
) : (
   
   null
)

useEffect(() => {


    const { currentUser } = auth

    if (currentUser) {


    db.collection("users").doc(auth.currentUser.email).get().then((doc) => {


        if (doc.exists) {


            const rating = doc.data().rating

            const tokens = doc.data().tokens
            const username = doc.data().username
            const pendingWithdrawal = doc.data().pendingWithdrawal


           if (username) {
               dispatch(setPlayersUsername(username))
           }
if(pendingWithdrawal) {
    dispatch(setPendingWithdrawal(pendingWithdrawal));
}


            if (tokens) {
    dispatch(setPlayersTokens(tokens));
    setTokens(tokens)
            }
 
           if (rating) {
    dispatch(setPlayerRating(rating));
    

    setRating(rating)
           }
        } 
    })
    }
 // eslint-disable-next-line
}, [])





const depositFunds = () => {
    console.log("deposit funds pressed")
    history.push('/deposit')

}


const withdrawFunds = () => {
    console.log("withdrawFunds pressed")
    history.push('/withdraw')

}





const goToTransactionsPage = () => {
    console.log("goToTransactionsPage pressed")
    history.push('/transactions')

    // window.location.href = '/deposit';
}
    

const authenticated = useSelector(state => state.user.authenticated)







    
        return (
            <AppBar>
            <Toolbar 
            style={{margin:"auto"}}
            className="nav-container">
{authenticated ? ( 

<Fragment>


<p
 style={{color:"white", left:100}}
 >  {`${auth.currentUser.email} - Rating ${rating} - Tokens ${tokens} `}  </p>

<br/>
 <br/>

 <br/>
 <br/>
 <br/>

<MyButton
tip="home"
onClick={goToHomePage}
>
 <p
 style={{color:"white"}}
 >Home</p>
</MyButton>

{adminMakePaymentMarkup}

<MyButton
tip="Transactions Page"
onClick={goToTransactionsPage}
>
 <p
 style={{color:"white"}}
 >Transactions</p>
</MyButton>


<MyButton
tip="Deposit Funds"
onClick={depositFunds}
>
 <p
 style={{color:"white"}}
 > Deposit Funds</p>
 
</MyButton>


<MyButton
tip="Deposit Funds"
onClick={withdrawFunds}
>
 <p
 style={{color:"white"}}
 > Withdraw Funds</p>
 
</MyButton>





<br/>



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
    
    


























