 



import React, { useEffect, useState } from 'react'

import {db } from '../firebase'
import { useHistory } from 'react-router-dom'

import { Link } from 'react-router-dom';



export default function AdminPaidWithDrawalsPage() {




const [pendingWithdrawals, setPendingWithdrawals] = useState([]);


const history = useHistory()


const goToAdminMakePaymentsPage = () => {
  history.push('/adminPayPendingWithdrawalsPage')
}


useEffect(() => {




    const fetchTransactions = async () => {
      try {
      
        const ref = db.collection("paidWithdrawals").orderBy("timestamp", 'desc');

        const docs = await ref.get();

        let allPaidWithdrawals = [];
        docs.forEach((doc) => {
            allPaidWithdrawals.push(doc.data());
        });
        setPendingWithdrawals(allPaidWithdrawals);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTransactions();
}, []);






    

   const withdrawalsMarkup = (

    pendingWithdrawals.map((withdrawals) => { 

        


return (
<PaidWithdrawalsCard
amountPlusFee={withdrawals.amountPlusFee ?? "error 23rf4"}
amountPaid={withdrawals.amountPaid ?? "error 34r34r"}
usersWalletAddress={withdrawals.usersWalletAddress ?? "Error  134g2g"}
txnHash={withdrawals.txnHash ?? "error 23423"}
timestamp={withdrawals.timestamp ?? "Error 34r35g3g"}  
EmailOfUserWithdrawalWasPaidTo={withdrawals.EmailOfUserWithdrawalWasPaidTo ?? "error 3r34f"}
usersNewBalance={withdrawals.usersNewBalance ?? "error 3f34f"}
 
/>
)
   }) 
  


  ) 



  return (
  <div
  style={{padding:"30px",marginTop:"200px", backgroundColor:"purple"}}
  >



<br/>


<center>
<h1
style={{fontSize: "20px",color:"black"}}
> 
Paid Withdrawals
</h1>

<br/>

</center>



<center>

<br/>

<button onClick={goToAdminMakePaymentsPage}> Go To Admin Make Payments Page</button>
</center>

<br/>
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
<p style={{ borderStyle:"solid", width:"150px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px" }} > Withdrawal + Fee</p>
<p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Withdrawal Amount Paid</p>
<p style={{ borderStyle:"solid", width:"300px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Wallet Address Paid To</p>
<p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Txn Hash Number</p>
<p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  > Date  & Time Processed</p>
<p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  >Users Email</p>
<p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold',fontSize: "10px"  }}  >View Users Transaction History</p>






</div>

{withdrawalsMarkup}

</div>



</div>



</div>


  )
  



}








function PaidWithdrawalsCard(props) {



    
  
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.timestamp)
    
    
    
    
    
          return (
        
        
        
        
        <div
        style={{display:"flex", 
        }}>
        
        
        
         <p style={{ borderStyle:"solid", width:"150px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px" }} > {props.amountPlusFee}</p>
         
         <p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}  > {props.amountPaid}</p>

         <p style={{ borderStyle:"solid", width:"300px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}  > {props.usersWalletAddress}</p>
        <p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}  > {props.txnHash}</p>

        <p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}  > {date}  </p>
        <p style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px" }} > {props.EmailOfUserWithdrawalWasPaidTo}</p>

        
  

    
     <Link 
     style={{ borderStyle:"solid", width:"200px", height:"40px",padding:"5px",backgroundColor:"white",fontWeight: 'bold',fontSize: "8px"  }}
    to={{ 
        pathname: '/adminViewUsersTransactionHistory', 
        usersEmail: props.EmailOfUserWithdrawalWasPaidTo,
      }}
      >
      View Users Transaction History
    </Link>
    
        
    
        </div>
        
        
          )
        
        }
        




