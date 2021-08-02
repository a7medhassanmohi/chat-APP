import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";

function useAuth() {
  const [users, setusers] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setusers(user);
    });

    console.log(users);
    return unsubscribe;
  }, [users]);
  return { users };
}

export default useAuth;
