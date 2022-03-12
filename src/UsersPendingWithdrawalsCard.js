


import React from 'react';







export default function UsersPendingWithdrawalsCard(props) {
 
const withDrawalAmountInEth = props.withdrawalAmount/10000


let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.timestamp)

var timeProcessedTimeStamp;
// if (props.timeProcessedTimeStamp){
// timeProcessedTimeStamp =  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.timeProcessedTimeStamp)
// } else {
//   timeProcessedTimeStamp = "pending"
// }

if (props.timeProcessedTimeStamp !== "Pending"){
  timeProcessedTimeStamp =  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.timeProcessedTimeStamp)
} else {
  timeProcessedTimeStamp = "Pending"
}


  return (


<div
style={{display:"flex", 
}}>



 <p style={{ borderStyle:"solid", width:"80px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px" }} > {props.withdrawalAmount} Tokens = {withDrawalAmountInEth} Eth</p>
 <p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}  > {date}</p>
 <p style={{ borderStyle:"solid", width:"300px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}  > {props.usersWalletAddress}</p>
 <p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}  > {props.status}</p>
 <p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > {timeProcessedTimeStamp}</p>
<p style={{ borderStyle:"solid", width:"300px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "6px"  }}  > {props.txnHash}</p>



</div>


  )

}
