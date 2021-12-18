









import React from 'react'
import { useState, useEffect } from 'react';

const BlackCountDownTimer = (props) => {
    const {initialMinute = 50,initialSeconds = 50} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? null
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default BlackCountDownTimer;


















// import React, { useState, useEffect,useSelector} from 'react'
// import { bindNodeCallback } from 'rxjs';


// function BlackCountDownTimer() {




// const [time, setTime] = useState(180000);
// const [timerOn, setTimerOn] = useState(true);





// let BlackTimerOn = localStorage.getItem('BlackTimerOn')



// useEffect(() => {

//   console.log("use effect called in black count down timer")

//   if (BlackTimerOn === true ){
  
//     setTimerOn(true)
//   } else {
//     setTimerOn(false)
//   }



// }, [BlackTimerOn]);






// useEffect(() => {
// let interval = null;

// if (timerOn) {
//   interval = setInterval(() => {
//     setTime((prevTime) => prevTime - 10);
//   }, 10);
// } else if (!timerOn) {
//   clearInterval(interval);
// }


// return () => clearInterval(interval);
// }, [timerOn]);

// return (
// <div className="Timers">
//   <h2>Black Timer</h2>
//   <div id="display">
//     <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
//     <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
//     <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
//   </div>

//   <div id="buttons">
//     {!timerOn && time === 0 && (
//       <button onClick={() => setTimerOn(true)}>Start</button>
//     )}
//     {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
//     {!timerOn && time > 0 && (
//       <button onClick={() => setTime(0)}>Reset</button>
//     )}
//     {!timerOn && time > 0 && (
//       <button onClick={() => setTimerOn(true)}>Resume</button>
//     )}
//   </div>
// </div>
// );
// };

// export default BlackCountDownTimer;