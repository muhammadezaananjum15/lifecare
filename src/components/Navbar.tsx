import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Phone, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/services', label: 'Services' },
    { to: '/medicines', label: 'Pharmacy' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <i className="fa-solid fa-heart-pulse" />
            </div>
            <span className="navbar-logo-text">
              Life<span>care</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar-nav">
            {links.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="navbar-cta">
            <div className="navbar-phone">
              <Phone size={14} />
              <span>+92-21-111-543-322</span>
            </div>
            <button
              className="btn btn-icon"
              style={{ position: 'relative', background: 'rgba(255,255,255,0.1)', color: scrolled ? 'var(--gray-700)' : 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-md)' }}
              onClick={() => navigate('/cart')}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6,
                  background: 'var(--primary)', color: 'white',
                  width: 18, height: 18, borderRadius: '50%',
                  fontSize: '0.7rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/book-appointment" className="btn btn-primary btn-sm">
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu btn */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button
          style={{ position: 'absolute', top: 24, right: 24, color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setMobileOpen(false)}
        >
          <X size={28} />
        </button>
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <div className="navbar-logo" style={{ justifyContent: 'center' }}>
            <div className="navbar-logo-icon"><i className="fa-solid fa-heart-pulse" /></div>
            <span style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800 }}>Life<span style={{ color: 'var(--green-400)' }}>care</span></span>
          </div>
        </div>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
          <Link to="/cart" className="btn btn-ghost" onClick={() => setMobileOpen(false)}>
            <ShoppingCart size={16} /> Cart {totalItems > 0 && `(${totalItems})`}
          </Link>
          <Link to="/book-appointment" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
