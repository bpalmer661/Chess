
import React from 'react';




// we want to get transactions from the database, and put them on the screen , 
// then filter them , with Credits only , debits only, 

// for now just get all transactions ,





export default function TransactionsCard(props) {


  var colorType;

  if (props.type ===  "Loss") {
colorType = "red"
  } else {
colorType = "green"
  }

  if (props.type ===  "deposit") {
    colorType = "blue"
  }



  return (

    // type={transaction.type}
    // amount={transaction.amount}  
    // balance={transaction.balance} 
    // creditOrDebit={transaction.creditOrDebit}  
    // opponentEmail={transaction.opponentEmail}  
    //  amounopponentsUIDt={transaction.opponentsUID}  
    //  timestamp={transaction.timestamp}  
    //  winOrLoss={transaction.winOrLoss}

   


<div
style={{display:"flex", 
}}>
<p style={{ borderStyle:"solid", width:"90px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > {props.creditOrDebit} </p>
<p style={{ borderStyle:"solid", width:"80px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" ,color: colorType}} > {props.type}  </p>
<p style={{ borderStyle:"solid", width:"80px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > {props.amount}  </p>
<p style={{ borderStyle:"solid", width:"200px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > {props.timestamp} </p>
<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > {props.opponentsUsername}</p>
<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > {props.ResultBy} </p>
<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > {props.balance} </p>

<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold' ,fontSize: "10px" }}  > {props.ratingChange}</p>

<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold' ,fontSize: "10px" }}  > {props.rating } </p>







</div>


  )

}
