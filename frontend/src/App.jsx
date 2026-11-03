
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhyUs from './components/WhyUs'
import Package from './components/Package'
import Recommendation from './components/Recommendation'
import HajiPlus from './components/HajiPlus'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Brochure from './components/Brochure'

import Profile from './pages/Profile'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Registration from './pages/Registration'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

import PackageHemat from './pages/PackageHemat'
import PackageReguler from './pages/PackageReguler'
import PackageEksklusif from './pages/PackageEksklusif'

import './components/Hero.css'

function App() {
  const path = window.location.pathname

  const isAdminLoginPage = path === '/admin/login'
  const isAdminDashboardPage =
    path === '/admin/dashboard' || path === '/admin'
  const isAdminPage = isAdminLoginPage || isAdminDashboardPage

  const isGalleryPage = path === '/galeri'
  const isProfilePage = path === '/profil'

  const isContactPage =
    path === '/hubungi-kami' || path === '/kontak'

  const isHajiPlusPage = path === '/haji-plus'
  const isPackagePage = path === '/paket-umroh'
  const isRecommendationPage = path === '/rekomendasi'
  const isRegistrationPage = path === '/pendaftaran'

  const isMusdalifahPage = path === '/paket/musdalifah'
  const isMinaPage = path === '/paket/mina'
  const isArofahPage = path === '/paket/arofah'

  let page

  if (isAdminLoginPage) {
    page = <AdminLogin />
  } else if (isAdminDashboardPage) {
    page = <AdminDashboard />
  } else if (isGalleryPage) {
    page = <Gallery />
  } else if (isContactPage) {
    page = <Contact />
  } else if (isHajiPlusPage) {
    page = <HajiPlus />
  } else if (isMusdalifahPage) {
    page = <PackageHemat />
  } else if (isMinaPage) {
    page = <PackageReguler />
  } else if (isArofahPage) {
    page = <PackageEksklusif />
  } else if (isPackagePage) {
    page = <Package />
  } else if (isRecommendationPage) {
    page = <Recommendation />
  } else if (isRegistrationPage) {
    page = <Registration />
  } else if (isProfilePage) {
    page = <Profile />
  } else {
    page = (
      <>
        <Hero />
        <WhyUs />
        <Profile />
        <Brochure />
      </>
    )
  }

  return (
    <>
      {!isAdminPage && <Navbar />}

      {page}

      {!isAdminPage && <Footer />}

      {!isAdminPage && <Chatbot />}
    </>
  )
}

export default App