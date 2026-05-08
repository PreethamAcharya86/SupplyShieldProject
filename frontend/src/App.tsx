import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import Locality from './pages/Locality'
import Dashboard from './pages/Dashboard'
import { Alerts, Awareness, About } from './pages/Placeholders'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="market" element={<Dashboard />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="locality" element={<Locality />} />
        <Route path="awareness" element={<Awareness />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
