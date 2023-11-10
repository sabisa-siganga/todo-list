import React, { useState } from "react";
import "./authPage.scss";

// props interface
interface Props {
  onLogin: () => void;
}

const AuthPage = (props: Props) => {
  // states
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [register, setRegister] = useState(false);

  // destructing
  const { onLogin } = props;

  // Handling the form submission for user login
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const path = register ? "/register-user" : "/login";

      //  Send a POST request to the '/login' endpoint with user credentials
      const response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
        }),
      });

      // Parse the response as JSON
      const results = await response.json();

      if (results.error) {
        return alert(results.error);
      }

      if (!register) {
        // Store the received token in local storage for future use
        localStorage.setItem("Token", results.token);

        // Call the 'onLogin' function to update the login status
        onLogin();
      } else {
        setPasswordValue("");
        setRegister(false);
      }
    } catch (error) {
      // handling error
      console.log(error);
    }
  };

  return (
    // login container containing username and password input fileds as well as a login button
    <div className="login-container">
      <form className="pt-5" onSubmit={onSubmit}>
        {/* username input */}
        <div className="input-field mb-4">
          <label>Username:</label>
          <input
            placeholder="Please enter username"
            value={usernameValue}
            onChange={(e) => {
              setUsernameValue(e.target.value);
            }}
          />
        </div>

        {/* username input */}
        <div className="input-field mb-4">
          <label>Password:</label>
          <input
            placeholder="Please enter password"
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
          />
        </div>

        {/*login btn */}
        <div className="login mb-4">
          <button className="login-btn" type="submit">
            {!register ? "Login" : "Register"}
          </button>
        </div>

        <div>
          {register && (
            <div className="auth-btns">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setRegister(false)}
                className="auth-btn"
              >
                Login
              </button>
            </div>
          )}
          {!register && (
            <div className="auth-btns">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setRegister(true)}
                className="auth-btn"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
