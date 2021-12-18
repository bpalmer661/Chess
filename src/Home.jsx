




import React, { useEffect } from 'react';

import { auth, db } from './firebase'
import { useHistory } from 'react-router-dom'


// import AvailableGamesList from './AvailableGamesList';
// import Board from './Board';
// import BoardSquare from './BoardSquare';

import MinuteSelectionMenu from './MinutesSelectionMenu';
import chessBoard from './Images/chessboard.png'
import DollarSelectionMenu from './DollarSelectionMenu';
import { useSelector } from 'react-redux';


export default function Home() {

//     const [board, setBoard] = useState([])
//   const [position, setPosition] = useState()

console.log("home called")

    const { currentUser } = auth
    const history = useHistory()
   


const authenticated = useSelector(state => state.user.authenticated)

    useEffect(() => {
        if (!authenticated){
            auth.signOut()
        }
    }, [authenticated])

  
    const checkIfLoggedIn = () => {

        if (!currentUser) {
                     console.log("no user sending to login page")
                       window.location.href = '/login'
                 }


                 console.log("there was a user with uid of: " + currentUser.uid)

        startOnlineGame("r") 
    }


    
    
    async function startOnlineGame(startingPiece) {

console.log( "start online game called")

        const minutes = localStorage.getItem('MinutesPreference');



        const member = {
            uid: currentUser.uid,
            piece: startingPiece === 'r' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
            name: localStorage.getItem('userName'),
            creator: true,
            gameLengthInMinutes: minutes
        }


        const game = {
            status: 'waiting',
            members: [member],
            gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
            createdAt: new Date().toISOString(),
        }


   //first step search database for games, if find game connect 
   console.log( "just before db about to be called")


   
    db.collection("games").where("status", "==", "waiting").orderBy("createdAt", "desc").limit(1).get()
    .then((querySnapshot) => {


        const count = querySnapshot.size

        //if no game we create our own.
        if (count === 0) {
             db.collection('games').doc(game.gameId).set(game)
            history.push(`/game/${game.gameId}`)
        } else {
            console.log("was not zero")
        }

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", JSON.stringify(doc.data()));

console.log("this is doc.data: " + doc.data() )

console.log("this is doc.data().gameId " + doc.data().gameId )
            history.push(`/game/${doc.data().gameId}`)
        });
    })
    .catch((error) => {

        console.log("Error getting documents: ", error);
        console.log("Error getting documents: ", error);
    });



//game "status" can be "waiting", "ready", "over"


//     comment this out and it should work fine, we should be able to login inconigto and play if there is a game available , if this WorkS 
//    we then need to delete the game or mark it as being played , most likely mark it as being played,
    
        
    }

    return (
        <>
        
            <div 
            styles={{marginTop:"100px"}}
            >

         <div
         className="topBarDiv"
         
         >

        
                
                <div 
                style={{display:"flex", 
                marginTop:"100px",
                marginLeft: "auto",
                marginRight: "auto",
                // backgroundColor:"red",
                }}
              
                >

<div 
                style={{display:"flex", 
                marginLeft: "auto",
                marginRight: "auto",
                //marginLeft:"20px",
                // backgroundColor:"purple",
                }}
              
                >

                 <div
                 
               
                 >
                    <button className="button is-primary"
                    style={{width:"120px"}}
                    onClick={() => checkIfLoggedIn()
}>
                        Play
                    </button>
                    </div>


                   
                    <div>
                    <button className="button is-primary"
                    style={{width:"120px", margin: "0 0 0 5px"}}
                        onClick={() => checkIfLoggedIn()
}>
                        Play A Friend
                    </button>
                    </div>
                    


<MinuteSelectionMenu/>

<DollarSelectionMenu/>

</div>

</div>
{/* 
<div 
 style={{width:"80vh",margin:"0 auto"}}>

<AvailableGamesList/>
</div> */}

<br/>
<br/>


<div
 style={{display: "flex", marginTop:"300px",width:"80vh", height: "80vh", margin:"0 auto"}}
>



<img src={chessBoard} alt="hammer" 
                            // className={classes.image}
        
                            //style="display: flex; padding: 20px 0px 0px 0px;"
                            style={{display: "flex", marginTop:"300px", margin:"0 auto"}}
                            />
                    </div>
        
                </div>


                
            </div>



         
        </>
    )
}








