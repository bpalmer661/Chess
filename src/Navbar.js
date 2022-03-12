



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


import elephant from './Images/elephantChess.png'




export default function Navbar() {


const dispatch = useDispatch();

const history = useHistory()


const usersTokens = useSelector(state => state.user.tokens) 

// const fields = useSelector((state) => state.WHATEVER_REDUCER);

// useEffect(() => {
//     setSaveBtn(true); // show save btn if there is changes in state
// }, [fields]);

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




const [rating, setRating] = useState()
const [tokens, setTokens] = useState()




useEffect(() => {
    console.log("useEffect called for userTokens")
    setTokens(usersTokens)
}, [usersTokens])


const adminMakePaymentMarkup = auth.currentUser && auth.currentUser.email === "benpalmer661@icloud.com" ? (
    
<MyButton
tip="Logout"
onClick={goToAdminPayPendingWithdrawalsPage}
>
 <p
  style={{
      fontSize:"20px",
     color:"black",
 }}
 >Admin Make Payments</p>
</MyButton>
) : (
   
   null
)

useEffect(() => {


    const { currentUser } = auth

    // if(!currentUser){
    //     window.location.href = "/login"
    // } 

    if (currentUser) {


    db.collection("users").doc(auth.currentUser.email).get().then((doc) => {

        if (doc.exists) {

            const rating = doc.data().rating
            const tokens = String(doc.data().tokens)
            const username = doc.data().username
            const pendingWithdrawal = doc.data().pendingWithdrawal


            console.log("this is tokens: " + tokens)
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
    history.push('/deposit')

}


const withdrawFunds = () => {
    history.push('/withdraw')

}





const goToTransactionsPage = () => {
    history.push('/transactions')

    // window.location.href = '/deposit';
}
    

const authenticated = useSelector(state => state.user.authenticated)







    
        return (
            <AppBar
            style={{backgroundColor:"lightblue"}}
            >
            <Toolbar 
            style={{margin:"auto",backgroundColor:"lightblue"}}
            className="nav-container">
{authenticated ? ( 

<Fragment>

<img 
    style={{height:"100px", padding: "20px", left:"0px"}}
    src={elephant} alt="hammer" 
    //className={}
    />


<p
 style={{
    display: "inline-block",
    color:"black",
  left:200,
  width:"200px"}}
 >  {`${auth.currentUser.email} \n
 Rating ${rating} \n
 - Tokens ${tokens} 
 `} 

  </p>

 



<MyButton
tip="home"
onClick={
    () => { window.location.href = '/'
    }}
>
 <p
 style={{
     color:"black",
     fontSize:"20px",
 }}
 >Home</p>
</MyButton>





{adminMakePaymentMarkup}

<MyButton
tip="Transactions Page"
onClick={goToTransactionsPage}
>
 <p
  style={{
    fontSize:"20px",
     color:"black",
 }}
 >Transactions</p>
</MyButton>


<MyButton
tip="Deposit Funds"
onClick={depositFunds}
>
 <p
 style={{
    fontSize:"20px",
     color:"black",
 
 }}
 > Deposit</p>
 
</MyButton>


<MyButton
tip="Withdraw"
onClick={withdrawFunds}
>
 <p
 style={{
    fontSize:"20px",
     color:"black",
 }}
 > Withdraw </p>
 
</MyButton>





<br/>



<MyButton
tip="Logout"
onClick={signout}
>
   <p
  style={{
    fontSize:"20px",
     color:"black",
 }}
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
    
    























