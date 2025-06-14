import React from 'react'

import photo1 from '../../data/Avatar1.png'
import photo2 from '../../data/Avatar2.png'
import photo3 from '../../data/Avatar3.png'
import photo4 from '../../data/Avatar4.png'
import photo5 from '../../data/Avatar5.png'
import photo6 from '../../data/Avatar6.png'
import photo7 from '../../data/Avatar7.png'
import photo8 from '../../data/Avatar8.png'

export default function ListFriends( { USERS , otherUsers , setIsDiscussingWith} ) {
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

  return (
    <div className='listFriendsContainer bg-gray-100 h-[75vh] w-[14rem] fixed'>
        <p className='font-bold text-gray-500 text-center py-5'>Your contacts ...</p>

{otherUsers.map((userKey) => (
  <div
    key={userKey}
    onClick={()=>setIsDiscussingWith(userKey)}
    className="space-y-2 flex items-center justify-start gap-2 px-2 font-semibold leading-tight border-t-2 border-t-gray-300 hover:bg-gray-200"
  >
    <img
      src={avatarMap[USERS[userKey]["photo"]]}
      alt="PDP"
      className="rounded-full w-10"
    />
    <div className="name text-sm">{USERS[userKey]["name"]}</div>
  </div>
))}

    </div>
  )
}
