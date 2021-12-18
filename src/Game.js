
import { useRef} from 'react'
import * as Chess from 'chess.js'

import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { auth, db } from './firebase'
import { fromDocRef } from 'rxfire/firestore'
import { CollectionsBookmarkSharp } from '@material-ui/icons'
import io from 'socket.io-client'
let gameRef
let member

const chess = new Chess()




export let gameSubject


export async function initGame(gameRefFb) {

    const { currentUser } = auth

    if (!currentUser) {
        console.log("no user sending to login page")
          window.location.href = '/login'
    }


    if (gameRefFb) {
        gameRef = gameRefFb


        const initialGame = await gameRefFb.get().then(doc => doc.data())

        //returns not found when there is no game in the database
        if (!initialGame) {
            return 'notfound'
        }

        // finds the creator uid from the initial game object which is returned from the database
        const creator = initialGame.members.find(m => m.creator === true)


        //if the initial game is waiting for a player then person  entering the game (if not having the same uid)  becomes the player , and then database 
        //is updated with the new member and the status is set to ready.
        if (initialGame.status === 'waiting' && creator.uid !== currentUser.uid) {
            const currUser = {
                uid: currentUser.uid,
                name: localStorage.getItem('userName'),
                piece: creator.piece === 'w' ? 'b' : 'w'
            }
            const updatedMembers = [...initialGame.members, currUser]

            await gameRefFb.update({ members: updatedMembers, status: 'ready' , startTimer: true})

            
            //here we need to start the timer here.
             

            
        } else if (!initialGame.members.map(m => m.uid).includes(currentUser.uid)) {
            return 'intruder'
        }
        chess.reset()

        



        gameSubject = fromDocRef(gameRefFb).pipe(
            map(gameDoc => {
                const game = gameDoc.data()
                const { pendingPromotion, gameData, ...restOfGame } = game
                member = game.members.find(m => m.uid === currentUser.uid)
                const oponent = game.members.find(m => m.uid !== currentUser.uid)
                if (gameData) {
                    chess.load(gameData)
                }
                const isGameOver = chess.game_over()
                return {
                    board: chess.board(),
                    pendingPromotion,
                    isGameOver,
                    position: member.piece,
                    member,
                    oponent,
                    result: isGameOver ? getGameResult() : null,
                    ...restOfGame
                }
            })
        )

    } else {
        gameRef = null
        gameSubject = new BehaviorSubject()
        const savedGame = localStorage.getItem('savedGame')
        if (savedGame) {
            chess.load(savedGame)
        }
        updateGame()
    }

}




export async function resetGame() {
    if (gameRef) {
        await updateGame(null, true)
        chess.reset()
    } else {
        chess.reset()
        updateGame()
    }

}

export async function abortGame() {
 console.log("abort game caled")

}



export async function offerRematch() {
    console.log("offerRematch called")
   
   }



export function handleMove(from, to) {

console.log("handle Move called ")

    const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
    console.table(promotions)
    let pendingPromotion
    if (promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
        pendingPromotion = { from, to, color: promotions[0].color }
        updateGame(pendingPromotion)
    }

    if (!pendingPromotion) {
        move(from, to)
    }
}













export function move(from, to, promotion) {

    
    gameRef
    .onSnapshot((doc) => {
        
let status = doc.data().status

if (status !== "ready") {
    console.log("game has not started yet")
    return
}  

    });



    let tempMove = { from, to }


    if (promotion) {
        console.log("promotion was true , this is promotion: " + promotion)
        tempMove.promotion = promotion
    }

    console.log({ tempMove, member }, chess.turn())

    if (gameRef) {
    //    console.log("gameRef is: " + gameRef)
        // console.log("this is member.piece: " + member.piece + " this is chess.turn(): " +  chess.turn() )
        if (member.piece === chess.turn()) {
            const legalMove = chess.move(tempMove)
            if (legalMove) {
                console.log("legal move made will now call update game")


                
                

                updateGame()
            }
        } else {
            console.log("it's not your turn")
        }


    } else {
        console.log("else called meaning not gameRef")
        const legalMove = chess.move(tempMove)
        if (legalMove) {
            console.log("legal move made")
            updateGame()
            console.log("legal move made")
        }
    }
}

async function updateGame(pendingPromotion, reset) {
    const isGameOver = chess.game_over()

    let turn = chess.turn()
    console.log("this is whos turn it is: " + turn)


    var socket;

    socket = io.connect('http://localhost:3001')
    
    var data = {
      x: "x data",
      y: "y data",
    }
    
    socket.emit('buttonClicked',data)
    
      
    
    
   

    if (gameRef) {


        const updatedData = { gameData: chess.fen(), pendingPromotion: pendingPromotion || null }
        console.log({ updateGame })


        if (reset) {
            updatedData.status = 'over'
        }


        
        console.log(`this is updatedData ${JSON.stringify(updatedData)}`)

        await gameRef.update(updatedData)
    } else {
        const newGame = {
            board: chess.board(),
            pendingPromotion,
            isGameOver,
            position: chess.turn(),
            result: isGameOver ? getGameResult() : null
        }
        localStorage.setItem('savedGame', chess.fen())
        gameSubject.next(newGame)
    }
}
function getGameResult() {
    if (chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? 'BLACK' : 'WHITE'
        return `CHECKMATE - WINNER - ${winner}`
    } else if (chess.in_draw()) {
        let reason = '50 - MOVES - RULE'
        if (chess.in_stalemate()) {
            reason = 'STALEMATE'
        } else if (chess.in_threefold_repetition()) {
            reason = 'REPETITION'
        } else if (chess.insufficient_material()) {
            reason = "INSUFFICIENT MATERIAL"
        }
        return `DRAW - ${reason}`
    } else {
        return 'UNKNOWN REASON'
    }
}