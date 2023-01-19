import React, { useState } from "react";
import "./LoginPage.css";
import { setToken } from "../services/token.service";
import { login } from "../services/user.service";

function LoginPage(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  //Error and Success message

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  //valid login: varify token and return token and type. Store token in localStorage

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(formData)
      .then((response) => {
        const {
          data: { message, token, type },
        } = response;

        setToken({ token, type });

        setSuccessMessage(message);
        setErrorMessage(null);
      })
      .catch((error) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        setSuccessMessage(null);
        setErrorMessage(message);
      });
    
  };

  const handleOnChange = ({ target: { name, value } }) => {
    // if(name == 'email'){
    //     return setFormData({
    //         ...formData ,
    //         email : value
    //     })
    // }

    // if (name == "password") {
    //   return setFormData({
    //     ...formData,
    //     password: value,
    //   });
    // }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign-in</h1>
{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}
        <form onSubmit={handleFormSubmit}>
          <h5>E-mail</h5>
          <input
            name="email"
            type="text"
            value={formData.email}
            onChange={handleOnChange}
          />

          <h5>Password</h5>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleOnChange}
          />

          <button type="submit" className="login__signInButton">
            Sign In
          </button>
        </form>

        <p>
          {" "}
          Conditions of Use & Sale. Please see our Privacy Notice, our Cookies
          Notice and our Interest-Based Ads Notice.
        </p>

        <button className="login__registerButton">
          Create your Appleute Account
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
