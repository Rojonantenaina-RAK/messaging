import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Input from "./components/Input/Input";
import ListFriends from "./components/ListFriends/ListFriends";
import DisplayMessage from "./components/DisplayMessage/DisplayMessage";


export default function Discussion() {
  let USERS = {
    "user1": {
        "name": "Rojo Nantenaina",
        "email": "rojo.rak38@gmail.com",
        "password": "123456789",
        "photo": "Avatar3.png"
    },
    "user2": {
        "name": "Toky Raph",
        "email": "toky.raph@gmail.com",
        "password": "123456789",
        "photo": "Avatar6.png"
    },
    "user3": {
        "name": "Lady Jenny",
        "email": "lady.jenny@gmail.com",
        "password": "123456789",
        "photo": "Avatar7.png"
    },
    "user4": {
        "name": "Nantenaina Jeremiah",
        "email": "jeremia.nantenaina@gmail.com",
        "password": "123456789",
        "photo": "Avatar2.png"
    },
    "user5": {
        "name": "Denis",
        "email": "denis@gmail.com",
        "password": "123456789",
        "photo": "Avatar5.png"
    }
}

  const [currentUser, setCurrentUser] = useState("user1"); // authentification first
  const [otherUsers, setOtherUsers] = useState(Object.keys(USERS).filter(key => key !== currentUser));

  const [isDiscussingWith, setIsDiscussingWith] = useState('user2');
//   const [isDiscussingWith, setIsDiscussingWith] = useState('');


  return (
    <div>
      <Navbar USERS={USERS} currentUser={currentUser} setCurrentUser={setCurrentUser} otherUsers={otherUsers} setOtherUsers={setOtherUsers} setIsDiscussingWith={setIsDiscussingWith} />
      <ListFriends USERS={USERS} otherUsers={otherUsers} setIsDiscussingWith={setIsDiscussingWith} />
      <DisplayMessage USERS={USERS} currentUser={currentUser} isDiscussingWith={isDiscussingWith} />
      <Input />
    </div>
  )
}