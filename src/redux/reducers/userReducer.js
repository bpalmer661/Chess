
//userReducer.js

// import store from '../store';
import {  SET_AUTHENTICATED,SET_UNAUTHENTICATED,SET_ALL_JOB_POSTS, LOADING_USER,SET_USER,GET_REALTIME_MESSAGES,
     MARK_NOTIFICATIONS_READ, GET_REALTIME_CONVERSATIONS, UPDATE_USER, UPDATE_USER_INFO, SET_LOADING_FALSE ,DEACTIVATE_ACCOUNT,ACTIVATE_ACCOUNT,
     SET_WHITE_CLOCK_TIME ,SET_BLACK_CLOCK_TIME, SET_CLOCK_VALUES_AND_TIMESTAMP,SET_PLAYERS_COLORS, SET_PLAYERS_RATING,SET_PLAYERS_TOKENS, SET_PLAYERS_USERNAME,
     SET_PENDING_WITHDRAWAL, SET_KNOWN_WALLET_ADDRESS, SET_HAS_DEPOSITED} from "../types"



   




const initialState = {
authenticated: false,
loading: false,
credentials: {},
jobPosts:[],
usersJobs:[],
};

export default function userReducer(state = initialState,action) {





    switch(action.type){


       
        
        case SET_HAS_DEPOSITED:
            return{
                ...state,
                hasDeposited: action.payload
            }
        
    
        
        case SET_KNOWN_WALLET_ADDRESS:
    return{
        ...state,
        knownWalletAddress: action.payload
    }




    
    case SET_PENDING_WITHDRAWAL:
    return{
        ...state,
        pendingWithdrawal: action.payload
    }

    

case SET_PLAYERS_USERNAME:
    return{
        ...state,
        username: action.payload
    }




        case SET_PLAYERS_TOKENS:
                return {
                    ...state,
                    tokens : action.payload
            };



        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };

case SET_PLAYERS_RATING: 

return {
    ...state,
    rating : action.payload
}






            case SET_PLAYERS_COLORS:
            return {
                ...state,
                ...action.payload
            }

           

            case  SET_CLOCK_VALUES_AND_TIMESTAMP:
  
                return {
                    ...state,
                   ...action.payload
                };
    


            

            case SET_BLACK_CLOCK_TIME: 
            return{
                ...state,
                blackClockTime:action.payload
            }

            case SET_WHITE_CLOCK_TIME: 
            return{
                ...state,
                whiteClockTime:action.payload
            }

            case SET_UNAUTHENTICATED:
                console.log("set unauthenticated called")
                return initialState;

                case SET_ALL_JOB_POSTS:
                    return{
                        ...state,
                        jobPosts: action.payload
                    };

                        case LOADING_USER:
                            return{
                                ...state,
                                loading: true
                            };
   

    case SET_USER:
        return{
            
            authenticated: true,
            loading: false,
          ...action.payload,

          
        };

       
        case  GET_REALTIME_CONVERSATIONS:
        return{
            authenticated: true,
            loading: false,
          ...action.payload,
        };
        


case GET_REALTIME_MESSAGES:
    return {
        ...state,
        messages: action.payload
    };
    
    


case MARK_NOTIFICATIONS_READ:
state.notifications.forEach(not => not.read = true)
return {
...state
};



case UPDATE_USER:
    return{
        authenticated: true,
        loading: false,
        credentials: action.payload,
    };



    case UPDATE_USER_INFO:
    return{
        
        authenticated: true,
        loading: false,
        credentials: action.payload,

    };
 

    case  SET_LOADING_FALSE:
        return{
            authenticated: false,
            loading: false,
            credentials: {},
jobPosts:[],
usersJobs:[],
        };




case DEACTIVATE_ACCOUNT:
    return{
        ...state,
        authenticated: true,
        loading: false,
        accountExpired: true,
    };
        


case ACTIVATE_ACCOUNT:
    return{
        ...state,
        authenticated: true,
        loading: false,
        accountExpired: false,
    };
        




                    default:
                        return state;
    }
}




