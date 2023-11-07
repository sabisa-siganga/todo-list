import React, { useState } from "react";
import "./loginPage.scss";

// props interface
interface Props {
  onLogin: () => void;
}

const LoginPage = (props: Props) => {
  // states
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  // destructing
  const { onLogin } = props;

  // Handling the form submission for user login
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      //  Send a POST request to the '/login' endpoint with user credentials
      const response = await fetch("/login", {
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

      // Check if the response includes a token; if not, display an error message
      if (!results.token) {
        return alert(results.message);
      }

      // Store the received token in local storage for future use
      localStorage.setItem("Token", results.token);

      // Call the 'onLogin' function to update the login status
      onLogin();
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
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
