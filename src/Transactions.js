import React, { useEffect, useState } from 'react'
import TransactionsCard from './TransactionsCard';

import {db, auth } from './firebase'


import { useHistory } from 'react-router-dom'

export default function Transactions() {



const [transactions, setTransactions] = useState([]);




const history = useHistory()



const goToWithdrawalHistory = () => {
history.push('/usersWithdrawalHistory')
}




useEffect(() => {


console.log(" this is  Date.now() " +  Date.now())

    const fetchTransactions = async () => {
      try {
      
        const ref = db.collection("users").doc(auth.currentUser.email).collection("transactions").orderBy("timestamp", 'desc');

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
}, []);








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



  return (
  <div
  style={{padding:"30px",marginTop:"150px", 
  //backgroundColor:"purple"
  }}
  >

<center>
<h1
style={{fontSize: "50px",color:"black"

}}
> 
 Transaction History
</h1>

<br/>

<button 
style={{
// backgroundColor:"#008CBA",
backgroundColor:"lightBlue",
margin: "auto",
fontSize: "20px",
borderRadius: "5px",
padding:"10px",
color:"black",
marginBottom:"10px"
}}
onClick={goToWithdrawalHistory}>
View Withdrawal History </button>

</center>


<br/>





<div
style={{
  //backgroundColor:"yellow", 
margin:"auto 0"}}
>  


<div
style={{
  //backgroundColor:"blue",
margin: "auto",
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
