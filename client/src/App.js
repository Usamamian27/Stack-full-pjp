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

// Company Stuff
import EmployerLanding from './components/company/layout-employer/EmployerLanding';
import EmployerRegister from './components/company/auth/EmployerRegister';
import EmployerLogin from './components/company/auth/EmployerLogin';
import CreatePortfolio from './components/company/create-portfolio/CreatePortfolio';
import EmployerDashboard from './components/company/employer-dashboard/EmployerDashboard';
import EditPortfolio from './components/company/edit-portfolio/EditPortfolio';
import SinglePortfolio from "./components/company/singlePortfolio/SinglePortfolio";
import {setCurrentCompany} from "./actions/authActions";
import {logOutCompany} from "./actions/authActions";
import {clearCurrentPortfolio} from "./actions/portfolioActions";
import Portfolios from "./components/company/portfolios/Portfolios";
import Posts from './components/company/posts/Posts';
import SinglePost from "./components/company/singlePost/SinglePost";
import Shortlisted from "./components/company/singlePost/Shortlisted";
import EmailForm from "./components/company/EmailSending/EmailForm";
import PrivateRouteCompany from './components/common/PrivateRouteCompany';

// Admin Stuff
import AdminLogin from './components/admin/AdminLogin';
import AdminRegister from './components/admin/AdminRegister';
import {setCurrentAdmin} from "./actions/authActions";
import {logOutAdmin} from "./actions/authActions";
import PrivateRouteAdmin from './components/common/PrivateRouteAdmin';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import Approvals from './components/admin/dashboard/Approvals';


// Check for Student's token
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

// Check for Token for Company/ Employer
// Check for token
if (localStorage.Company) {
    //Set auth token header auth
    setAuthToken(localStorage.Company);
    //Decode Token & User Info & Expiry time
    const decoded = jwt_decode(localStorage.Company);
    // Set user and isAuthenticated
    store.dispatch(setCurrentCompany(decoded));


    //Check for Expired Token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout Company
        store.dispatch(logOutCompany());

        // Clear Portfolio
        store.dispatch(clearCurrentPortfolio());

        // Redirect to login
        window.location.href = '/employer-login';


    }
}

// Check for Token for Admin
// Check for token
    if (localStorage.Admin){
        //Set auth token header auth
        setAuthToken(localStorage.Admin);
        //Decode Token & User Info & Expiry time
        const decoded = jwt_decode(localStorage.Admin);
        // Set user and isAuthenticated
        store.dispatch(setCurrentAdmin(decoded));



        //Check for Expired Token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime){
            // Logout Company
            store.dispatch(logOutAdmin());

            // Clear Portfolio
            //store.dispatch(clearCurrentPortfolio());

            // Redirect to login
            window.location.href = '/admin-login';


        }

}


class App extends Component {
  render() {
    return (

        <Provider store={store}>
            <Router>
              <div className="App">
                  <Header/>
                  <Route exact path="/employer-landing" component={EmployerLanding} />
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
                      <Switch>
                          <PrivateRoute exact path="/feed" component={Posts} />
                      </Switch>
                      <Switch>
                          <PrivateRoute exact path="/student-post/:id" component={SinglePost} />
                      </Switch>

                  </div>

                  <div className="container">
                      <Route exact path="/employer-register" component={EmployerRegister}/>
                      <Route exact path="/employer-login" component={EmployerLogin}/>
                      <Route exact path="/portfolio/:handle" component={SinglePortfolio} />
                      <Route exact path="/portfolios" component={Portfolios} />
                      <Route exact path="/show-profile" component={SingleProfile} />
                      <Switch>
                          <PrivateRouteCompany exact path="/employer-dashboard" component={EmployerDashboard} />
                      </Switch>
                      <Switch>
                          <PrivateRouteCompany exact path="/create-portfolio" component={CreatePortfolio} />
                      </Switch>
                      <Switch>
                          <PrivateRouteCompany exact path="/edit-portfolio" component={EditPortfolio} />
                      </Switch>
                      <Switch>
                          <PrivateRouteCompany exact path="/employer-feed" component={Posts} />
                      </Switch>
                      <Switch>
                          <PrivateRouteCompany exact path="/post/:id" component={SinglePost} />
                      </Switch>
                      <Switch>
                          <PrivateRouteCompany exact path="/shortlisted/:id" component={Shortlisted} />
                      </Switch>
                      <Switch>
                          <PrivateRouteCompany exact path="/send-email" component={EmailForm} />
                      </Switch>



                  </div>
                  <div className="container">
                      <Route exact path="/admin-register" component={AdminRegister}/>
                      <Route exact path="/admin-login" component={AdminLogin}/>
                      <Switch>
                          <PrivateRouteAdmin exact path="/admin-dashboard" component={AdminDashboard} />
                      </Switch>
                      <Switch>
                          <PrivateRouteAdmin exact path="/approvals" component={Approvals} />
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
