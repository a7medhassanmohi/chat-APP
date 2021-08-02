import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
const initialValue = {
  email: "",
  password: "",
};
function Login() {
  const [Loginvalue, setLoginvalue] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setLoginvalue({
      ...Loginvalue,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(Loginvalue.email, Loginvalue.password)
      .then(() => {})
      .catch((e) => {
        console.log(e.message);
      });
  }
  console.log(Loginvalue);
  return (
    <div className="login">
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="email"
          placeholder="Email"
          className="form-control w-50 mx-auto my-3"
        />
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="password"
          placeholder="Password"
          className="form-control w-50 mx-auto my-3"
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
