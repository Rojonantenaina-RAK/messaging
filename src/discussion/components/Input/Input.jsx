import React from 'react'
import './Input.css'
import { IoSend } from "react-icons/io5";

export default function Input() {
  return (
    <div className='inputContainer bg-transparent position-fixed flex justify-center'>
      <input type="text" placeholder='Votre message ...' className='placeholder-gray-400 ring-2 ring-gray-600 rounded-full w-[80%] py-2 px-4' />
      <button className="iconSend bg-gray-700 w-9 flex justify-center items-center rounded-md ml-1">
        <IoSend className='text-white text-3xl' />
      </button>
    </div>
  )
}
