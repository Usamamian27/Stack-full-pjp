import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import {Provider} from 'react-redux/src';
import store from './store';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from "./actions/authActions";
import {logOutUser} from "./actions/authActions";
import {clearCurrentProfile} from "./actions/profileAcions";

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login    from './components/auth/Login';
import Dashboard from './components/Dashboard/dashboard';
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from "./components/add-edu-exp/AddExperience";
import AddEducation from "./components/add-edu-exp/AddEducation";
import AddProject from "./components/add-edu-exp/AddProject";
import Profiles from "./components/profiles/Profiles";
import SingleProfile from "./components/singleProfile/SingleProfile";

import PrivateRoute from './components/common/PrivateRoute';




// Check for token
if (localStorage.Student){
    //Set auth token header auth
    setAuthToken(localStorage.Student);
    //Decode Token & User Info & Expiry time
    const decoded = jwt_decode(localStorage.Student);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));



    // Check for Expired Token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime){
        // Logout User
        store.dispatch(logOutUser());

        // Clear Profile
        store.dispatch(clearCurrentProfile());

        // Redirect to login
        window.location.href = '/login';


    }

}


class App extends Component {
  render() {
    return (

        <Provider store={store}>
            <Router>
              <div className="App">
                  <Header/>
                  <Route exact path="/" component={Landing}/>
                  <div className="container">
                      <Route exact path="/register" component={Register}/>
                      <Route exact path="/login" component={Login}/>
                      <Route exact path="/profiles" component={Profiles} />
                      <Route exact path="/profile/:handle" component={SingleProfile} />
                      <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                      </Switch>
                      <Switch>
                          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                      </Switch>
                      <Switch>
                          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                      </Switch>
                      <Switch>
                          <PrivateRoute exact path="/add-experience" component={AddExperience} />
                      </Switch>
                      <Switch>
                          <PrivateRoute exact path="/add-education" component={AddEducation} />
                      </Switch>
                      <Switch>
                          <PrivateRoute exact path="/add-project" component={AddProject} />
                      </Switch>
                  </div>
                  <Footer/>
              </div>
            </Router>
        </Provider>
    );
  }
}

export default App;
