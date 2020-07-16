import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRouter from './functions/privateRouter';
import HomeScreen from './screens/tours/HomeScreen';
import DetailTourScreen from './screens/tours/DetailTourScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import SigninScreen from './screens/auth/SigninScreen';
import ProfileScreen from './screens/users/ProfileScreen';
import MyBookingScreen from './screens/users/MyBookingScreen';
import MyReviewScreen from './screens/users/MyReviewScreen';
//admin

function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/tour/:slug" component={DetailTourScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/login" component={SigninScreen} />
            <PrivateRouter exact path="/profile" component={ProfileScreen} />
            <PrivateRouter exact path="/my-tours/:id?" component={MyBookingScreen} />
            <PrivateRouter exact path="/my-reviews" component={MyReviewScreen} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
