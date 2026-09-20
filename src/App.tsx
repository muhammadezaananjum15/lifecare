import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Medicines from './pages/Medicines';
import Cart from './pages/Cart';
import BookAppointment from './pages/BookAppointment';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
