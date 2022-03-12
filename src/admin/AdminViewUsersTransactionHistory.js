


import React, { useEffect, useState } from 'react'
import TransactionsCard from '../TransactionsCard';

import {db } from '../firebase'

import { Link, useLocation } from 'react-router-dom';


export default function AdminViewUsersTransactionHistory(props) {




const [transactions, setTransactions] = useState([]);






useEffect(() => {

  if(!props.location.usersEmail){
    window.location.href = "/adminPayPendingWithdrawalsPage "
  }

    const fetchTransactions = async () => {
      try {
      
        const ref = db.collection("users").doc(props.location.usersEmail).collection("transactions").orderBy("timestamp", 'desc');

        const docs = await ref.get();

        let allTransactions = [];
        docs.forEach((doc) => {
          allTransactions.push(doc.data());
        });
        setTransactions(allTransactions);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTransactions();
}, [props.location.usersEmail]);








   const transactionsMarkup = (

    transactions.map((transaction) => { 

return (
<TransactionsCard
type={transaction.type ?? "Error  134g2g"}
amount={transaction.amount ?? "Error 177g2g"}  
balance={transaction.balance ?? "Error 177g22"} 
creditOrDebit={transaction.creditOrDebit ?? "NA"}  
opponentEmail={transaction.opponentEmail ?? "NA"}  
opponentsUID={transaction.opponentsUID ?? "NA"}  
 timestamp={transaction.timestamp ?? "Error 2eg45f "}  
 winOrLoss={transaction.winOrLoss ?? "NA"}
 ResultBy={transaction.ResultBy ?? "NA"}
 opponentsUsername={transaction.opponentsUsername ?? "NA"}
 ratingChange={transaction.ratingChange ?? "NA"}
 rating={transaction.rating ?? "NA"}
 txnHash={transaction.txnHash ?? ""}



/>
)
   }) 
  


  ) 


  const location = useLocation();

  console.log("props.location" + JSON.stringify(props.location))


  console.log("props.location.usersEmail" + props.location.usersEmail)

 console.log("props" + JSON.stringify(props))

  return (
  <div
  style={{padding:"30px",marginTop:"200px", backgroundColor:"purple"}}
  >

<center>
<h1
style={{fontSize: "30px",color:"black"}}
> 


  


Admin View User's Transaction History - {location.usersEmail}
</h1>

<br/>

<Link 
 style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}
to={{ 
    pathname: '/adminViewUsersWithdrawalHistory', 
    usersEmail: location.usersEmail,
  }}
  >
  Admin - View Users Withdrawal History
</Link>


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
<p style={{ borderStyle:"solid", width:"90px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px" }} > CREDIT/DEBIT</p>
<p style={{ borderStyle:"solid", width:"80px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px" }} > Type</p>
<p style={{ borderStyle:"solid", width:"120px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px" }} > Tokens / In Eth</p>
<p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Date  & Time + TXN Hash If Applicable</p>
<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Opponents Username</p>
<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Win Or Loss By</p>

<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold' ,fontSize: "10px" }}  > Token Balance</p>

<p style={{ borderStyle:"solid", width:"100px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold' ,fontSize: "10px" }}  > Rating Change</p>

<p style={{ borderStyle:"solid", width:"100px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold' ,fontSize: "10px" }}  > Rating</p>


</div>

{transactionsMarkup}

</div>



</div>



</div>


  )
  



}
