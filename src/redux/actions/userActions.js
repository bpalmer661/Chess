//userActions.js



import { 
    SET_ERRORS, 
    CLEAR_ERRORS, LOADING_UI,
     SET_UNAUTHENTICATED,
     LOADING_USER, SET_AUTHENTICATED, SET_USER, 
     STOP_LOADING_UI,
     DEACTIVATE_ACCOUNT,
     ACTIVATE_ACCOUNT,
     SET_WHITE_CLOCK_TIME,
     SET_BLACK_CLOCK_TIME,
     SET_CLOCK_VALUES_AND_TIMESTAMP,
     SET_PLAYERS_COLORS,
     SET_PLAYERS_RATING,
     SET_PLAYERS_TOKENS,
     SET_PLAYERS_USERNAME,
     SET_PENDING_WITHDRAWAL,
     SET_PLAYER,
     SET_KNOWN_WALLET_ADDRESS,
     SET_HAS_DEPOSITED,
    } from '../types'



import axios from 'axios'
import 'firebase/firestore';




export const setHasDeposited = (hasDeposited) => (dispatch) => {

    console.log("setHasDeposited" + setHasDeposited)
    dispatch({
        type: SET_HAS_DEPOSITED,
        payload: hasDeposited
    })
    }



export const setPlayer = (player) => (dispatch) => {

    console.log("setPlayer called this is player: " + player)
    dispatch({
        type: SET_PLAYER,
        payload: player
    })
    }


    
    export const setknownWalletAddress = (knownWalletAddress) => (dispatch) => {

        console.log("setknownWalletAddress called this is knownWalletAddress: " + knownWalletAddress)
        dispatch({
            type: SET_KNOWN_WALLET_ADDRESS,
            payload: knownWalletAddress
        })
        }
    


export const setPlayerRating = (rating) => (dispatch) => {

    console.log("setPlayerRating called this is rating: " + rating)
    dispatch({
        type: SET_PLAYERS_RATING,
        payload: rating
    })
    }


    

    export const setPendingWithdrawal = (pendingWithdrawal) => (dispatch) => {

        console.log("setPendingWithdrawal called this is setPendingWithdrawal: " + setPendingWithdrawal)
        dispatch({
            type: SET_PENDING_WITHDRAWAL,
            payload: setPendingWithdrawal
        })
        }
    

        


    export const setPlayersUsername = (username) => (dispatch) => {

        console.log("setPlayersUsername called this is username: " + username)
        dispatch({
            type: SET_PLAYERS_USERNAME,
            payload: username
        })
        }
    


export const setPlayersTokens = (tokens) => (dispatch) => {

    console.log("setPlayersTokens called this is tokens: " + tokens)
    dispatch({
        type: SET_PLAYERS_TOKENS,
        payload: tokens
    })
    }


export const setClockValuesAndTimeStamp = (game) => (dispatch) => {


    dispatch({
        type: SET_CLOCK_VALUES_AND_TIMESTAMP,
        payload: game
    })
    }


    export const setPlayersColor = (color) => (dispatch) => {
        dispatch({type: SET_PLAYERS_COLORS,
            payload: color 
        })
       
        }


    

export const setLoadingFalse = () => (dispatch) => {
    dispatch({type: STOP_LOADING_UI})
    }
    

export const setLoadingTrue = () => (dispatch) => {
    dispatch({ type: LOADING_UI});
    }
    






export const getUserDetails = (user) => (dispatch) => {
    
    console.log("getUserDetails Called")
dispatch({type: LOADING_USER});
    axios.get(`https://australia-southeast1-chess-51f78.cloudfunctions.net/api/user/${user}`)
    .then(res => {
        dispatch({type: SET_AUTHENTICATED});
        dispatch({
            type: SET_USER,
            payload: res.data
        })
        dispatch({type: STOP_LOADING_UI});
    })
 .catch(err => console.log("you got an error" + err.code));
}




export const getAuthenticatedUsersDetails = (user) => (dispatch) => {
    
dispatch({type: LOADING_USER});
    axios.get(`https://australia-southeast1-chess-51f78.cloudfunctions.net/api/user`)
    .then(res => {
        dispatch({type: SET_AUTHENTICATED});
        dispatch({
            type: SET_USER,
            payload: res.data
        })
        dispatch({type: STOP_LOADING_UI});
    })
 .catch(err => console.log("you got an error" + err.code));
}




export const uploadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.post('https://australia-southeast1-chess-51f78.cloudfunctions.net/api/image',formData)
    .then(() => {
      dispatch(getAuthenticatedUsersDetails())
    })
    .catch(err => console.log(err));
}


 







export const signUpUser = (user,history) => (dispatch) => {

    dispatch({ type: LOADING_UI});
    
        axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/signup',user)
    .then(res => {
    
        setAuthorizationHeader(res.data.token)

         
dispatch(getAuthenticatedUsersDetails());


    dispatch({type: CLEAR_ERRORS});
        history.push('/')
    })
    .catch(err => {
     dispatch({
         type:SET_ERRORS,
         payload: err.response.data,
     })
    });
    }





    export const setAuthorizationHeader = (token,dispatch) => {

        console.log("setAuthorizationHeader called")
        const FBTOKEN = `${token}`
        localStorage.setItem('FBToken', FBTOKEN);
        axios.defaults.headers.common['Authorization'] = FBTOKEN
       setAutheticated()
        
    }




    export const setAutheticated = () => (dispatch) => {
    
   console.log("setAutheticated called")
            dispatch({type: SET_AUTHENTICATED});
          
    }
    

    export const setWhiteClockTime = (time) => (dispatch) => {
    
        // console.log("setWhiteClockTime called time is : " + time)
              
                 dispatch({
                    type:SET_WHITE_CLOCK_TIME,
                    payload: time,
                })
         }

         
         export const setblackClockTime = (time) => (dispatch) => {
    
            // console.log("setblackClockTime called time is : " + time)
                  
                     dispatch({
                        type:SET_BLACK_CLOCK_TIME,
                        payload: time,
                    })
             }



    export const setUnAutheticated = () => (dispatch) => {
    
        console.log("SET_UNAUTHENTICATED called")
                 dispatch({type: SET_UNAUTHENTICATED});
               
         }
         



export const editUserDetails = (userDetails) =>  (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('https://australia-southeast1-chess-51f78.cloudfunctions.net/api/user', userDetails)
    .then(() => {
       
    })
    .catch(err => console.log(err));
}











export const addImageToProfile = (formData) => (dispatch) => {

    console.log("dispatch({ type: LOADING_UI}); about to be called in addImageToProfile function inside userActions.js")    
    dispatch({ type: LOADING_UI});

    console.log("addImageToProfile called ")    
    
        axios.post(`https://australia-southeast1-chess-51f78.cloudfunctions.net/api/user/addImageToProfile/`,formData)
        .then(() => {
          dispatch(getAuthenticatedUsersDetails())
          dispatch({ type: STOP_LOADING_UI})
        })
        
        .catch(err => console.log(err));
    }
    
    

    



    
    
    export const sendVerificationEmail = (email, username) => (dispatch) => {

        dispatch({ type: LOADING_UI});
        console.log("sendVerificationEmail called this is email and username " + email +  "  " + username)
 
       const formdata = {
            email: email,
            username: username,
        }

        axios.post(`https://australia-southeast1-chess-51f78.cloudfunctions.net/api/user/sendVerificationEmail/`,formdata)
        .then(() => {
          dispatch(getAuthenticatedUsersDetails())
          dispatch({ type: STOP_LOADING_UI})
        })

        .catch(err => console.log(err));
    }


    
    export const sendAccountWillBecomeInactiveInFiveDaysEmail = (email,state,username) => (dispatch) => {

        console.log("sendAccountWillBecomeInactiveInFiveDaysEmail called this is email  " + email )
 
       const formdata = {
            email: email,
            state:state,
            username:username,
        }

        axios.post(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user/sendAccountWillBecomeInactiveInFiveDaysEmail/`,formdata)
        .then(() => {
         console.log("sendAccountWillBecomeInactiveInFiveDaysEmail complete")
        })

        .catch(err => console.log(err));
    }



    export const sendEmailThatAccountHasExpired = (email) => (dispatch) => {

        console.log("sendEmailThatAccountHasExpired called this is email  " + email )
 
       const formdata = {
            email: email,
        }

        axios.post(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user/sendEmailThatAccountHasExpired/`,formdata)
        .then(() => {
         console.log("sendEmailThatAccountHasExpired complete")
        })

        .catch(err => console.log(err));
    }

    

    
    
    
    
    
       
    

    export const deactivateAccount = () =>  (dispatch) => {    
        dispatch({
            type: DEACTIVATE_ACCOUNT,
        })
}

export const activateAccount = () =>  (dispatch) => {    
    dispatch({
        type: ACTIVATE_ACCOUNT,
    })
}