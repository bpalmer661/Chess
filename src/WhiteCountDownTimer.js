
import React, { useState, useEffect,useSelector} from 'react'


function WhiteCountDownTimer() {

//18 000 is 3 seconds
const [time, setTime] = useState(180000);
const [timerOn, setTimerOn] = useState(true);







// let WhiteTimerOn = localStorage.getItem('WhiteTimerOn')


useEffect(() => {

    console.log("use effect called in white count down timer")

    function checkUserData() {
      const WhiteTimerOn = localStorage.getItem('WhiteTimerOn')
  
      console.log("this is WhiteTimerOn " + WhiteTimerOn)
      if (WhiteTimerOn) {
        setTimerOn(WhiteTimerOn)
      }
    }
  
    window.addEventListener('storage', checkUserData)
  
    return () => {
      window.removeEventListener('storage', checkUserData)
    }
  }, [])




// useEffect(() => {

//     console.log("use effect called in white count down timer")
//   if (WhiteTimerOn === true ){
//     setTimerOn(true)
//   } else {
//     setTimerOn(false)
//   }

// }, [WhiteTimerOn]);


useEffect(() => {
let interval = null;

if (timerOn) {
  interval = setInterval(() => {
    setTime((prevTime) => prevTime - 10);
  }, 10);
} else if (!timerOn) {
  clearInterval(interval);
}

return () => clearInterval(interval);
}, [timerOn]);

return (
<div className="Timers">
  <h2>White Timer</h2>
  <div id="display">
    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
    <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
  </div>

  <div id="buttons">
    {!timerOn && time === 0 && (
      <button onClick={() => setTimerOn(true)}>Start</button>
    )}
    {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
    {!timerOn && time > 0 && (
      <button onClick={() => setTime(0)}>Reset</button>
    )}
    {!timerOn && time > 0 && (
      <button onClick={() => setTimerOn(true)}>Resume</button>
    )}
  </div>
</div>
);
};

export default WhiteCountDownTimer;