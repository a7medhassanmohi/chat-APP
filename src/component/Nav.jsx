import React from "react";
import { TiWeatherNight } from "react-icons/ti";
import { HiOutlineSun } from "react-icons/hi";
import { auth, firebase } from "../firebase";

function Nav({ setisDark, isDark }) {
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="nav">
      <h4>Chat</h4>
      <div className="navBtn">
        {firebase.auth().currentUser ? (
          <button className="btn " onClick={signOut}>
            SignOut
          </button>
        ) : null}
        {!isDark ? (
          <HiOutlineSun onClick={() => setisDark(!isDark)} />
        ) : (
          <TiWeatherNight onClick={() => setisDark(!isDark)} />
        )}
      </div>
    </div>
  );
}

export default Nav;
