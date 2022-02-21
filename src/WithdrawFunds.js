


import React, { useState, useEffect} from 'react'

import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from "react-redux";
import token from './Images/token.png'
import { ethers } from "ethers";
import { db,auth } from './firebase';
import dayjs from 'dayjs';

import { useHistory } from 'react-router-dom'


import { setPendingWithdrawal } from './redux/actions/userActions';

const tokens = [
    50,
    100,
    200,
    300,
  ];
  


// on this page we want to add an input , for the user to enter there metamask wallet , address, 
// then we check this wallet is legit before submitting to the database

// we database log 

// send to a collection pending withdrawals 


// and collection "users" username collection "usersWithdrawal requests " which once complete get markeded as sent with information and then they also get logged in the persons transactions
// to say the have been paid , 









export default function WithdrawFunds() {

// const classes = useStyles();
// eslint-disable-next-line

const [selectedIndex, setSelectedIndex] = useState(1);
// eslint-disable-next-line
const [amountInEth, setAmountInEth] = useState();
const [Error, setError] = useState();
// eslint-disable-next-line
const [ tx, setTxs] = useState();

const [ethWithdrawalFeeInUSD, setEthWithdrawalFeeInUSD] = useState(3)

const [tokenAmount, setTokenAmount] = useState(100)


const[tokenAmountInUsd, setTokenAmountInUsd] = useState(0);


const[walletAddress, setWalletAddress] = useState(0);

const[showPendingWithdrawalSuccesful, setShowPendingWithdrawalSuccesful] = useState(false);


const usersTokens = useSelector(state => state.user.tokens) 

var pendingWithdrawal
pendingWithdrawal = useSelector(state => state.user.pendingWithdrawal) ?? false


const handleClose = () => {
  console.log("setShowPendingWithdrawalSuccesful will be set to false")
  setShowPendingWithdrawalSuccesful(false)
  history.push('/userPendingWithdrawalsPage')
}


useEffect(() => {
  
if(!auth.currentUser){
    window.location.href = "/login"
}

    }, []);
  


    var usersEmail; 


if (auth.currentUser) {
  usersEmail = auth.currentUser.email
}



const withdrawalSuccesfulMarkUp = showPendingWithdrawalSuccesful === true ? (
  
<div
style={{  zIndex:3,backgroundColor:"white" ,
position:"absolute",
    top: "200px",
    left: "400px",
    marginTop: "-50px",
    marginLeft: "auto",
    marginRight:"auto",
    width: "500px",
    height: "500px",
    borderRadius:"25px",

}}
>
<center>
<p
style={{ fontSize: "20px", color:"black" , padding: "20px"}}
>Withdrawal Request successfull -
Withdrawals can take up to 2 business days to process -
please ensure there is sufficient tokens in your account
or the withdrawal will be denied.


</p>

<button onClick={handleClose}>  OK </button>
</center>

</div>

) : (
  null
)





// add code to submit withdrawal so that when successfull it lets them know that it was and will take 3 business days , 
// also add , Only deposit money you can afford to lose , this site was just to add a bit of fun to the game 
// not ruin your life, 

const submitWithdrawal = async () => {

    setError(null)

    if(pendingWithdrawal){
      alert("only one withdrawal can be processed at any one time please wait 3 business days until your withdrawal has been processed before submitting another withdrawal")
      return
  }

    try {

      

    var tokensNeeded = (Number(tokenAmount) + 50)


    if (usersTokens < tokensNeeded){
setError(`Insufficient Tokens - To Withdraw ${tokenAmount} You Need ${tokensNeeded} Tokens`)
    } 

// get adress from input por you can get it from the database and make sure the user checks it is correct
// var addr = "0x5E43C15D965a7a132401b9c1DCFd21a14037497D"

console.log("this is wallet address: " + walletAddress)

//below line of code validates the address and throws an error if the address is incorrect 
      ethers.utils.getAddress(walletAddress);


    const timestamp = String(dayjs()) 

// Add a new document with a generated id.

db.collection("pendingWithdrawals").add({"usersWalletAddress": walletAddress, "withdrawalAmount":tokenAmount, usersEmail ,timestamp,status: "pending" })
.then((docRef) => {
  db.collection("users").doc(auth.currentUser.email).collection("pendingWithdrawals").doc(docRef.id)
  .set({"usersWalletAddress": walletAddress, "withdrawalAmount":tokenAmount, usersEmail ,timestamp, status: "pending"})
})
.catch((error) => {
  alert()
  console.error("Error adding document: ", error);
});



// get the doc id for above and make it the same for below


 db.collection("users").doc(auth.currentUser.email).update(({pendingWithdrawal: true}))

 pendingWithdrawal = true
 

 setShowPendingWithdrawalSuccesful(true)
 
 setPendingWithdrawal(true)

    } catch (err) {
        console.log("error: " + err.message)
      setError(err.message);
    }
  }




const dispatch = useDispatch();




const history = useHistory()


const goToUsersPendingWithdrawalsPage = () => {
    console.log("withdrawFunds pressed")
    history.push('/userPendingWithdrawalsPage')

}



useEffect(() => {
    




    axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR`)
        .then(res => {
        
            let amountInEther = tokens[selectedIndex] /10000
           let etherPayment = 0.0001
           let oneGameCostUsd = res.data.USD * etherPayment



           let usd = oneGameCostUsd.toFixed(4);
           console.log(usd)
           setRoundUSD(usd)
           setAmountInEth(amountInEther)

           let withdrawalFee = 0.005
           let ethToUsdWithdrawalFee = res.data.USD * withdrawalFee
           setEthWithdrawalFeeInUSD(ethToUsdWithdrawalFee)

          let tokentoUSD = res.data.USD * tokenAmount/10000
          setTokenAmountInUsd(tokentoUSD)


        })
        .catch((e) => {
           console.log("this is e " + e)
        })

    
// eslint-disable-next-line
}, [tokenAmount,dispatch])








const [roundUSD, setRoundUSD] = useState();

// const [ErrorMessage, setErrorMessage] = useState();


    

  return (
  


  <div
  style={{ paddingTop:"200px",padding:"50px",
  backgroundColor:"blue",
   position:"relative"}}
  >


{withdrawalSuccesfulMarkUp}



<div
  style={{ paddingTop:"50px", 
  backgroundColor:"coral",
   position:"relative",
   }}
  >


<p
style={{fontSize:"60px",
  backgroundColor:"green",
   textAlign:"center",color:"black",
   
   }}
   
> Withdraw Funds




</p>

<center>
<img
style={{width:"200px", backgroundColor:"blue",

}}
 src={token} alt="token" />

</center>





 <center>
 <button
 onClick={goToUsersPendingWithdrawalsPage}
 >View Pending Withdrawals</button>

 </center>

{roundUSD &&


    <p
    style={{backgroundColor:"red", textAlign:"center", color:"black"}}
    >

YOUR WALLET DELETE WHEN DONE - ALSO add code to save users know wallet
0x5E43C15D965a7a132401b9c1DCFd21a14037497D

Your Available Tokens: { usersTokens }


Withdrawals Will Incur a 50 Token  Withdrawal Fee - This Is To Cover Gas Fees and Administration, Withdrawals Can Take Upto Three Business Days To Complete

<br/>
<br/>

50 tokens = 0.005 Ethereum = ${ ethWithdrawalFeeInUSD.toFixed(2) }USD


<br/>

<br/>

Enter Amount Of Tokens You Wish To Withdraw, Digits Only.


</p>
}



</div>



<center>
<div>



<input
style={{width: "40vw"}}
 value={tokenAmount} onChange={event => setTokenAmount(event.target.value.replace(/\D/,''))}/>
      
      <br/>
      <br/>

<input 
style={{width: "40vw"}}
value={walletAddress} onChange={event => setWalletAddress(event.target.value)}/>
      


</div>
</center>


<center>

      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
         
          <div className="">
            
            <div className="my-3">
            <h1
            style={{backgroundColor:"white",
            width:"300px"
            
            }}
            >
               { tokenAmount } Tokens =  {tokenAmount/10000} Eth =  $USD {tokenAmountInUsd.toFixed(2)} 
               
            </h1>
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            onClick={submitWithdrawal}
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            style={{width:"150px",height:"40px",fontSize:"15px"}}
            
          >
            Submit Withdrawal
          </button>
          {/* <ErrorMessage message={error} />
          <TxList txs={txs} /> */}
        </footer>
      </div>


   
</center>

{Error &&
<div
style={{backgroundColor:"red",padding:"20px"}}
>
ERROR: {Error}
</div>
}

  </div>
  )
}