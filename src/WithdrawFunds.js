


import React, { useState, useEffect} from 'react'

import axios from 'axios'
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { db,auth } from './firebase';

import { useHistory } from 'react-router-dom'

import elephant from './Images/elephantChess.png'
import { setPendingWithdrawal,setPlayersTokens } from './redux/actions/userActions';




const tokens = [
    50,
    100,
    200,
    300,
  ];
  



// on this page dont get the has deposited and pending withdrawal from redux do an async await call for both

// also do terms and condition and have them click they understand , 

// terms , you withdrawal fee is 50 tokens this must be signed before they deposit 

// also state a user can not withdrawal until the have deposited  

// and list other terms and conditions 

// also change all alerts to markups , and remember to put "return" where neccessary after doing a markup 




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


const[walletAddress, setWalletAddress] = useState();

const[showPendingWithdrawalSuccesful, setShowPendingWithdrawalSuccesful] = useState(false);


const[pendingWithdrawalHook, setPendingWithdrawalHook] = useState(false);




const[showHasNotDepositedMarkup, setShowHasNotDepositedMarkup] = useState(false);








const handleClose = () => {
  console.log("setShowPendingWithdrawalSuccesful will be set to false")
  setShowHasNotDepositedMarkup(false)
  setPendingWithdrawalHook(false)
  history.push('/usersWithdrawalHistory')
}


var hasDeposited = false
var pendingWithdrawal = false
var knownWalletAddress;


useEffect(() => {

  console.log("use effect called")
  
if(!auth.currentUser){
    window.location.href = "/login"
}


db.collection("users").doc(auth.currentUser.email).collection("pendingWithdrawalsAndAllWithdrawalHistory").where("status", "==", "pending").get().then((querySnapshot) => {

  const count = querySnapshot.size

  if (count === 0) {
    /* eslint-disable */
     pendingWithdrawal = false
    // setPendingWithdrawal(false)
    // setPendingWithdrawalHook(false)

    db.collection("users").doc(auth.currentUser.email).update({pendingWithdrawal: false}) 


db.collection("users").doc(auth.currentUser.email).get() 
.then(doc => {

  hasDeposited = doc.data().hasDeposited
  knownWalletAddress = doc.data().knownWalletAddress
  
  setPendingWithdrawalHook(false)
setWalletAddress(doc.data().knownWalletAddress)
})


  } else {

db.collection("users").doc(auth.currentUser.email).get() 
.then(doc => {

  hasDeposited = doc.data().hasDeposited
  pendingWithdrawal = doc.data().pendingWithdrawal
  knownWalletAddress = doc.data().knownWalletAddress
  
  setPendingWithdrawalHook(doc.data().pendingWithdrawal)
setWalletAddress(doc.data().knownWalletAddress)
})


  }

})









    }, [pendingWithdrawal,knownWalletAddress,hasDeposited,]);
  


    var usersEmail; 


if (auth.currentUser) {
  usersEmail = auth.currentUser.email
}





















var oneWithdrawalAtATimeMarkup = pendingWithdrawalHook === true ? (

  <center>
      <div
        style={{
         backgroundColor:"white", 
         fontSize:"20px", 
         zIndex:3,
        backgroundcolor: "red",
        
        padding:"20px",
       width:"500px",
        position: "fixed",
        top: "30%",
        left: "35%",
        borderRadius:"10px",
        borderColor:"grey",
        border: "solid"
       }}>

      
<center>

<img 
style={{width:"150px", 
padding:"20px"

}}
src={elephant} alt="hammer" 
/>

 </center>
      
      <p  
      style={{textAlign:"center",
       verticalAlign: "middle", 
       marginTop: "20px",
       marginLeft: "10px",
       marginRight: "10px",
       color:"black",
       fontSize:"20px"
       }}
      >
  Only one withdrawal can be processed at any one time please wait 3 business
   days until your withdrawal has been processed before submitting another withdrawal)
      
      
      </p>
      
      
      
      <div className=""
      
      >
               
                </div>
      
      <div
      style={{
       width: "200px",
       height: "40px",
       margin: "auto",
       marginTop: "30px",
      
      }}
      >
  
      <button 
      style={{width:"100%",
      height:"40px",
      color: "white",
      backgroundColor:"#008CBA",
      margin: "auto",
      fontSize: "20px",
      borderRadius: "5px",
      }}
      onClick={handleClose}
     
      
      >  Ok</button>
      
       </div>
       </div>
       </center>
      ) : (
        null
      )












  var withdrawalSuccesfulMarkUp = showPendingWithdrawalSuccesful === true ? (

    <center>
        <div
          style={{
           backgroundColor:"white", 
           fontSize:"20px", 
           zIndex:3,
          backgroundcolor: "red",
          
          padding:"20px",
         width:"500px",
          position: "fixed",
          top: "30%",
          left: "35%",
          borderRadius:"10px",
          borderColor:"grey",
          border: "solid"
         }}>
  
        
  <center>
  
  <img 
  style={{width:"150px", 
  padding:"20px"
  
  }}
  src={elephant} alt="hammer" 
  />
  
   </center>
        
        <p  
        style={{textAlign:"center",
         verticalAlign: "middle", 
         marginTop: "20px",
         marginLeft: "10px",
         marginRight: "10px",
         color:"black",
         fontSize:"20px"
         }}
        >
       Withdrawal Request successfull - Withdrawals can take up to 2 business days to process - 
       please ensure there is sufficient tokens in your account or the withdrawal will be denied.
        
        
        </p>
        
        
        
        <div className=""
        
        >
                 
                  </div>
        
        <div
        style={{
         width: "200px",
         height: "40px",
         margin: "auto",
         marginTop: "30px",
        
        }}
        >
    
        <button 
        style={{width:"100%",
        height:"40px",
        color: "white",
        backgroundColor:"#008CBA",
        margin: "auto",
        fontSize: "20px",
        borderRadius: "5px",
        }}
        onClick={handleClose}
       
        
        >  Ok</button>
        
         </div>
         </div>
         </center>
        ) : (
          null
        )
  






        var hasNotDepositedMarkup = showHasNotDepositedMarkup === true ? (

          <center>
              <div
                style={{
                 backgroundColor:"white", 
                 fontSize:"20px", 
                 zIndex:3,
                backgroundcolor: "red",
                
                padding:"20px",
               width:"500px",
                position: "fixed",
                top: "30%",
                left: "35%",
                borderRadius:"10px",
                borderColor:"grey",
                border: "solid"
               }}>
        
              
        <center>
        
        <img 
        style={{width:"150px", 
        padding:"20px"
        
        }}
        src={elephant} alt="hammer" 
        />
        
         </center>
              
              <p  
              style={{textAlign:"center",
               verticalAlign: "middle", 
               marginTop: "20px",
               marginLeft: "10px",
               marginRight: "10px",
               color:"black",
               fontSize:"20px"
               }}
              >
           You may only withdraw funds after making an initial deposit 
           <br/>
           keep in mind withdrawals are subject to a 50 token Withdrawal Fee
           this is to cover Admin costs and Ethereum Gas Fees.

          
              
              </p>
              
              
              
              <div className=""
              
              >
                       
                        </div>
              
              <div
              style={{
               width: "200px",
               height: "40px",
               margin: "auto",
               marginTop: "30px",
              
              }}
              >
          
              <button 
              style={{width:"100%",
              height:"40px",
              color: "white",
              backgroundColor:"#008CBA",
              margin: "auto",
              fontSize: "20px",
              borderRadius: "5px",
              }}
              onClick={() => {setShowHasNotDepositedMarkup(false)}}
             
              
              >  Ok</button>
              
               </div>
               </div>
               </center>
              ) : (
                null
              )
        
      








const submitWithdrawal = async () => {

  setError(null)

  // try to withdraw funds and make sure it loads in users transaction and users pending withdrawals and pendingwithdrawals
var hasDeposited = false
var pendingWithdrawal = true
var usersTokens
  
  await db.collection("users").doc(auth.currentUser.email).get() 
  .then(doc => {
  
    hasDeposited = doc.data().hasDeposited
    pendingWithdrawal = doc.data().pendingWithdrawal
    usersTokens = doc.data().tokens

  
   if (usersTokens) {
       dispatch(setPlayersTokens(usersTokens));
              }
  
  })

  

  if(!hasDeposited){
      

    setShowHasNotDepositedMarkup(true)


   
   return

}

console.log("this is pendingWithdrawal :" + pendingWithdrawal + " this is hasDeposited  " + hasDeposited)
    

    if(pendingWithdrawal){
      
       setPendingWithdrawalHook(true)
      
      return

  }

    try {

      

    var tokensNeeded = (Number(tokenAmount) + 50)


    if (usersTokens < tokensNeeded){
     
setError(`Insufficient Tokens - To Withdraw ${tokenAmount} You Need ${tokensNeeded} Tokens , you only have ${usersTokens}`)
return
    } 

// get adress from input por you can get it from the database and make sure the user checks it is correct
// var addr = "0x5E43C15D965a7a132401b9c1DCFd21a14037497D"

console.log("this is wallet address: " + walletAddress)

//below line of code validates the address and throws an error if the address is incorrect 
      ethers.utils.getAddress(walletAddress);


    const timestamp =  Date.now()

// Add a new document with a generated id.

db.collection("pendingWithdrawals").add({"usersWalletAddress": walletAddress, "withdrawalAmount":tokenAmount, usersEmail ,timestamp,status: "pending" })
.then((docRef) => {
  db.collection("users").doc(auth.currentUser.email).collection("pendingWithdrawalsAndAllWithdrawalHistory").doc(docRef.id)
  .set({"usersWalletAddress": walletAddress, "withdrawalAmount":tokenAmount, usersEmail ,timestamp, status: "pending"})
})
.catch((error) => {
  alert()
  console.error("Error adding document: ", error);
});



// get the doc id for above and make it the same for below


 db.collection("users").doc(auth.currentUser.email).update(({pendingWithdrawal: true, knownWalletAddress: walletAddress}))

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


const goToWithDrawalHistoryPage = () => {
    history.push('/usersWithdrawalHistory')

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


    

  return (
  


  <div
  style={{ paddingTop:"200px",padding:"50px",
  // backgroundColor:"blue",
   position:"relative"}}
  >


{withdrawalSuccesfulMarkUp}
{oneWithdrawalAtATimeMarkup}
{hasNotDepositedMarkup}

<div
  style={{ paddingTop:"80px", 
  // backgroundColor:"coral",
   position:"relative",
   }}
  >


<p
style={{fontSize:"50px",
  // backgroundColor:"green",
   textAlign:"center",color:"black",
   padding:"10px"
   
   }}

   
   
> Withdraw Funds




</p>

<center>
<img
style={{width:"120px", 
padding:"20px"

}}
 src={elephant} alt="token" />

</center>





 <center>
 <button
 style={{
color: "white",
// backgroundColor:"#008CBA",
backgroundColor:"lightBlue",
margin: "auto",
fontSize: "15px",
borderRadius: "5px",
padding:"10px",
color:"black",
}}
 onClick={goToWithDrawalHistoryPage}
 >View Withdrawal History</button>

 </center>

{roundUSD &&


    <p
    style={{
      //backgroundColor:"red", 
    textAlign:"center", color:"black",fontSize:"12px"}}
    >



{/* Your Available Tokens: { usersTokens } */}

<br/>
<br/>


Withdrawals Will Incur a 50 Token  Withdrawal Fee 
<br/>
 This Is To Cover Gas Fees and Administration
 <br/>
 Withdrawals Can Take Upto Three Business Days To Complete

<br/>
<br/>

Withdrawal Fee - 50 tokens = 0.005 Ethereum = ${ ethWithdrawalFeeInUSD.toFixed(2) }USD


<br/>
<br/>


</p>
}



</div>



<center>
<div>

<p
      style={{color:"black"}}
      >Enter Amount Of Tokens You Wish To Withdraw, Digits Only.
       </p>
<input
style={{width: "40vw"}}
 value={tokenAmount} onChange={event => setTokenAmount(event.target.value.replace(/\D/,''))}/>
      
      <br/>
      <br/>


      <p
      style={{color:"black"}}
      >WALLET ADDRESS 
       </p>
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
          style={{backgroundColor:"lightblue",
            width:"300px",
            borderRadius:"10px",
            borderColor: "black",
            padding:"5px",
            fontSize:"15px",
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
            style={{
color: "white",
// backgroundColor:"#008CBA",
backgroundColor:"lightBlue",
margin: "auto",
fontSize: "15px",
borderRadius: "5px",
padding:"8px",
color:"black",
}}
            
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
style={{backgroundColor:"red",padding:"20px",border:"solid"}}
>
ERROR: {Error}
</div>
}

  </div>
  )
}