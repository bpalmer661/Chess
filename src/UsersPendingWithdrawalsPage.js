


import React, { useEffect, useState } from 'react'

import {db, auth } from './firebase'
import UsersPendingWithdrawalsCard from './UsersPendingWithdrawalsCard';
import { useHistory } from 'react-router-dom'



export default function UsersPendingWithdrawalsPage() {




const [pendingWithdrawals, setPendingWithdrawals] = useState([]);




useEffect(() => {

//in database and when wrting change pendingWithdrawals to pendingWithdrawalsAndAllWithdrawalHistory

    const fetchTransactions = async () => {
      try {
      
        const ref = db.collection("users").doc(auth.currentUser.email).collection("pendingWithdrawalsAndAllWithdrawalHistory").where("status", "==", "pending")


        const docs = await ref.get();

        let allPendingWithdrawals = [];
        docs.forEach((doc) => {
            allPendingWithdrawals.push(doc.data());
        });
        setPendingWithdrawals(allPendingWithdrawals);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTransactions();
}, []);



const history = useHistory()



const goToUsersWithdrawalHistory = () => {
  history.push('/usersWithdrawalHistory')
}




       
//{"usersWalletAddress": walletAddress, "withdrawalAmount":tokenAmount, usersEmail ,timestamp, status: "pending"})



   const withdrawalsMarkup = (

    pendingWithdrawals.map((withdrawals) => { 

return (
<UsersPendingWithdrawalsCard
usersWalletAddress={withdrawals.usersWalletAddress ?? "Error  134g2g"}
withdrawalAmount={withdrawals.withdrawalAmount ?? "Error 177g2g"}  
usersEmail={withdrawals.usersEmail ?? "Error 177g22"} 
timestamp={withdrawals.timestamp ?? "Error 34r35g3g"}  
status={withdrawals.status ?? "Error 3zxg3g"}

timeProcessedTimeStamp={withdrawals.timeProcessedTimeStamp ?? "Pending"}  
 txnHash={withdrawals.txnHash ?? "Pending"}
 
/>
)
   }) 
  


  ) 



  return (
  <div
  style={{padding:"30px",marginTop:"200px", backgroundColor:"purple"}}
  >

<center>
<h1
style={{fontSize: "20px",color:"black"}}
> 
Pending Withdrawals
</h1>

<br/>

<button onClick={goToUsersWithdrawalHistory}> View Withdrawal History</button>
</center>


<br/>





<div
style={{backgroundColor:"yellow", margin:"auto 0"}}
>  


<div
style={{backgroundColor:"blue",margin: "auto",
width: "95%"}}
>



<div
style={{display:"flex", 
}}>
<p style={{ borderStyle:"solid", width:"80px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px" }} > Withdrawal Amount</p>
<p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Date  & Time Requested</p>
<p style={{ borderStyle:"solid", width:"300px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Wallet Address</p>
<p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Status</p>

<p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Date  & Time Processed</p>

<p style={{ borderStyle:"solid", width:"300px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > txn hash / Transaction Id</p>



</div>

{withdrawalsMarkup}

</div>



</div>



</div>


  )
  



}
