import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, Heart, Target, Users } from 'lucide-react';
import { doctors } from '../data/doctors';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo('.page-hero-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    const reveals = ['.reveal-left', '.reveal-right', '.reveal'];
    reveals.forEach(sel => {
      gsap.utils.toArray(sel).forEach((el: any) => {
        const xFrom = sel.includes('left') ? -50 : sel.includes('right') ? 50 : 0;
        const yFrom = sel.includes('left') || sel.includes('right') ? 0 : 50;
        gsap.fromTo(el, { opacity: 0, x: xFrom, y: yFrom }, {
          opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      });
    });
  }, []);

  const milestones = [
    { year: '2005', title: 'Founded', desc: 'Lifecare Hospital established in Karachi with 50 beds and a team of 20 doctors.' },
    { year: '2008', title: 'JCI Accreditation', desc: 'Became the first hospital in Sindh to achieve Joint Commission International accreditation.' },
    { year: '2012', title: 'Major Expansion', desc: 'Expanded to 300 beds, added ICU, NICU, and cutting-edge surgical suites.' },
    { year: '2016', title: 'Digital Transformation', desc: 'Launched electronic medical records and online appointment system across all departments.' },
    { year: '2020', title: 'COVID Response', desc: 'Established a dedicated COVID-19 treatment center, treating over 5,000 patients.' },
    { year: '2024', title: 'Lifecare 2.0', desc: 'Opened new Cancer Centre and Neurosciences Institute with robotic surgery capabilities.' },
  ];

  const values = [
    { icon: <Heart size={24} />, title: 'Compassion', desc: 'We treat every patient with empathy, respect, and genuine care.' },
    { icon: <Award size={24} />, title: 'Excellence', desc: 'We hold ourselves to the highest standards in every aspect of care.' },
    { icon: <Target size={24} />, title: 'Innovation', desc: 'We embrace new technology and research to deliver better outcomes.' },
    { icon: <Users size={24} />, title: 'Community', desc: 'We are deeply committed to the health of every family in Karachi.' },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item active">About Us</span>
          </div>
          <h1 className="page-hero-title">About Lifecare Hospital</h1>
          <p className="page-hero-desc">Karachi's most trusted name in healthcare since 2005. Our story is one of compassion, innovation, and unwavering commitment to your wellbeing.</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div className="reveal-left about-img-stack">
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80"
                alt="Lifecare Hospital"
                className="about-img-main"
              />
              <div className="about-img-badge">
                <div className="about-img-badge-num">18+</div>
                <div className="about-img-badge-label">Years of Service</div>
              </div>
            </div>
            <div className="reveal-right">
              <div className="section-tag"><i className="fa-solid fa-hospital" /> Our Story</div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Serving Karachi's Families for Over 18 Years
              </h2>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.8, marginBottom: 20 }}>
                Lifecare Hospital was founded in 2005 with a singular vision: to provide world-class healthcare to the people of Karachi without compromise. What started as a 50-bed facility has grown into one of Pakistan's most respected medical institutions.
              </p>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.8, marginBottom: 32 }}>
                Today, with over 300 beds, 120+ specialist doctors, and 20 departments, we continue to push the boundaries of medical excellence — combining global best practices with a deep understanding of our community's unique needs.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
                {[
                  { num: '500K+', label: 'Patients Treated' },
                  { num: '120+', label: 'Specialists' },
                  { num: '300+', label: 'Hospital Beds' },
                  { num: '20+', label: 'Departments' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'var(--green-50)', border: '1px solid var(--green-200)', borderRadius: 'var(--radius-lg)', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <Link to="/doctors" className="btn btn-primary">Meet Our Doctors <ArrowRight size={14} /></Link>
                <Link to="/contact" className="btn btn-outline">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--green-50)' }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag"><i className="fa-solid fa-star" /> Our Values</div>
            <h2 className="section-title">What Drives Us Every Day</h2>
            <p className="section-desc">These core values guide every decision we make, every treatment we provide, and every interaction we have.</p>
          </div>
          <div className="grid grid-4 reveal-stagger">
            {values.map(v => (
              <div key={v.title} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, background: 'var(--gradient-primary)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 20px' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag"><i className="fa-solid fa-timeline" /> Our Journey</div>
            <h2 className="section-title">Key Milestones</h2>
          </div>
          <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--green-200)', transform: 'translateX(-50%)' }} />
            {milestones.map((m, i) => (
              <div key={m.year} className="reveal" style={{ display: 'flex', gap: 32, marginBottom: 40, flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center' }}>
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{m.year}</div>
                  <h4 style={{ fontWeight: 700, color: 'var(--gray-900)', marginBottom: 8 }}>{m.title}</h4>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', lineHeight: 1.65 }}>{m.desc}</p>
                </div>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--primary)', border: '4px solid var(--green-100)', zIndex: 2, flexShrink: 0 }} />
                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership team preview */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag"><i className="fa-solid fa-user-tie" /> Our Leadership</div>
            <h2 className="section-title">Expert Specialists Leading the Way</h2>
          </div>
          <div className="grid grid-4 reveal-stagger">
            {doctors.slice(0, 4).map(d => (
              <div key={d.id} className="card" style={{ textAlign: 'center', padding: 24 }}>
                <img src={d.image} alt={d.name} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', border: '4px solid var(--green-100)' }} />
                <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{d.name}</h4>
                <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>{d.specialty}</div>
                <div style={{ color: 'var(--gray-400)', fontSize: '0.78rem' }}>{d.qualification}</div>
                <Link to={`/doctors/${d.id}`} className="btn btn-outline btn-sm" style={{ marginTop: 16 }}>View Profile</Link>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/doctors" className="btn btn-primary btn-lg">Meet All Doctors <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section style={{ background: 'var(--white)', padding: '64px 0', borderTop: '1px solid var(--gray-100)' }}>
        <div className="container text-center reveal">
          <div className="section-tag"><i className="fa-solid fa-certificate" /> Certifications</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 40 }}>Internationally Recognized Standards</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[
              { icon: 'fa-solid fa-certificate', label: 'JCI Accredited', sub: 'Since 2008' },
              { icon: 'fa-solid fa-shield-halved', label: 'ISO 9001:2015', sub: 'Quality Management' },
              { icon: 'fa-solid fa-user-doctor', label: 'PMDC Registered', sub: 'All Physicians' },
              { icon: 'fa-solid fa-globe', label: 'WHO Standards', sub: 'Compliant' },
            ].map(a => (
              <div key={a.label} style={{ textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, background: 'var(--green-50)', border: '2px solid var(--green-200)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.5rem', color: 'var(--primary)' }}>
                  <i className={a.icon} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gray-900)' }}>{a.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 2 }}>{a.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
