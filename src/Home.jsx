
//home.js 


import React, { useEffect,useState} from 'react';
import firebase from "firebase/app";
import { auth, db } from './firebase'
import { useHistory } from 'react-router-dom'


import MinuteSelectionMenu from './MinutesSelectionMenu';
import chessBoard from './Images/chessboard.png'
import DollarSelectionMenu from './DollarSelectionMenu';
import { useSelector, useDispatch } from 'react-redux';
// import { io } from 'socket.io-client'
import { setClockValuesAndTimeStamp, setPlayerRating,setPlayersTokens } from './redux/actions/userActions'
import axios from 'axios';






export default function Home() {


const [showMakePaymentMarkupBoolean, setShowMakePaymentMarkupBoolean] = useState(false)

    const { currentUser } = auth

    
    const history = useHistory()
   


const authenticated = useSelector(state => state.user.authenticated)
const rating = useSelector(state => state.user.rating) ?? 500
const userTokens = useSelector(state => state.user.tokens) ?? 0
const username = useSelector(state => state.user.username)

const dispatch = useDispatch();

  
const fetchData = async () => {

    axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR`)
    .then(res => {
    
       let etherPayment = 0.0005
       let oneGameCostUsd = res.data.USD * etherPayment
       let usd = oneGameCostUsd.toFixed(2);
       console.log(usd)

    })
    .catch((e) => {
       console.log("this is e " + e)
    })
}




useEffect(() => {

    fetchData()
    

    window.addEventListener('offline', function(e) {
        alert("No Internet Connection")
     });
        
        window.addEventListener('online', function(e) { console.log('online');
        });

}, [])














    useEffect(() => {
        if (!authenticated){
            auth.signOut()
        }


    }, [authenticated])


    const deleteAllGames = () => {

        db.collection("games").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                db.collection("games").doc(doc.id).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });


        // get the reference to the doc
let docRef= db.collection("users").doc(auth.currentUser.email)
const currentGame = "currentGame"
docRef.update({
    [currentGame]: firebase.firestore.FieldValue.delete()
});
       

    }

     //on the way to startOnlineGame() 
     //it goes 
    //checkIfLoggedInAndForMetaMask()
    //checkUserIsNotAlreadyInGame()
    //showMakePaymentMarkup()
    
    const checkIfLoggedInAndForMetaMask = () => {




        if (!currentUser) {
                     console.log("no user sending to login page")
                       window.location.href = '/login'
                 }

                 console.log("there was a user with uid of: " + currentUser.uid)

                 
                 if (userTokens <5) {
                    alert(" insufficient tokens to play - you need atleast 5 tokens - you need to buy more tokens")
                    return
                    }



                 checkUserIsNotAlreadyInGame() 
    }






const checkUserIsNotAlreadyInGame = () => {

console.log("checkUserIsNotAlreadyInGame called")
    db.collection("users").doc(auth.currentUser.email).get().then((doc) => {

        if (doc.exists) {

            const rating = doc.data().rating
            const tokens = doc.data().tokens
 
           if (rating) {
               
    dispatch(setPlayerRating(rating));
           }

           if (tokens) {
            
dispatch(setPlayersTokens(tokens));

       }


           


            const currentGame = doc.data().currentGame 
if (currentGame){

db.collection("games").doc(currentGame).get().then((doc) => {
    if (doc.exists) {
        history.push(`/game/${currentGame}`)
        return 
    } else {

//else - no current game document exists, so delete users currentGame field

        db.collection('users').doc(auth.currentUser.email).update({
             // eslint-disable-next-line
            ["currentGame"]: firebase.firestore.FieldValue.delete()
            }).catch((error) => {
              alert("error "+ error)
            });

showMakePaymentMarkup(rating)
    }
})

} else {

showMakePaymentMarkup(rating)
}
        } else { 
alert("this should never get called")
           
showMakePaymentMarkup(500)
              
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
 
}






const showMakePaymentMarkup = (rating) => {

     setShowMakePaymentMarkupBoolean(true)


}







const makePaymentMarkup = showMakePaymentMarkupBoolean === true ? (
  
<div
  style={{
   backgroundColor:"white", 
   fontSize:"20px", 
   zIndex:3,
  backgroundcolor: "red",
  position: "absolute",
  height: "100%",
 }}>




<p  
style={{textAlign:"center",
 verticalAlign: "middle", 
 marginTop: "20px",
 marginLeft: "10px",
 marginRight: "10px",
 color:"black",
 fontSize:"20px"
 }}
>
Read Carefully Then Confirm - About to play 3 Minute game for 5 Tokens, Winner receives 9 tokens.

You can still abort the game before making a move and retain your rating and tokens

</p>



<div className=""

>
         
          </div>

<div
style={{
 
 width: "200px",
 height: "40px",
 margin: "auto",
 marginTop: "30px",

}}
>

<button 

style={{width:"100%",
height:"40px",
color: "white",
backgroundColor:"#008CBA",
margin: "auto",
fontSize: "20px",
borderRadius: "5px",
}}

onClick={() => {startOnlineGame(rating) }}

>  Play</button>




<button 

style={{width:"100%",
height:"40px",
color: "white",
backgroundColor:"#008CBA",
margin: "auto",
fontSize: "20px",
borderRadius: "5px",
marginTop:"10px",
}}

onClick={() => {cancel() }}

> Cancel </button>


 </div>
 </div>
) : (
  null
)



    const cancel = () => {
        setShowMakePaymentMarkupBoolean(false)
    }



    
    async function startOnlineGame(rating) {


// var piece = ['b', 'w'][Math.round(Math.random())]

        const minutes = localStorage.getItem('MinutesPreference');

const CurrentUsersEmail = currentUser.email

        const member = {
            uid: currentUser.uid,
            piece: "w",
            name: localStorage.getItem('userName'),
            creator: true,
            gameLengthInMinutes: minutes,
            rating,
            email: auth.currentUser.email,
            username: username
        }

       
        const game = {
            status: 'waiting',
            members: [member],
            gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
            createdAt: new Date().toISOString(),
              "whiteTime": 5000,
             "blackTime": 5000,
             "whiteClockOn": false,
             "blackClockOn": false,
             "WhiteHasMoved": false,
             "BlackHasMoved": false,
             "whitePlayer": CurrentUsersEmail,  
                
        }


    dispatch(setClockValuesAndTimeStamp(game));

   
    db.collection("games").where("status", "==", "waiting").orderBy("createdAt", "desc").limit(1).get()
    .then((querySnapshot) => {

        const count = querySnapshot.size


        //if no game we create our own.
        if (count === 0) {
        
            db.collection('games').doc(game.gameId).set(game)
            .then(() => {


               db.collection("users").doc(auth.currentUser.email).update({"currentGame":game.gameId})

                history.push(`/game/${game.gameId}`)
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });



        } else {
          //else if there was a game join it.

          //says for each but it only one doc as by code above
        querySnapshot.forEach((doc) => {
           

            db.collection("users").doc(auth.currentUser.email).update({"currentGame":game.gameId})

        
            history.push(`/game/${doc.data().gameId}`)

        });
    }
    })
    .catch((error) => {

        console.log("Error getting documents: ", error);
    });


        
    }

    return (
    
        
            <div>

         <div
         className="topBarDiv"
         >

                
                <div 
                style={{display:"flex", 
                marginTop:"150px",
                marginLeft: "auto",
                marginRight: "auto",
                }}
              >

<div 
                style={{display:"flex", 
                marginLeft: "auto",
                marginRight: "auto",
                }}
              >

                 <div>

                    <button className="button is-primary"
                    style={{width:"120px"}}
                    onClick={() => checkIfLoggedInAndForMetaMask()
}>
                        Play
                    </button>
                    </div>



                    <div style={{paddingLeft:"10px",paddingRight:"10px"}}>

<button className="button is-primary"
style={{width:"120px"}}
onClick={() => deleteAllGames()
}>
    Delete All Games
</button>
</div>
                   
<MinuteSelectionMenu/>
<DollarSelectionMenu/>

</div>

</div>

<br/>
<br/>



<div
 style={{display: "flex", marginTop:"300px",width:"70vh", height: "70vh", margin:"0 auto",
 position:"relative", backgroundColor: "red",
 }}
>
{makePaymentMarkup}

<img src={chessBoard} alt="hammer" 
                            
                            style={{display: "flex", marginTop:"300px", margin:"0 auto"}}
                            />
                    </div>
                </div>
            </div>



         
        
    )
}








