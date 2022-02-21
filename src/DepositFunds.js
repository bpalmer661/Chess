


import React, { useState, useEffect} from 'react'
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useDispatch } from "react-redux";
import token from './Images/token.png'
import { ethers } from "ethers";
import { db,auth } from './firebase';
import dayjs from 'dayjs';

import { setPlayersTokens } from './redux/actions/userActions';

const tokens = [
    50,
    100,
    200,
    300,
  ];
  
  
  

export default function DepositFunds() {

// const classes = useStyles();
const [anchorEl, setAnchorEl] = useState(null);
const [selectedIndex, setSelectedIndex] = useState(1);
const [amountInEth, setAmountInEth] = useState();
const [Error, setError] = useState();
// eslint-disable-next-line
const [ tx, setTxs] = useState();


var playersTokens;


const makePurchase = async () => {


    setError(null)


    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.request({ method: 'eth_requestAccounts' });

    
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

var addr = "0x5E43C15D965a7a132401b9c1DCFd21a14037497D"


//below line of code validates the address and throws an error if the address is incorrect 
      ethers.utils.getAddress(addr);

      //benpalmer eth address - 0x5E43C15D965a7a132401b9c1DCFd21a14037497D
      // same address again to be sure 0x5E43C15D965a7a132401b9c1DCFd21a14037497D

      var stringEther = String(amountInEth)
      var tokensPurchased = amountInEth * 10000

      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(stringEther)
      });
      
      console.log("tx: ", tx);
      setTxs([tx]);

// here we add the transaction to the database,

const fromAddress = tx.from

console.log("this is tx.from " + tx.from)


db.collection("users").doc(auth.currentUser.email).get() 
.then(doc => {
  
    playersTokens = doc.data().tokens

    console.log("this is tokens: " + playersTokens) 
  
}).then(() => {

    var newTotal = tokensPurchased + playersTokens

    console.log("this is new Total " + newTotal)

db.collection("users").doc(auth.currentUser.email).update({tokens:newTotal})

dispatch(setPlayersTokens(newTotal));

const timestamp = String(dayjs()) 

db.collection("users").doc(auth.currentUser.email).collection("transactions").add({amount:`+${tokensPurchased}`,
balance:newTotal, creditOrDebit: "credit", opponentEmail: "NA",opponentsUID: "NA", timestamp, type: "deposit", winOrLoss: "NA" ,
hash: tx.hash, fromAddress, });

})
.catch(err => 

    console.error("this is ERROR:" + err)
    
    );
    } catch (err) {
        console.log("error: " + err.message)
      setError(err.message);
    }
  };








//   tx:  {hash: '0xe4cbadc487d3368803c49f2923a1f991d95755bf90934eca7921d1e100f335ef', 
//   type: 2, accessList: null, blockHash: null, blockNumber: null, …}accessList: nullblockHash: nullblockNumber: nullchainId: 
//   0confirmations: 0creates: nulldata: "0x"
//   from: "0x5E43C15D965a7a132401b9c1DCFd21a14037497D"gasLimit: BigNumber
//    {_hex: '0x5208', _isBigNumber: true}
//   gasPrice: BigNumber {_hex: '0x908a904f', _isBigNumber: true}hash: "0xe4cbadc487d3368803c49f2923a1f991d95755bf90934eca7921d1e100f335ef"
//   maxFeePerGas: BigNumber {_hex: '0x908a904f', _isBigNumber: true}maxPriorityFeePerGas: BigNumber {_hex: '0x908a9040', _isBigNumber: true}nonce: 1r: "0x12d48c0d86607fb9205cd60775b6f7ce978b6fec9929f64f86e8c09f1255f312"s: "0x5b953a184628ccfff7a4c95a9e8b177a551c4eb43dfee54ae476a27bdff16dac"to: "0x5E43C15D965a7a132401b9c1DCFd21a14037497D"transactionIndex: nulltype: 2v: 0value: BigNumber {_hex: '0x2386f26fc10000', _isBigNumber: true}wait: (confirms, timeout) => {…}[[Prototype]]: Object












const dispatch = useDispatch();




const handleClickListItem = (event) => {
  setAnchorEl(event.currentTarget);
};

useEffect(() => {

    axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR`)
        .then(res => {
        
            let amountInEther = tokens[selectedIndex] /10000
           let etherPayment = 0.0001
           let oneGameCostUsd = res.data.USD * etherPayment
           let usd = oneGameCostUsd.toFixed(4);
           console.log(usd)
           setRoundUSD(usd)
           setAmountInEth(amountInEther)

        })
        .catch((e) => {
           console.log("this is e " + e)
        })

    

}, [selectedIndex,dispatch])




const handleMenuItemClick = (event, index) => {
  setSelectedIndex(index);
  setAnchorEl(null);
};


const handleClose = () => {
  setAnchorEl(null);
};



const [roundUSD, setRoundUSD] = useState();

// const [ErrorMessage, setErrorMessage] = useState();


    

  return (
  


  <div
  style={{ paddingTop:"200px",padding:"50px",
  backgroundColor:"blue",
   position:"relative"}}
  >

<div
  style={{ paddingTop:"50px", 
  backgroundColor:"coral",
   position:"relative",
   }}
  >



<p
style={{fontSize:"60px",
  backgroundColor:"green",
   textAlign:"center",color:"black",
   
   }}
   
> PURCHASE TOKENS

</p>

<center>
<img
style={{width:"200px", backgroundColor:"blue",

}}
 src={token} alt="token" />
 </center>




{roundUSD &&



    <p
    style={{backgroundColor:"red", textAlign:"center", color:"black"}}
    
    >

1 Token = 0.0001 Etheruem 
<br/>
0.0001 Eth = ${ roundUSD } USD

<br/>
<br/>

100 Tokens = 0.0100 Etheruem 
<br/>
0.0100 Eth = ${ (roundUSD * 100).toFixed(2) }USD

</p>
}


<center>
<div 
style={{padding:"20px"}}
    >

  
      <List
       style={{
        height: "46px",
        width:"300px",
        border: "1px solid #dfe1e5",
        borderRadius: "0px",
        boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
        hoverBackgroundColor: "#eee",
        color: "#212121",
        fontSize: "1vw",
        fontFamily: "Arial",
        iconColor: "grey",
        lineColor: "rgb(232, 234, 237)",
        placeholderColor: "grey",
        padding:"0px",
        left:"0"

        
       }}
      component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
          style={{width:"200px",height:"44px",backgroundColor:"yellow"}}
          
        >
          <ListItemText 
         
          primary=
       
          {` Purchase ${tokens[selectedIndex]} Tokens`} 
          
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{width:"20vw",backgroundColor:"blue"}}
      >
        {tokens.map((token, index) => (
            <center>
          <MenuItem
          style={{width:"300px", backgroundColor:"red"}}

            key={token}
            
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
          


             {`${token} Tokens`}
          
          </MenuItem>
          </center>
        ))}
      </Menu>
    </div>
</center>

</div>

<center>

      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
         
          <div className="">
            
            <div className="my-3">
            <h1
            style={{backgroundColor:"white",
            width:"300px"
            
            }}
            >
               { tokens[selectedIndex] } Tokens = Etheruem {amountInEth} =  ${((roundUSD * tokens[selectedIndex]).toFixed(2))}USD 
            </h1>
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            onClick={makePurchase}
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            style={{width:"150px",height:"40px",fontSize:"15px"}}
            
          >
            Purchase
          </button>
          {/* <ErrorMessage message={error} />
          <TxList txs={txs} /> */}
        </footer>
      </div>


   
</center>

{Error &&
<div
style={{backgroundColor:"red",padding:"20px"}}
>
ERROR: {Error}
</div>
}

  </div>
  )
}