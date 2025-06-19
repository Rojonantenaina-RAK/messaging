import Globe3D from "./components/Globe"
import ThemeToggle from './components/ThemeToggle'
import './landing.css'

export default function Landing() {
  return (
    <div>
        <nav>
            <div className="logo"></div>
            <div className="navigationMenu"></div>
            <ThemeToggle />
        </nav>
        <input type="select" />
      <Globe3D />
    </div>
  )
}
