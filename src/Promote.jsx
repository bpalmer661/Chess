import React from 'react'
import Square from './Square'
import { move } from './Game'

import * as Chess from 'chess.js'

const promotionPieces = ['r', 'n', 'b', 'q']


const chess = new Chess()





export default function Promote({

  promotion: { from, to, color },

}) 






{

  const callMove = (from, to, p) => {
    console.log("callMove  called")
    move(from, to, p)
  }

  const chessREf = chess
  console.log("test ")

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
