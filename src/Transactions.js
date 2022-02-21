import React, { useEffect, useState } from 'react'
import TransactionsCard from './TransactionsCard';

import {db, auth } from './firebase'



export default function Transactions() {



// bpx when we deposit tokens it is not updating redux straight away, we need to update redux and also have the nav bar 
// show the exact amount of tokens at all times , ie straight after Games, straight after deposits etc etc 


const [transactions, setTransactions] = useState([]);




useEffect(() => {




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








 







  //  let transactionsMarkup = true ? (

  //   transactions && transactions.map((transaction) => {


  //   return(
      
  //       <TransactionsCard
  //       type={transaction.type ?? "no type"}
  //       amount={transaction.amount ?? "no type"}  
  //       balance={transaction.balance ?? "no type"} 
  //       creditOrDebit={transaction.creditOrDebit ?? "no type"}  
  //       opponentEmail={transaction.opponentEmail ?? "no type"}  
  //       opponentsUID={transaction.opponentsUID ?? "no type"}  
  //       //  timestamp={transaction.timestamp ?? "no type"}  
  //        winOrLoss={transaction.winOrLoss ?? "no type"}
  //       />
  //   )
  //   })
  //       ) : ( 
  //           <h1> No Results Found</h1>
  //       ) 
    





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
 ratingChange={transaction.ratingChange ?? "na"}
 rating={transaction.rating ?? "na"}



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
Transaction History
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
<p style={{ borderStyle:"solid", width:"90px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px" }} > CREDIT/DEBIT</p>
<p style={{ borderStyle:"solid", width:"80px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px" }} > Type</p>
<p style={{ borderStyle:"solid", width:"80px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px" }} > Tokens</p>
<p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Date  & Time</p>
<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Opponents Username</p>
<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Win Or Loss By</p>

<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold' ,fontSize: "10px" }}  > Token Balance</p>

<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold' ,fontSize: "10px" }}  > Rating Change</p>

<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold' ,fontSize: "10px" }}  > Rating</p>


</div>

{transactionsMarkup}

</div>



</div>



</div>


  )
  



}
