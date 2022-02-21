


import React from 'react';







export default function UsersPendingWithdrawalsCard(props) {



  return (





<div
style={{display:"flex", 
}}>



 <p style={{ borderStyle:"solid", width:"80px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px" }} > {props.withdrawalAmount}</p>
 <p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}  > {props.timestamp}</p>
 <p style={{ borderStyle:"solid", width:"300px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}  > {props.usersWalletAddress}</p>
 <p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}  > {props.status}</p>
 <p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > {props.timeProcessedTimeStamp}</p>
<p style={{ borderStyle:"solid", width:"300px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "6px"  }}  > {props.txnHash}</p>



</div>


  )

}
