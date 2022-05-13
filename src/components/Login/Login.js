import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [signInWithEmailAndPassword, user, loading, hooksError] =
    useSignInWithEmailAndPassword(auth);

  const handleEmailChange = (event) => {
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(event.target.value)) {
      setUserInfo({ ...userInfo, email: event.target.value });
      setErrors({ ...errors, email: "" });
    } else {
      setErrors({ ...errors, email: "Invalid Email" });
      setUserInfo({ ...userInfo, email: "" });
    }
  };

  const handlePasswordChange = (event) => {
    if (/.{6,}/.test(event.target.value)) {
      setUserInfo({ ...userInfo, password: event.target.value });
      setErrors({ ...errors, password: "" });
    } else {
      setErrors({ ...errors, password: "Minimum six characters!" });
      setUserInfo({ ...userInfo, password: "" });
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // password and email likha chara submit korle jate submit nah hoy;
    if (userInfo.email && userInfo.password) {
      signInWithEmailAndPassword(userInfo.email, userInfo.password);
    }
  };

  //   react-firebase-hooks theke jei hooksError ti asbe seti amaderke response hishebe dibe!
  // tai useEffect use korte hobe:
  useEffect(() => {
    //   toast message ti ekbar jate dekhay jotobar ei click kori nah keno toast message ti jate ekbarei dekhay tar jonne
    // {toastId:"id-1"} diye diyechi;
    if (hooksError) {
      switch (hooksError?.code) {
        case "auth/invalid-email":
          toast(
            "Invalid Email Provided ! Please Provide a Valid Email Address",
            { toastId: "id-1" }
          );
          break;

        case "auth/invalid-password":
          toast("Wrong Password! Provide a valid Password", {
            toastId: "id-2",
          });
          break;

        default:
          toast("Something Went Wrong", { toastId: "id-3" });
          break;
      }
    }
  }, [hooksError]);

  return (
    <div className="login-container">
      <div className="login-title">LOGIN</div>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          name=""
          id=""
          placeholder="Your email"
          onChange={handleEmailChange}
        />
        {errors?.email && <p className="error-message">{errors?.email}</p>}

        <input
          type="password"
          name=""
          id=""
          placeholder="Your password"
          onChange={handlePasswordChange}
        />
        {errors?.password && (
          <p className="error-message">{errors?.password}</p>
        )}
        <button>Login</button>
        <p>
          Don't have an account ? <Link to="/signup">first signUp</Link>
        </p>
      </form>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;