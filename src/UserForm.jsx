import React, { useState } from 'react'
import { auth } from './firebase'

export default function UserForm() {
    const [name, setName] = useState('')

    const [email, setEmail] = useState('')


    const [password, setPassword] = useState('')

    

    async function handleSubmit(e) {
        e.preventDefault()
        localStorage.setItem('userName', name)

        //await auth.signInAnonymously()

        auth.signInWithEmailAndPassword(email,password)


    }


    const signup = () => {
console.log("signup called")



if (email === "" ){
    alert("please enter an email")
    return 
} 

if (password === "" ){
    alert("please enter an password")
    return 
} 


if (name === "" ){
    alert("please enter an name")
    return 
} 

auth.createUserWithEmailAndPassword(email, password)
.then((userCredential) => {
  // Signed in 
//   const user = userCredential.user;
  console.log("signed in as : " + userCredential.user)
  // ...
})
.catch((error) => {
    alert("error of: " + error.code)
//   const errorCode = error.code;
//   const errorMessage = error.message;
  // ..
});

    }






    const login = () => {
        console.log("login called")
        
        
        
        if (email === "" ){
            alert("please enter an email")
            return 
        } 
        
        if (password === "" ){
            alert("please enter an password")
            return 
        } 
        
        
        if (name === "" ){
            alert("please enter an name")
            return 
        } 
        
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("signed in as : " + userCredential.user)
          // ...
        })
        .catch((error) => {
            alert("error of: " + error.code)
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
        
            }
        
    


    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h1>Enter your name to start</h1>
            <br />
            <div className="field">
                <p className="control">
                    <input type="text"
                        name="" id=""
                        className="input"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required />

<input type="text"
                        name="" id=""
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required />

<input type="text"
                        name="" id=""
                        className="input"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required />



                </p>
            </div>
            <div className="field">
                <p className="control">
                    <button className="button is-success" type="submit">
                        Start
                    </button>

                    <div>
                    </div>
                    <br/>
                    <div>
                    </div>

                    <button className="button is-success" 
                    onClick={signup}
                    >
                        Sign Up
                    </button>

                    <button className="button is-success" 
                    onClick={login}
                    >
                        Login
                    </button>

                </p>

            </div>
        </form>
    )
}