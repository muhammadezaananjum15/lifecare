import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="navbar-logo-icon">
                <i className="fa-solid fa-heart-pulse" />
              </div>
              Life<span>care</span>
            </div>
            <p className="footer-desc">
              Karachi's premier hospital delivering world-class healthcare with compassion, innovation, and excellence since 2005. Trusted by over 500,000 patients.
            </p>
            <div className="footer-socials">
              {[
                { icon: 'fa-brands fa-facebook-f', href: '#' },
                { icon: 'fa-brands fa-instagram', href: '#' },
                { icon: 'fa-brands fa-twitter', href: '#' },
                { icon: 'fa-brands fa-linkedin-in', href: '#' },
                { icon: 'fa-brands fa-youtube', href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} className="footer-social" aria-label="Social link">
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {[
                { to: '/', label: 'Home' },
                { to: '/doctors', label: 'Find Doctors' },
                { to: '/services', label: 'Our Services' },
                { to: '/medicines', label: 'Pharmacy' },
                { to: '/book-appointment', label: 'Book Appointment' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact Us' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="footer-link">
                    <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem', color: 'var(--green-500)' }} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="footer-heading">Specialties</h4>
            <ul className="footer-links">
              {[
                'Cardiology', 'Neurology', 'Pediatrics',
                'Orthopedics', 'Gynecology', 'Oncology',
                'Dermatology', 'Psychiatry'
              ].map(s => (
                <li key={s}>
                  <Link to="/doctors" className="footer-link">
                    <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem', color: 'var(--green-500)' }} />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <div>
              <div className="footer-contact-item">
                <MapPin size={14} className="footer-contact-icon" />
                <span>Plot 7, Main Shahrah-e-Faisal, Near Metropole Hotel, Karachi-75400, Pakistan</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={14} className="footer-contact-icon" />
                <div>
                  <div>+92-21-111-543-322</div>
                  <div style={{ marginTop: 2 }}>Emergency: +92-21-111-911-911</div>
                </div>
              </div>
              <div className="footer-contact-item">
                <Mail size={14} className="footer-contact-icon" />
                <span>info@lifecare.com.pk</span>
              </div>
              <div className="footer-contact-item">
                <Clock size={14} className="footer-contact-icon" />
                <div>
                  <div>OPD: Mon–Sat 8:00 AM – 8:00 PM</div>
                  <div style={{ marginTop: 2, color: 'var(--green-400)', fontWeight: 600 }}>Emergency: 24/7</div>
                </div>
              </div>
            </div>

            {/* Accreditation badges */}
            <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['JCI Accredited', 'ISO 9001:2015', 'PMDC Certified'].map(b => (
                <span key={b} style={{
                  background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(74,222,128,0.2)',
                  color: 'var(--green-400)', padding: '4px 10px', borderRadius: '4px',
                  fontSize: '0.7rem', fontWeight: 600
                }}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 0, padding: '24px 0' }}>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Lifecare Hospital Karachi. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link to="#" className="footer-link" style={{ color: 'var(--gray-500)' }}>Privacy Policy</Link>
            <Link to="#" className="footer-link" style={{ color: 'var(--gray-500)' }}>Terms of Service</Link>
            <Link to="#" className="footer-link" style={{ color: 'var(--gray-500)' }}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
