import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo('.page-hero-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    gsap.utils.toArray('.service-card').forEach((el: any, i) => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    });
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item active">Services</span>
          </div>
          <h1 className="page-hero-title">Our Medical Services</h1>
          <p className="page-hero-desc">Comprehensive healthcare across 20+ specialties with world-class facilities and expert clinicians</p>
        </div>
      </section>

      {/* Services intro */}
      <section style={{ background: 'var(--white)', padding: '64px 0 0' }}>
        <div className="container text-center" style={{ maxWidth: 700, marginBottom: 64 }}>
          <div className="section-tag"><i className="fa-solid fa-hospital-user" /> Departments</div>
          <h2 className="section-title">Everything Under One Roof</h2>
          <p className="section-desc">From preventive care to complex surgeries, Lifecare offers the full spectrum of medical services with state-of-the-art equipment and compassionate experts.</p>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ background: 'var(--gray-50)', padding: '0 0 96px' }}>
        <div className="container">
          <div className="grid grid-3">
            {services.map(s => (
              <div key={s.id} className="service-card">
                <div className="service-icon-wrap" style={{ background: `${s.color}15`, color: s.color }}>
                  <i className={s.icon} />
                </div>
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-desc">{s.description}</p>
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {s.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--gray-600)' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: `${s.color}`, flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/book-appointment" className="btn btn-outline btn-sm" style={{ marginTop: 20, alignSelf: 'flex-start', color: s.color, borderColor: `${s.color}40` }}>
                  Book Now <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--gradient-primary)', padding: '80px 0' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
            Can't find the service you're looking for?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 32, fontSize: '1.05rem' }}>
            Our specialists cover a wide range of conditions. Contact us and our team will guide you to the right department.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-white btn-lg">Contact Us <ArrowRight size={16} /></Link>
            <a href="tel:+922111154332" className="btn btn-ghost btn-lg"><i className="fa-solid fa-phone" /> Call Now</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
