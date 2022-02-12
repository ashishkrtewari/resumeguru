import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { errors } from "../lists";
import { userLoginMutation, userRegisterMutation } from "../queries";

export default (props) => {
  const formStateTypes = {
    login: "login",
    signup: "signup",
  };
  const location = useLocation();
  const renderErrorMsg = (type) => {
    return <p className="has-text-danger">{errors[type + "Error"] || type}</p>;
  };
  const [loginState, setLoginState] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    login: true,
    isValidEmail: true,
    error: false,
    submitted: false,
    isLoading: false,
  });
  const [formState, setFormState] = useState(formStateTypes.login);
  const [errorMessage, setErrorMessage] = useState(renderErrorMsg(""));
  const updateLoginState = (state) => {
    setErrorMessage(renderErrorMsg(""));
    setLoginState(state);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let error = false;
    let login = true;

    if (
      formState === formStateTypes.signup &&
      loginState.password !== loginState.confirmPassword
    ) {
      return setErrorMessage(renderErrorMsg("confirmPassword"));
    }

    updateLoginState({ ...loginState, isLoading: true, submitted: true });

    if (login && !error) {
      let response;
      try {
        response = await props.client.mutate({
          mutation:
            formState === formStateTypes.login
              ? userLoginMutation
              : userRegisterMutation,
          variables: {
            email: loginState.email,
            password: loginState.password,
            name: loginState.name,
          },
        });
      } catch (error) {
        response = error;
        updateLoginState({ ...loginState, error: true });
        return setErrorMessage(
          renderErrorMsg(response?.graphQLErrors[0]?.message)
        );
      }
      let data =
        response.data[
          formState === formStateTypes.login ? "userLogin" : "userRegister"
        ];
      if (data.user) {
        let user = data.user;
        props.handleUserUpdate(user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", user.email);
      } else {
        updateLoginState({ ...loginState, login: false, error: true });
      }
    } else {
      updateLoginState({ ...loginState, error });
    }
  };

  if (props.user) {
    return <Navigate to="/resume" state={{ from: location }} replace />;
  }
  return (
    <div className="login-wrapper is-flex is-justify-content-center is-align-items-stretch is-centered is-vcentered">
      <div className="login-container column is-7 is-flex-direction-column is-flex is-justify-content-center is-align-items-center">
        <form onSubmit={(event) => handleFormSubmit(event)}>
          {formState === formStateTypes.signup ? (
            <div className="field">
              <label className={"label has-text-left"} htmlFor="name">
                Name
              </label>
              <div className="control">
                <input
                  id="name"
                  className="input"
                  value={loginState.name}
                  onChange={(event) => {
                    updateLoginState({
                      ...loginState,
                      name: event.target.value,
                    });
                  }}
                  type="text"
                  required
                  placeholder="John Doe"
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="field">
            <label className={"label has-text-left"} htmlFor="email">
              Email
            </label>
            <div className="control">
              <input
                id="email"
                className="input"
                value={loginState.email}
                onChange={(event) => {
                  updateLoginState({
                    ...loginState,
                    email: event.target.value.toLowerCase().replace(/ /g, ""),
                  });
                }}
                type="email"
                required
                placeholder="john.doe@mail.com"
              />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-left" htmlFor="password">
              Password
            </label>
            <div className="control">
              <input
                id="password"
                className="input"
                value={loginState.password}
                onChange={(event) => {
                  updateLoginState({
                    ...loginState,
                    password: event.target.value.replace(/ /g, ""),
                  });
                }}
                type="password"
                required
                placeholder="e.g *****"
              />
            </div>
          </div>
          {formState === formStateTypes.signup ? (
            <div className="field">
              <label className="label has-text-left" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="control">
                <input
                  id="confirm-password"
                  className={"input "}
                  value={loginState.confirmPassword}
                  onChange={(event) => {
                    updateLoginState({
                      ...loginState,
                      confirmPassword: event.target.value.replace(/ /g, ""),
                    });
                    if (!loginState.login) {
                      updateLoginState({ ...loginState, login: true });
                    }
                  }}
                  type="password"
                  required
                  placeholder="e.g *****"
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {errorMessage}
          <button
            className={
              "button is-dark m-t-10 " +
              (loginState.isLoading ? "is-loading" : "")
            }
            type="submit"
          >
            {formState === formStateTypes.login ? "Login" : "Sign Up"}
          </button>
        </form>
        <div>
          <p className="mb-2">
            {formState === formStateTypes.login
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <button
            className="button is-ghost"
            type="button"
            onClick={() => {
              updateLoginState({
                ...loginState,
                name: "",
                password: "",
                confirmPassword: "",
              });
              if (formState === formStateTypes.login) {
                setFormState(formStateTypes.signup);
              } else {
                setFormState(formStateTypes.login);
              }
            }}
          >
            {formState === formStateTypes.login ? "Create" : "Login"}
          </button>
        </div>
      </div>
      <div className="column is-5 login-desc-box is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
        <h2>
          <span>Welcome to</span>
          <br></br>Resume Guru
        </h2>
        <p>Quickly create, save and download your resume.</p>
      </div>
    </div>
  );
};
