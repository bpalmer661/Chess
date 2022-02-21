


import React, { useEffect, useState } from 'react'

import {db, auth } from './firebase'
import UsersPendingWithdrawalsCard from './UsersPendingWithdrawalsCard';



export default function UsersPendingWithdrawalsPage() {



// bpx when we deposit tokens it is not updating redux straight away, we need to update redux and also have the nav bar 
// show the exact amount of tokens at all times , ie straight after Games, straight after deposits etc etc 


const [pendingWithdrawals, setPendingWithdrawals] = useState([]);




useEffect(() => {




    const fetchTransactions = async () => {
      try {
      
        const ref = db.collection("users").doc(auth.currentUser.email).collection("pendingWithdrawals").orderBy("timestamp", 'desc');


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
Withdrawal History
</h1>
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
