import React, { useState, useEffect, useRef } from "react";
import { auth, firebase, db } from "../firebase";
function Channel() {
  const [Message, setMessage] = useState([]);
  const [newMessage, setnewMessage] = useState("");

  const endref = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!firebase.auth().currentUser) return;
    db.collection("messages").add({
      text: newMessage,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
    });
    setnewMessage("");
    endref.current.scrollIntoView({ behavior: "smooth" });
  }

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!firebase.auth().currentUser) return;
    const unsubscribe = db
      .collection("messages")
      .orderBy("createdAt")
      .limit(100)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMessage(data);
      });
    return unsubscribe;
  }, [db, firebase.auth().currentUser]);
  console.log(Message);
  return (
    <div className="channel">
      <div className="welcome">
        <h2>Welcome to React FireChat</h2>
        <h6>This is the beginning of this chat.</h6>
      </div>
      <div className="line"></div>
      {firebase.auth().currentUser ? (
        <>
          <div className="mainContent">
            {Message.map((item) => {
              return (
                <div className="maincontentItem" key={item.id}>
                  <div className="img">
                    <img src={item.photoURL} alt="" className="img-fluid" />
                  </div>
                  <div
                    className={
                      firebase.auth().currentUser.uid == item.uid
                        ? `message me`
                        : "message"
                    }
                  >
                    <h4>{item.displayName}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setnewMessage(e.target.value)}
              value={newMessage}
              className=""
              placeholder="text"
            />
            <button className="btn">send</button>
          </form>
        </>
      ) : (
        <>
          <div className="signin">
            <button className="btn" onClick={signInWithGoogle}>
              SignIn
            </button>
          </div>
        </>
      )}

      <div className="end" ref={endref}></div>
    </div>
  );
}

export default Channel;
