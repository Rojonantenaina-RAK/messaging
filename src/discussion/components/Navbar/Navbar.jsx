import React, { useState } from 'react'
import './Navbar.css'
import photo1 from '../../data/Avatar1.png'
import photo2 from '../../data/Avatar2.png'
import photo3 from '../../data/Avatar3.png'
import photo4 from '../../data/Avatar4.png'
import photo5 from '../../data/Avatar5.png'
import photo6 from '../../data/Avatar6.png'
import photo7 from '../../data/Avatar7.png'
import photo8 from '../../data/Avatar8.png'

import { FaCaretDown } from "react-icons/fa";

export default function Navbar({USERS , currentUser , setCurrentUser , otherUsers , setOtherUsers , setIsDiscussingWith}) {
  const [changingProfile, setChangingProfile] = useState(false)

  const avatarMap = {
    "Avatar1.png": photo1,
    "Avatar2.png": photo2,
    "Avatar3.png": photo3,
    "Avatar4.png": photo4,
    "Avatar5.png": photo5,
    "Avatar6.png": photo6,
    "Avatar7.png": photo7,
    "Avatar8.png": photo8
  };

  function toggleDiv() {
    setChangingProfile(prev => !prev)
  }

  function changeUser(selectedUser) {
    setCurrentUser(selectedUser);
    setOtherUsers(Object.keys(USERS).filter(key => key !== selectedUser))
    setChangingProfile(false)
    setIsDiscussingWith('')
  }

  
  return (
    <nav className='flex justify-between items-center px-10 py-3'>
      {/* LOGO */}
      <span className='font-bold text-white'>IKOM</span>


      {/* Current User */}
      <div className='flex flex-col rounded-2xl'>
        <div className='flex justify-start items-center py-1 px-3 bg-white rounded-2xl'>
          <div className="photoProfileContainer">
            <img src={avatarMap[USERS[currentUser]["photo"]]} alt="PDP" className='photoProfile' />
            {/* allUsers */}
          </div>
          <div className='font-semibold mx-1 w-50'>
            <div>{USERS[currentUser]["name"]}</div>
            <div className='text-sm text-gray-500'>{USERS[currentUser]["email"]}</div>
          </div>
          <FaCaretDown onClick={toggleDiv} />
        </div>


      {/* Chose another profile */}
      {
        changingProfile && (

        <div className='containerOtherProfiles absolute rounded-2xl top-30 space-y-1 z-1'>

          {otherUsers.map((userKey) => (
            <div
              key={userKey}
              onClick={() => changeUser(userKey)}
              className="profile flex justify-start items-center py-1 px-3 bg-gray-200 rounded-2xl hover:bg-gray-300"
            >
              <div className="photoProfileContainer">
                <img
                  src={avatarMap[USERS[userKey].photo]}
                  alt="PDP"
                  className="photoProfile"
                />
              </div>
              <span className="font-semibold mx-1">{USERS[userKey].name}</span>
            </div>
          ))}

        </div>

        )
      }
      </div>
    </nav>
  )
}