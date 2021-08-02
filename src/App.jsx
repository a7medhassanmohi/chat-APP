import React, { useState, useEffect } from "react";
import { auth, firebase } from "./firebase";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min";
import "popper.js/dist/umd/popper.min";
import "bootstrap/dist/js/bootstrap.min";

import "./App.css";
import Channel from "./component/Channel";
import Nav from "./component/Nav";

function App() {
  const [users, setusers] = useState(null);
  const [isDark, setisDark] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setusers(user);
    });
    return unsubscribe;
  }, [users]);
  console.log(users);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  });

  return (
    <div className="app">
      <Nav isDark={isDark} setisDark={setisDark} />

      <Channel />
    </div>
  );
}

export default App;

// function App() {
//   const [message, setmessage] = useState("");
//   const [refresh, setrefresh] = useState(0);
//   const [alluser, setalluser] = useState([]);
//   const [memberToChatId, setmemberToChatId] = useState(null);
//   const [ownmessage, setownmessage] = useState(null);
//   const [othermessage, setothermessage] = useState(null);

//   const { users } = useAuth();
//   function signout() {
//     auth.signOut();
//     setalluser([]);
//     setmemberToChatId(null);
//   }
//   function handleMessage(e) {
//     setmessage(e.target.value);
//   }
//   function sendMessage(e) {
//     e.preventDefault();
//     if (auth.currentUser && memberToChatId) {
//       const firestore = firebase
//         .database()
//         .ref(`/${auth.currentUser.uid}users`);
//       firestore.push({
//         name: auth.currentUser.displayName,
//         online: true,

//         chat: {
//           userid: auth.currentUser.uid,
//           message: message,
//           time: Date.now(),
//           messageToId: memberToChatId,
//         },
//       });
//       setmessage("");
//       console.log("hi");
//       setrefresh(refresh + 1);
//     }
//   }
//   function showchats(e, id) {
//     e.preventDefault();
//     console.log(id);

//     setmemberToChatId(id);
//   }
//   console.log(message);
//   useEffect(() => {
//     if (!auth.currentUser) return;
//     let users = [];
//     const firestore = firebase.database().ref(`Allusers`);
//     firestore.on("value", (res) => {
//       const data = res.val();
//       for (let id in data) {
//         users.push({
//           id: data[id].id,
//           name: data[id].name,
//           email: data[id].email,
//         });
//       }
//       setalluser(users);
//       users = [];
//     });
//   }, [auth.currentUser]);

//   useEffect(() => {
//     if (auth.currentUser && memberToChatId) {
//       let ownData = [];
//       const firestore = firebase
//         .database()
//         .ref(`/${auth.currentUser.uid}users`);
//       firestore.on("value", (res) => {
//         let data = res.val();

//         for (let id in data) {
//           ownData.push(data[id].chat);
//         }
//         let messages = ownData.filter(
//           (item) => item.messageToId == memberToChatId
//         );

//         setownmessage(messages);
//         ownData = [];
//       });
//     }
//   }, [memberToChatId, refresh]);

//   // to ge the mwssage from anathor acoount
//   useEffect(() => {
//     if (auth.currentUser && memberToChatId) {
//       let othermessageData = [];
//       const firestore = firebase.database().ref(`/${memberToChatId}users`);
//       firestore.on("value", (res) => {
//         let data = res.val();

//         for (let id in data) {
//           othermessageData.push(data[id].chat);
//         }
//         let messages = othermessageData.filter(
//           (item) => item.messageToId == auth.currentUser.uid
//         );

//         setothermessage(messages);

//         othermessageData = [];
//       });
//     }
//   }, [memberToChatId, refresh]);

//   let allmessage =
//     ownmessage && othermessage ? [...ownmessage, ...othermessage] : null;
//   let allMessageSort = allmessage
//     ? allmessage.sort((a, b) => a.time - b.time)
//     : null;

//   console.log(allmessage, "nosort");
//   console.log(allMessageSort, "sort");

//   return (
//     <div className="app">
//       <div className="container app__container ">
//         <h2>{auth?.currentUser?.email} </h2>
//         <button onClick={signout}>LogOut</button>
//         <div className="chat mx-auto">
//           <div className="chat__active">
//             <input
//               type="search"
//               name="search"
//               id=""
//               className="form-control"
//               placeholder="search"
//             />
//             <div className="active__members mb-2 mt-2 ml-2">
//               {alluser.map((item) => {
//                 return (
//                   <a
//                     href=""
//                     className="active__member mb-3"
//                     key={item.id}
//                     onClick={(e) => showchats(e, item.id)}
//                   >
//                     <img src="https://placeimg.com/640/480/people" alt="" />
//                     <div className="memberinfo">
//                       <h5>{item.name}</h5>
//                       <h6>{item.email}</h6>
//                     </div>
//                   </a>
//                 );
//               })}
//             </div>
//           </div>
//           <div className="message">
//             <div className="message__contant">
//               <div className="message__contant__window">
//                 {allMessageSort?.map((item, i) => {
//                   return (
//                     <div
//                       className={
//                         item.userid == auth?.currentUser.uid ? "me" : `other`
//                       }
//                       key={i}
//                     >
//                       <h4
//                         className={
//                           item.userid == auth?.currentUser.uid
//                             ? "me-text"
//                             : `other-text`
//                         }
//                       >
//                         {item.message}
//                       </h4>
//                     </div>
//                   );
//                 })}
//               </div>
//               <form action="">
//                 <textarea
//                   type="text"
//                   className=""
//                   placeholder="enteryour message"
//                   onChange={handleMessage}
//                   value={message}
//                 ></textarea>
//                 <button onClick={sendMessage}>send</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Register />
//       <Login />
//     </div>
//   );
// }

// export default App;
