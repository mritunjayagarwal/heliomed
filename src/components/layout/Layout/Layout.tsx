import { Outlet } from 'react-router'
import { Footer } from '@/components/layout/Footer/Footer'
import { Navbar } from '@/components/layout/Navbar/Navbar'
import { ScrollManager } from './ScrollManager'

export function Layout() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
