import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useHistory } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  let navigate = useHistory();
  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", "true");
      setIsAuth(true);
      console.log("user logged in");
      navigate.push("/");
    });
  };
  return (
    <div className="loginPage">
      <p>Sign In With Google</p>
      <button className="login-with-google-btn" onClick={signIn}>
        Sign in
      </button>
    </div>
  );
};

export default Login;
