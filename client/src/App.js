import React, { Component } from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import {Provider} from 'react-redux/src';
import store from './store';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';



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
                  <Route exact path="/login" component={Login}/>
                  <Footer/>
              </div>
            </Router>
        </Provider>
    );
  }
}

export default App;
