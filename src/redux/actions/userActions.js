
import { 
    SET_ERRORS, 
    CLEAR_ERRORS, LOADING_UI,
     SET_UNAUTHENTICATED,
     LOADING_USER, SET_AUTHENTICATED, SET_USER, 
     STOP_LOADING_UI,
     DEACTIVATE_ACCOUNT,
     ACTIVATE_ACCOUNT,
    } from '../types'

    import firebase from 'firebase/app'


import axios from 'axios'
import 'firebase/firestore';
import { 
    db,
    //auth 
} from "../../firebase";





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



    // export const logoutUser = (dispatch) => {

    //     console.log("logoutUser Called inside  userActions")
    //     localStorage.removeItem('FBToken')
    //     delete axios.defaults.headers.common["Authorization"];
    //     dispatch({type: SET_UNAUTHENTICATED })
    //     dispatch({type: SET_LOADING_FALSE })
    //     dispatch({type:  STOP_LOADING_UI})
        
    // }





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
    
    
    
    export const deleteImageFromProfile = (url, username) => (dispatch) => {
        dispatch({ type: LOADING_UI});
        db.collection("users").doc(username).update({images: firebase.firestore.FieldValue.arrayRemove(url)})
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