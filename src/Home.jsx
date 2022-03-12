
//home.js 



// to deploy app watch this video
// https://www.youtube.com/watch?v=IDHfvpsYShs
//steps 

//step one
//npm run build - this create a build folder of static files that work 
//on most if not all browsers

//step two
//firebase  init
//select  hosting
// what do you want to use as your public directory? 
//  Enter "build"
//configure as a single page app? YES
//Fild build/index.html already exists. Overwrite? No

//wait until complete should be fast
//then enter in the console "firebase deploy"
//select no to deleting functions


// start coding 1 token games option,

// also try to hack it ,

// also code for mobile and tablet screens ??


// check uploaded version is correct, 

// then need to make proper noise when we capture , castle etc ? 







//to upload to git

//create repository
//set to go to project terminal

// remove every git related file  - rd means remove directory
// rd .git /S/Q

//then initilize new git repo
//git init

//then add everthing
//git add .






import React, { useEffect,useState} from 'react';
import firebase from "firebase/app";
import { auth, db } from './firebase'
import { useHistory } from 'react-router-dom'

import nordVPN from './Images/nordVPN.png'

import elephant from './Images/elephantChess.png'

import MinuteSelectionMenu from './MinutesSelectionMenu';
import chessBoard from './Images/chessboard.png'
import { useSelector, useDispatch } from 'react-redux';
// import { io } from 'socket.io-client'
import { setClockValuesAndTimeStamp, setPlayerRating,setPlayersTokens,setknownWalletAddress,setHasDeposited
   // setPlayer,

} from './redux/actions/userActions'

import BetAmountSelectionMenu from "./BetAmountSelectionMenu"



import axios from 'axios';




export default function Home() {


const [showMakePaymentMarkupBoolean, setShowMakePaymentMarkupBoolean] = useState(false)

const [showVerifyEmailMarkup, setShowVerifyEmailMarkup] = useState(false)

const [showInsufficientTokenAlert, setShowInsufficientTokenAlert] = useState(false)

const [showNotAvailableInYourCountryMarkup, setShowNotAvailableInYourCountryMarkup] = useState(false)

const [gameLength, setGameLength] = useState(180000)
    

const [betAmount, setBetAmount] = useState(2)


    const { currentUser } = auth

    
    const history = useHistory()
   


const authenticated = useSelector(state => state.user.authenticated)
const currentUsersRating = useSelector(state => state.user.rating) ?? 500
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






const createCustomGame = () => {
    alert("Custom Games Coming Soon")
}





const goToDepositPage = () => {
    history.push('/deposit')
}


//nord affiliate link
//https://go.nordvpn.net/aff_c?offer_id=15&aff_id=68144&url_id=902

//fix this markup below to contain vpn affiliate links etc 

const notAvailableInYourCountryMarkup = showNotAvailableInYourCountryMarkup === true ? (

    <center>
        <div
          style={{
           backgroundColor:"white", 
           fontSize:"20px", 
           zIndex:3,
          backgroundcolor: "white",
          border: "solid",
          borderRadius:"15px",
          position:"fixed",
          left:"40%",
          padding:"30px"
         }}>
        
        
        

        <img 
style={{width:"100px", 
padding:"5px"

}}
src={elephant} alt="hammer" 
/>

<br/> 


        
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
      Elephant Chess Is Not Available In You Country
        </p>
        

        <img 
style={{width:"200px", 
padding:"20px"

}}
src={nordVPN} alt="hammer" 
/>
        
       
 <a target="nordVPN" href='https://go.nordvpn.net/aff_c?offer_id=15&aff_id=68144&url_id=902
'>
 <button
 style={{width:"60%",
      height:"40px",
      color: "white",
      backgroundColor:"#008CBA",
      margin: "auto",
      fontSize: "20px",
      borderRadius: "5px",
      }}
>     
 Get Nord VPN
 </button>
 
 </a>
        <div className=""
        
        >
                 
                  </div>
        
        <div
        style={{
         
       
         height: "40px",
         margin: "auto",
         marginTop: "10px",
        
        }}
        >
    
        
        
        <button 
        
        style={{width:"60%",
        height:"40px",
        color: "white",
        backgroundColor:"#008CBA",
        margin: "auto",
        fontSize: "20px",
        borderRadius: "5px",
        
        }}
        
        onClick={() => {cancel() }}
        
        > Cancel </button>
        
        
         </div>
         </div>
         </center>
        ) : (
          null
        )
        






const InsufficientTokenMarkup = showInsufficientTokenAlert === true ? (

    <center>
        <div
          style={{
           backgroundColor:"white", 
           fontSize:"20px", 
           zIndex:3,
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
        Insufficient Tokens - Would you like to deposit?


Remember only ever deposit what you can afford to lose 
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
        
        onClick={() => {goToDepositPage() }}
        
        >  Deposit</button>
        
        
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
         </center>
        ) : (
          null
        )
        
        
    













const VerifyEmailMarkup = showVerifyEmailMarkup === true ? (

<center>
    <div
      style={{
       backgroundColor:"white", 
       fontSize:"20px", 
       zIndex:3,
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
    {auth.currentUser.email} has not been verified, Please
    click Send Email below to have a verification email sent to 
    your email address
    
    
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
    
    onClick={() => {sendVeriEmail() }}
    
    >  Send Email</button>
    
    
    
    
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
     </center>
    ) : (
      null
    )
    
    




    useEffect(() => {
        if (!authenticated){
            auth.signOut()
        }


    }, [authenticated])





     //on the way to startOnlineGame() 
     //it goes 
    //checkIfLoggedInAndForMetaMask()
    //checkUserIsNotAlreadyInGame()
    //showMakePaymentMarkup()


    
    const checkIfLoggedInAndForMetaMask = () => {

        if (!currentUser) {
            console.log("no user sending to login page")
              window.location.href = '/login'
              return
        }


        if (userTokens <betAmount) {
            setShowInsufficientTokenAlert(true)
            return
            }


        //let these three email play regardless of being verified or being in australia
        if(auth.currentUser.email === "benpalmer661@icloud.com" || auth.currentUser.email ===  "lame@mail.com" || auth.currentUser.email ===  "loose@mail.com" ){
            checkUserIsNotAlreadyInGame() 
            return
        }


       


if(!auth.currentUser.emailVerified){
    setShowVerifyEmailMarkup(true)
    return
}
   

                 

                        console.log("auth.currentUser.email : " + auth.currentUser.email)

                    axios.get('https://ipapi.co/json/').then((response) => {
                        let data = response.data;
            

                        //mexico calling code +52
                        //india +91

            console.log(" data.country_name " +  data.country_name + 
            " data.country_calling_code " +  data.country_calling_code)
                      
            if (data.country_calling_code === "+61"){
                // alert("Sorry No Australians - Ummmmm VPN ?")

                setShowNotAvailableInYourCountryMarkup(true)
               
               
            } else {
                //you are not in australia you can play
                checkUserIsNotAlreadyInGame() 
            }
            
                    }).catch((error) => {
                        console.log(error);
                    });
                    

  
}


const checkUserIsNotAlreadyInGame = () => {

console.log("checkUserIsNotAlreadyInGame called")
    db.collection("users").doc(auth.currentUser.email).get().then((doc) => {

        if (doc.exists) {


            const rating = doc.data().rating 
            const tokens = doc.data().tokens 
            const knownWalletAddress = doc.data().knownWalletAddress 
           const hasDeposited = doc.data().hasDeposited
         
           
           if (rating) {  
    dispatch(setPlayerRating(rating));
           }

           if (tokens) {
dispatch(setPlayersTokens(tokens));
       }

       if (knownWalletAddress) {
        dispatch(setknownWalletAddress(knownWalletAddress));
               }

               
                  
               if (hasDeposited) {
                dispatch(setHasDeposited(hasDeposited));
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
showMakePaymentMarkup(500)      
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
 
}


const sendVeriEmail = () => {
    console.log("sendVeriEmail called")
    auth.currentUser.sendEmailVerification()
}




const showMakePaymentMarkup = (rating) => {
     setShowMakePaymentMarkupBoolean(true)
}






const blocker = showMakePaymentMarkupBoolean === true ? (
    <div
     style={{
       height:"2000px",width:"110vw", fontSize:"20px", position: "absolute",
      zIndex:2, borderRadius: "15px",
    backgroundColor:"white", 
    // opacity:0.5,
    }}>
  
    </div>
  ) : (
    null
  )
  

// continue with game bet amount and put in in the mark up - and maybe just have 3 minute games for now or Both 
// have
// 5 mins for 1 token 
// 5 mins for 5 tokens

// 3 mins for 1 token
// 5 mins for 5 tokens 




const makePaymentMarkup = showMakePaymentMarkupBoolean === true ? (
  
<div
  style={{
   backgroundColor:"white", 
   fontSize:"20px", 
   zIndex:3,
  position: "absolute",
  height: "100%",
 }}>

<center>
<img 
style={{width:"100px", 
padding:"5px"

}}
src={elephant} alt="hammer" 
/>
</center>

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
Read Carefully Then Confirm 

<br/>
<br/>

About to play a {`${gameLength /60000}`} Minute game for {`${betAmount}`}  Tokens,
 The Winner receives {`${(betAmount * 1.9)}`} Tokens. 


<br/>
<br/>


You can still abort the game before making a move and retain your rating and tokens.


<br/>
<br/>


Press Play and wait for the next available opponent 




<br/>
<br/>



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

// backgroundColor:"#008CBA",
backgroundColor:"lightBlue",
margin: "auto",
fontSize: "20px",
borderRadius: "5px",
}}

onClick={() => {startOnlineGame(currentUsersRating,betAmount) }}

>  Play</button>




<button 

style={{width:"100%",
height:"40px",
color: "white",
// backgroundColor:"#008CBA",
backgroundColor:"lightBlue",
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
        setShowVerifyEmailMarkup(false)
        setShowInsufficientTokenAlert(false)
        setShowNotAvailableInYourCountryMarkup(false)

    }



const gamesList = [
];

    

const getGameWithclosestRatedOpponent = () => {
    let indexElement = 0;
    let differences = Math.abs(gamesList[0].creatorRating - currentUsersRating);
  
    for (const game of gamesList) {
      if (game.creatorRating === currentUsersRating) {
        indexElement = gamesList.indexOf(game);
        break;
      } else {
        const newDiff = Math.abs(game.creatorRating - currentUsersRating);
        if (newDiff < differences) {
          differences = newDiff;
          indexElement = gamesList.indexOf(game);
        }
      }
    }
    return indexElement;
  };
  


//   we now need to do firebase coumpoud query to find , minutes , bet amount matches , we can do the code and then 
//   leave the option to just 5 minutes for 5 tokens , 


//   the custom games 

//   then change rating so for example when a 900 beats a 400 their rating only goes up 2 but if they lose it goes does 10 





    async function startOnlineGame(currentUsersRating,theBetAmount) {

console.log("this is gameLength " + gameLength)
       
        const CurrentUsersEmail = currentUser.email
        
                const member = {
                    uid: currentUser.uid,
                    piece: "w",
                    name: localStorage.getItem('userName'),
                    creator: true,
                    gameLengthInMinutes: gameLength,
                    rating: currentUsersRating,
                    email: auth.currentUser.email,
                    username: username
                }
        
                const game = {
                    status: 'waiting',
                    members: [member],
                    gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
                    createdAt: new Date().toISOString(),
                      "whiteTime": gameLength,
                     "blackTime": gameLength,
                     "whiteClockOn": false,
                     "blackClockOn": false,
                     "WhiteHasMoved": false,
                     "BlackHasMoved": false,
                     "whitePlayer": CurrentUsersEmail, 
                     creatorRating: currentUsersRating,
                     "gameLength": gameLength ,
                     "betAmount":5
                }
        
        
            dispatch(setClockValuesAndTimeStamp(game));

            var betAmount = 5
        
        
            // easy here just get all the games with the same game length and if not available start your own game ?? 

            db.collection("games").where("status", "==", "waiting").where("betAmount", "==", betAmount).where("gameLength","==",gameLength).get()
            .then((querySnapshot) => {
        
             
                querySnapshot.forEach((doc) => {
                   
                   gamesList.push(doc.data());
        
                })
            }).then(() =>{
        
                //means no games, so we start our own
                if (gamesList.length === 0){
        
        
        //    alert("no games will start our own game")
                   
                    db.collection('games').doc(game.gameId).set(game)
                    .then(() => {
        
                       db.collection("users").doc(auth.currentUser.email).update({"currentGame":game.gameId})
        
                        history.push(`/game/${game.gameId}`)
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                } else {
        
                    //  here we check for the closest opponent to our rating and play them , though if their level 
                    //  is more than 200 points different we create our own game 
        
                    
        const gameRreatorRating = gamesList[getGameWithclosestRatedOpponent()].creatorRating
        
        const closestRankedGameId = gamesList[getGameWithclosestRatedOpponent()].gameId
        
        const ratingDifference = (Math.abs(gameRreatorRating - currentUsersRating))
        
        
        if (ratingDifference > 200){
           //start our own game to find closer ranked opponent 
        
        //    alert("available game not ranked close enough will start our own game")
        
        
            db.collection('games').doc(game.gameId).set(game)
            .then(() => {
        
               db.collection("users").doc(auth.currentUser.email).update({"currentGame":game.gameId})
                history.push(`/game/${game.gameId}`)
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
            
        } else {
        
            //join closest ranked game
            // alert("will join the closest ranked game")
               db.collection("users").doc(auth.currentUser.email).update({"currentGame":closestRankedGameId}).then(() => {
                history.push(`/game/${closestRankedGameId}`)
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
                }
        
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        
            }
            

    return (
    
        
            <div>
          
          {blocker}

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
                marginTop:"20px",
                }}
              >

                 <div
                
                 >

                    <button className="button is-primary"
                    style={{width:"120px",
                    color:"black",
                    // backgroundColor:"#008CBA",
backgroundColor:"lightBlue",
                    }}
                    onClick={() => checkIfLoggedInAndForMetaMask()
}>
                        Play
                    </button>
                    </div>



 
         
  

<MinuteSelectionMenu  onSelectMinutesAmount={(theGameLength) => setGameLength(theGameLength * 60000)}/>
<BetAmountSelectionMenu onSelectBetAmount={(handleBetAmount) => setBetAmount(handleBetAmount)}/>






<div>

<button className="button is-primary"
 style={{width:"120px",
                    color:"black",
                    marginLeft: "5px",
                    // backgroundColor:"#008CBA",
backgroundColor:"lightBlue",
                    }}
onClick={() => createCustomGame()
}>
    Custom Game
</button>
</div>

</div>

</div>

<br/>
<br/>



<div
 style={{display: "flex", marginTop:"300px",width:"70vh", height: "70vh", margin:"0 auto",
 position:"relative",
 }}
>
{makePaymentMarkup}

{VerifyEmailMarkup}
{InsufficientTokenMarkup}
{notAvailableInYourCountryMarkup}


<img src={chessBoard} alt="hammer" 
                            
                            style={{display: "flex", marginTop:"300px", margin:"0 auto"}}
                            />
                    </div>
                </div>
            </div>



         
        
    )
}










