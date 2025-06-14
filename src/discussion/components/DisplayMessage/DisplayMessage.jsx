import React from 'react'

import photo1 from '../../data/Avatar1.png'
import photo2 from '../../data/Avatar2.png'
import photo3 from '../../data/Avatar3.png'
import photo4 from '../../data/Avatar4.png'
import photo5 from '../../data/Avatar5.png'
import photo6 from '../../data/Avatar6.png'
import photo7 from '../../data/Avatar7.png'
import photo8 from '../../data/Avatar8.png'

export default function DisplayMessage({ USERS , currentUser , isDiscussingWith }) {

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
    <div className='ml-[14rem]'>
        {
            isDiscussingWith !=='' && (
                <div className="messageContainer">
                    <h2 className='flex justify-start items-center p-2 border-2 border-gray-200 fixed w-full bg-gray-100'>
                        <img className='rounded-full w-12' src={avatarMap[USERS[isDiscussingWith]["photo"]]} alt="PDPfriend" />
                        <span>{USERS[isDiscussingWith]["name"]}</span>
                    </h2>

                    <div className="message">
                        <img className='rounded-full w-12' src={avatarMap[USERS[isDiscussingWith]["photo"]]} alt="PDPfriend" />
                    </div>

                </div>

            )
        }

    </div>
  )
}
