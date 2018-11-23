import React, { Component } from 'react';
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import {Provider} from 'react-redux/src';
import store from './store';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from "./actions/authActions";

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard/dashboard';


// Check for token
if (localStorage.Student){
    //Set auth token header auth
    setAuthToken(localStorage.Student);
    //Decode Token & User Info & Expiry time
    const decoded = jwt_decode(localStorage.Student);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
}


class App extends Component {
  render() {
    return (

        <Provider store={store}>
            <Router>
              <div className="App">
                  <Register/>
                  <Login/>
                  <Header/>
                  <Route exact path="/" component={Landing}/>
                  <Footer/>
                  <Switch>
                      <Route exact path="/dashboard" component={Dashboard}/>
                  </Switch>
              </div>
            </Router>
        </Provider>
    );
  }
}

export default App;
