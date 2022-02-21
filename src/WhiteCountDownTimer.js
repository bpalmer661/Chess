
import React, { useState, useEffect } from 'react'
// import { useDispatch } from "react-redux";
import { db,auth } from './firebase'
import firebase from "firebase/app";
import { useSelector } from 'react-redux'

import dayjs from 'dayjs'





function WhiteCountDownTimer(props) {



  const [showMarkup, setShowMarkup] = useState(false);

  

  const currentUsersColor = useSelector(state => state.user.position) 

   const userRating = useSelector(state => state.user.rating) 

   const usersTokens = useSelector(state => state.user.tokens) 

   const username = useSelector(state => state.user.username) 

   var opponent

  
   if (username === props.playerOne) {
     opponent = props.playerTwo 
   } 

   if (username === props.playerTwo){
    opponent = props.playerOne
   }



   var usersNewRating;



const deleteGameAndUsersCurrentGameFromDatabase = () => {


   // eslint-disable-next-line
 var result;

if (currentUsersColor === "b") {
  usersNewRating = userRating + 4
var usersNewTokenCount = usersTokens + 4

const timestamp = String(dayjs()) 

var theOponnent

if(opponent){
theOponnent = opponent
} else {
theOponnent = "na"
}


db.collection("users").doc(auth.currentUser.email).collection("transactions").add({amount:`+${4}`,
balance:usersNewTokenCount, creditOrDebit: "credit", opponentsUsername: theOponnent, opponentEmail: "NA",opponentsUID: "NA", timestamp, type: "Win",
 winOrLoss: "Win" ,ResultBy: "Opponents Time Ended",  ratingChange:`+${4}`,rating: usersNewRating  });

 //update users rating
 db.collection('users').doc(auth.currentUser.email).update({
  rating: usersNewRating,
  tokens: usersNewTokenCount,
  })


  result = "wins"
} else {

const timestamp = String(dayjs()) 



var itIstheOponnent = opponent ?? "NA"

  usersNewRating = userRating - 4 
var theUsersNewTokenCount = usersTokens - 5

db.collection("users").doc(auth.currentUser.email).collection("transactions").add({amount:`-${5}`,
balance:theUsersNewTokenCount, creditOrDebit: "debit",opponentsUsername: itIstheOponnent , opponentEmail: "NA",opponentsUID: "NA", timestamp, type: "Loss", 
winOrLoss: "Loss", ResultBy: "Your Time Ended", ratingChange:`-${4}`,rating: usersNewRating });

  //update users rating
  db.collection('users').doc(auth.currentUser.email).update({
    rating: usersNewRating,
    tokens: theUsersNewTokenCount,
    })
   


  result = "loses"
}


  


    //delete game then delete users current game field value
db.collection("games").doc(props.gameId).delete().then(() => {
  console.log("Document successfully deleted!");
 //delete currentGame field from users database
 db.collection('users').doc(auth.currentUser.email).update({
  "currentGame": firebase.firestore.FieldValue.delete()
  });
window.location.href = '/';

}).catch((error) => {
  console.error("Error removing document: ", error);
});
  }




 var [time, setTime] = useState(props.whiteTime);

const [timerOn, setTimerOn] = useState(props.whiteClockOn);

// need to use timerOn in a count down timer to display the countdown on the screen and the database refreshes the time on the screen each move










useEffect(() => {
  let interval = null;

  if (time < 0){
   setTime(0)
  }
  
  if (timerOn) {
    
  
    interval = setInterval(() => {
      
      //1000 = 1 sec
      setTime((prevTime) => prevTime - 1000);
     
      //1000 here means 1 second
    }, 1000);
  } else if (!timerOn) {
    clearInterval(interval);
  }
  
  return () => clearInterval(interval);
  }, [time, timerOn]);







useEffect(() => {
 setTimerOn(props.whiteClockOn)
  }, [props.whiteClockOn]);


useEffect(() => {
if(!isNaN(props.whiteTime)){
if (props.whiteTime !== null){
  
  setTime(props.whiteTime)
}
  }
   }, [props.whiteTime]);


 






        useEffect(() => { 

          if (time < 0){
            setTimerOn(false)

            

            setShowMarkup(true )

            deleteGameAndUsersCurrentGameFromDatabase()


                }
                // eslint-disable-next-line
              }, [time,props.gameId]);







const winnerAlertMarkup = showMarkup === true ? (

  <div
    
    style={{
     backgroundColor:"white", height:"200px",width:"450px", fontSize:"20px", position: "absolute",
     zIndex:3, borderRadius: "15px",
   
   }}>
  <p  
  style={{textAlign:"center",
   verticalAlign: "middle", 
   marginTop: "20px",
   marginLeft: "10px",
   marginRight: "10px",
   color:"black",
   }}
  >
 BLACK WINS
  </p>
  
  <div
  style={{
   
   width: "200px",
   height: "40px",
   margin: "auto",
   marginTop: "30px",
  
  }}
  >
  
  {/* <button 
  
  style={{width:"100%",
  height:"40px",
  color: "white",
  backgroundColor:"#008CBA",
  margin: "auto",
  fontSize: "20px",
  borderRadius: "5px",
  }}
  
  onClick={deleteGameAndUsersCurrentGameFromDatabase}> OK </button> */}
  
   </div>
   </div>
   
  
  ) : (
    null
  )
  



           
                

return (
<div className="Timers">

{winnerAlertMarkup}
  <h2
   style={{fontSize:"20px"
  }}
  >White</h2>

<p
   style={{fontSize:"10px",marginBottom: "5px"
  }}
  >
  
  Rating - {props.whitePlayerRating}
  
  </p>



  
  <div id="display"
   style={{backgroundColor:"white"
   
   }}
  >
    <span
    style={{fontSize:"40px"
  }}
    >{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
    <span
     style={{fontSize:"40px"
  }}
    >{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
    {/* <span>:{("0" + ((time / 10) % 100)).slice(-2)}</span> */}

  </div>

 
</div>
);
};

export default WhiteCountDownTimer;