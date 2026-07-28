import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Market from './pages/Market'
import Alerts from './pages/Alerts'
import Locality from './pages/Locality'
import Awareness from './pages/Awareness'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* We use Home as the landing page, but the user might expect Dashboard as well */}
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="market" element={<Market />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="locality" element={<Locality />} />
        <Route path="awareness" element={<Awareness />} />
      </Route>
    </Routes>
  )
}

export default App
