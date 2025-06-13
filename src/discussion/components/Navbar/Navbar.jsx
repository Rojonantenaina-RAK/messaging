// import {useState} from 'react'
import './Navbar.css'
import photo1 from '../../data/Avatar1.png'

export default function Navbar() {
    // const [user, setUser] = useState({})
    // const [photo, setPhoto] = useState('')
    // const allPhotos=[]
  return (
    <nav className='flex justify-between items-center px-10 py-3'>
      <span className='font-bold text-white'>IKOM</span>
      <div className='flex items-center gap-3 bg-white rounded-md p-1'>
        <img src={photo1} alt="" className='photoProfile' />
        <span>Rojo Nantenaina</span>
      </div>
    </nav>
  )
}