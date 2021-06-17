import {useState} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Views/Dashboard'
import Login from './Views/Login'
import Register from './Views/Register'
import Markets from './Views/Marketsv2'
import Profile from './Views/Profile'
import Learn from './Views/Learn'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {UserContext} from './Contexts/UserContext'
import Trading from './Views/Trading';


function App() {

  const setData = (username, token) => {
    setUserContext({
      username: username,
      token: token,
      setData: setData
    })
  }

  const [userContext, setUserContext] = useState({
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token"),
    setData: setData
  })

  return (
    <div className="App">
      <UserContext.Provider value={userContext}>
        <Router>
        <Navbar/>
          <Switch>
            <Route path="/" exact>
              <Dashboard></Dashboard>
            </Route>
            <Route path="/markets" exact>
              <Markets></Markets>
            </Route>
            <Route path="/trading/:market/" exact>
              <Trading></Trading>
            </Route>
            <Route path="/learn" exact>
              <Learn></Learn>
            </Route>
            <Route path="/login" exact>
              {userContext.token !== null ? <Redirect to="/"/> : ""}
              <Login></Login>
            </Route>
            <Route path="/register" exact>
              {userContext.token !== null ? <Redirect to="/"/> : ""}
              <Register></Register>
            </Route>
            <Route path="/profile" exact>
              {userContext.token === null ? <Redirect to="/"/> : ""}
              <Profile></Profile>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
