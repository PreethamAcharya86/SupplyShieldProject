import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      
      <main className="pt-24 pb-12 min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>

      <footer className="border-white/5 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">P</div>
            <span className="text-xl font-bold tracking-tight">PricePulse AI</span>
          </div>
          
          <div className="flex gap-8 text-muted text-sm">
            <a href="#" className="hover:text-white transition-colors nav-link">Privacy</a>
            <a href="#" className="hover:text-white transition-colors nav-link">Terms</a>
            <a href="#" className="hover:text-white transition-colors nav-link">Support</a>
            <a href="#" className="hover:text-white transition-colors nav-link">Twitter</a>
          </div>
          
          <div className="text-muted text-sm">
            © 2024 PricePulse AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
