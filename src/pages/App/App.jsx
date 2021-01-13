import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import authService from "../../services/authService";
import Users from '../Users/Users'
import "./App.css";

class App extends Component {
  state = {
    user: authService.getUser(),
    erikaThings :[
      {
        name: "Mint chocolate chip ice cream",
        image: 'https://simplysohealthy.com/wp-content/uploads/2017/03/cmic-1.jpg',
        attributes: ["minty fresh", 'chocolate goodness', 'feeds the soul']
      },  {
        name: "Nasa Blanket",
        image: 'https://images.fun.com/products/48499/1-1/nasa-icon-microfiber-fleece-throw.jpg',
        attributes: ["I need my Space", 'science is fun']
      }, {
        name: "Fluffy Pillow",
        image: 'https://m.media-amazon.com/images/I/71v0wAY7N-L._AC_UY218_.jpg',
        attributes: ["endless sleep", 'softness of the gods']
      },
    ]
  };

  handleLogout = () => {
    authService.logout();
    this.setState({ user: null });
    this.props.history.push("/");
  };

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() });
  };

  render() {
    const { user } = this.state
    return (
      <>
        <NavBar user={this.state.user} handleLogout={this.handleLogout}/>
        <Route
          exact
          path="/"
          render={() => (
            <main>
              <h1>Welcome. This is an authorization template.</h1>
            </main>
          )}
        />
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <Signup
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <Login
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/users"
          render={() =>
            user ? <Users /> : <Redirect to="/login" />
          }
        />
      </>
    );
  }
}

export default App;
