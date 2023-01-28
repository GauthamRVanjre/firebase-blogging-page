import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      console.log("user logged out");
      window.location.pathname = "/login";
    });
  };
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/createPost">Create Post</Link>
            <button onClick={signOutUser}>Sign out</button>
          </>
        )}
      </nav>
      <Switch>
        <Route exact path="/">
          <Home isAuth={isAuth} />
        </Route>
        <Route exact path="/login">
          <Login setIsAuth={setIsAuth} />
        </Route>
        <Route exact path="/createPost">
          <CreatePost isAuth={isAuth} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
