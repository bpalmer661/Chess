
import React from 'react';
import './App.css'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import createTheme from '@material-ui/core/styles/createTheme'
import themeFile from './util/theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'
import GameApp from './GameApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import MinuteSelectionMenu from './MinutesSelectionMenu'
import AuthRoute from './util/AuthRoute'

import store from './redux/store';
import { Provider } from "react-redux";
import Login from './login'
import  Signup  from './signup';



//we don't put brackets on navbar like {navbar } because it doesn't connect it to the right component/ if we put { navbar } the navbar component is not connected to
//the redux store, so it does not have access to redux store data.
import  Navbar from './Navbar';


const theme = createTheme(themeFile);


export default function App() {

//   


    const [user, loading, error] = useAuthState(auth)

    if (loading) {
        console.log("this is user and error to avoid warning" , user,error)
        return 'loading ...'
        
    }
    // if (error) {
    //     return 'There was an error'
    // }


    // if (!user) {
    //     // return <UserForm />
    //     console.log("no user going to login page")
    //     return <Login />
    // }

    return (

<MuiThemeProvider theme={theme}>




<Provider store={store}>
        <Router>


        <Navbar/>
         
        <Switch>
               
       <Route exact path="/" component={Home}/>

                
    
                <AuthRoute exact path="/login"  >
         <Login />

</AuthRoute>

<AuthRoute exact path="/signup" >
         <Signup/>
</AuthRoute>

                <Route path="/MinuteSelectionMenu">
                    <MinuteSelectionMenu />
                    </Route>



                <Route path="/game/:id">
                    <GameApp />
                    </Route>

                    </Switch>

        </Router>
</Provider>
</MuiThemeProvider>
    )
}