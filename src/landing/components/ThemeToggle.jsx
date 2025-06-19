// src/components/ThemeToggle.jsx
import { useTheme } from '../../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
    </button>
  )
}
