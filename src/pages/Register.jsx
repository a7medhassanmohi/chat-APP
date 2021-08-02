import React, { useState, useEffect } from "react";
import { auth, firebase } from "../firebase";
const initialValue = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};
function Register() {
  const [RigisterValue, setRigisterValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    setRigisterValue({
      ...RigisterValue,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        RigisterValue.email,
        RigisterValue.password
      )
      .then(() => {
        console.log("success rgister");
        auth.currentUser.updateProfile({
          displayName: RigisterValue.firstname + " " + RigisterValue.lastname,
        });
        const firestore = firebase.database().ref(`Allusers`);
        firestore.push({
          name: RigisterValue.firstname + " " + RigisterValue.lastname,
          email: RigisterValue.email,
          id: auth.currentUser.uid,
        });
      })
      .catch((e) => {
        console.log(" rgister falid");
        console.log(e.message);
      });
  }
  console.log(RigisterValue);
  return (
    <div className="register">
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="firstname"
          placeholder="Firstname"
          className="form-control w-50 mx-auto my-3"
        />
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="lastname"
          placeholder="LastName"
          className="form-control w-50 mx-auto my-3"
        />
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
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
