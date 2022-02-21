import React from 'react'
import Square from './Square'
import { move } from './Game'


const promotionPieces = ['r', 'n', 'b', 'q']



export default function Promote({

  promotion: { from, to, color },

}) 



{

  const callMove = (from, to, p) => {
    console.log("callMove  called")
    move(from, to, p)
  }


  return (
    <div className="board">
      {promotionPieces.map((p, i) => (
        <div key={i} className="promote-square">
          <Square black={i % 3 === 0}>
            <div
              className="piece-container"
              onClick={() => callMove(from, to, p)}

            >
              <img
                src={require(`./assets/${p}_${color}.png`)}
                alt=""
                className="piece cursor-pointer"
              />
            </div>
          </Square>
        </div>
      ))}
    </div>
  )
}
