


import React, { useEffect, useState } from 'react'

import {db } from '../firebase'
import { Link, useLocation } from 'react-router-dom'
import UsersPendingWithdrawalsCard from '../UsersPendingWithdrawalsCard';




export default function AdminViewUsersWithdrawalHistory(props) {




const [pendingWithdrawals, setPendingWithdrawals] = useState([]);





const location = useLocation();




    
    
    // check everything is working correctly with pendingWithdrawalsAndAllWithdrawalHistory


useEffect(() => {

    if(!props.location.usersEmail){
        window.location.href = "/adminPayPendingWithdrawalsPage "
      }


    const fetchTransactions = async () => {
      try {
      
        const ref = db.collection("users").doc(props.location.usersEmail).collection("pendingWithdrawalsAndAllWithdrawalHistory").orderBy("timestamp", 'desc');


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
}, [props.location.usersEmail]);









       
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
style={{fontSize: "30px",color:"black"}}
> 
 

Admin View User's Withdrawal History - {location.usersEmail}
</h1>
<Link 
 style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}
to={{ 
    pathname: '/adminViewUsersTransactionHistory', 
    usersEmail: location.usersEmail,
  }}
  >
  Admin - View Users Transaction History
</Link>
<br/>


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
