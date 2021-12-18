


import {createStore, combineReducers,applyMiddleware, compose} from 'redux'

import thunk from 'redux-thunk';


import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'
import  ExpenseReducer from './reducers/expenseReducer'


function saveToLocalStorage(state) {
    try{
        const stateJson = JSON.stringify(state)
        localStorage.setItem('state',stateJson)
    } catch(e){
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try{
        const stateJson = localStorage.getItem('state')
        if(stateJson  === null) return undefined
        return JSON.parse(stateJson)
    } catch(e){
        console.log(e)
        return undefined
    }
}





const middleware = [thunk];

//user,data,UI will be objects stored in our state.     

const reducers = combineReducers({
    user: userReducer,
    data:dataReducer,
    UI: uiReducer,
    expenses: ExpenseReducer,
})

//  const initialState = {};

const persistedState = loadFromLocalStorage()

//store , where we store the current data/state in or app
// const store = createStore(reducers, persistedState, compose(applyMiddleware(...middleware)))


//PERSISTED STATE
//checking this combination
// this combination works on local host, and works on web browser but not on mobile phone browser,
//////////////////////////
//const store = createStore(reducers, persistedState, compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
//////////////////////////





//INITIAL STATE
// this combination works on local host, and works on web browser but not on mobile phone browser,
//
//////////////////////////
//const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
//////////////////////////





//this combination to be tested
//this combination works on mobile and in browser, and local host / WORKS WITH EVERYTHING
////////////////////////
/* eslint-disable */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ &&  window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
const store = 
createStore(reducers, persistedState, 
    compose(applyMiddleware(...middleware),
    composeEnhancers))
////////////////////////



store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;




