import React from "react"
import './App.css';
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from './components/Base/Base';
import Index from './pages/Index/Index';
import Login from './pages/Auth/login/Login'
import Signup from './pages/Auth/signup/step1/Signup';
import Otp from './pages/Auth/signup/otp/Otp';
import BankDetails from './pages/Auth/signup/step2/BankDetails';
import Kyc from './pages/Auth/signup/KYC/Kyc';
import Home from "./pages/Home/Home";
import { connect } from "react-redux"

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Base>
              <Index />
            </Base>
          </Route>
          <Route exact path="/auth/login">
              <Login />
          </Route>
          <Route exact path="/auth/signup">
            <Signup />
          </Route>
          <Route exact path="/auth/otp">
            <Otp />
          </Route>
          <Route exact path="/auth/bank-details">
            <BankDetails />
          </Route>
          <Route exact path="/auth/kyc">
            <Kyc />
          </Route>
          <Route exact path="/home">
            <Base>
            <Home />
            </Base>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userValue: state.userValue
})

export default connect(mapStateToProps)(App)
