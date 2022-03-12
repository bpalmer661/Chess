


import React, { useState } from 'react'

import CopyToClipboard from 'react-copy-to-clipboard';


export default function TransactionsCard(props) {

  

  const[copied, setCopied] = useState(false);


  var colorType;

  if (props.type ===  "Loss") {
colorType = "red"
  } else {
colorType = "green"
  }

  if (props.type ===  "deposit") {
    colorType = "blue"
  }

  if (props.type ===  "withdrawal") {
    colorType = "blue"
  }

  const [hover, setHover] = useState(false);
  const onHover = () => {
    console.log("this is copied" + copied)
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };




  const copyToClipboardMarkUp = hover === true ? (
<div
style={{backgroundColor:"white",width:"100px", position:"absolute",borderColor:"black",borderRadius:"3px", border:"2px black",
 borderStyle: "solid", padding:"10px"}}
>Copy To Clip Board
</div>
  ) : (
null
  )


let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(props.timestamp)


var amountInEth = props.amount / 10000

  return (


<div
style={{display:"flex", 
}}>
<p style={{ borderStyle:"solid", width:"90px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > {props.creditOrDebit} </p>
<p style={{ borderStyle:"solid", width:"80px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" ,color: colorType}} > {props.type}  </p>
<p style={{ borderStyle:"solid", width:"120px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > {props.amount}/{amountInEth}</p>
{copyToClipboardMarkUp}
<div  onMouseEnter={onHover}
      onMouseLeave={onLeave}
      
style={{ borderStyle:"solid", width:"200px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > 
{date} - 
  <CopyToClipboard text={props.txnHash}
          onCopy={() => setCopied(true)}
          >
          <span>{props.txnHash}</span>
        </CopyToClipboard>
       
        </div>
       
<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > {props.opponentsUsername}</p>
<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > {props.ResultBy} </p>
<p style={{ borderStyle:"solid", width:"150px",height:"40px", padding:"5px",backgroundColor:"white",fontSize: "10px" }} > {props.balance} </p>

<p style={{ borderStyle:"solid", width:"100px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold' ,fontSize: "10px" }}  > {props.ratingChange}</p>

<p style={{ borderStyle:"solid", width:"100px",height:"40px", padding:"5px",backgroundColor:"lightblue",fontWeight: 'bold' ,fontSize: "10px" }}  > {props.rating } </p>







</div>


  )

}
