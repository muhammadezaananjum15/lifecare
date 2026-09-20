import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const update = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo('.page-hero-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    gsap.fromTo('.contact-info-card', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 });
    gsap.fromTo('.contact-form-card', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.to('.contact-form-card', { opacity: 0, scale: 0.95, duration: 0.3, onComplete: () => {
      setSent(true);
      gsap.fromTo('.success-msg', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' });
    }});
  };

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item active">Contact</span>
          </div>
          <h1 className="page-hero-title">Get In Touch</h1>
          <p className="page-hero-desc">We're here for you 24/7. Reach our team for appointments, queries, or emergency care.</p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 40, alignItems: 'start' }}>
            {/* Info Card */}
            <div>
              <div className="contact-info-card">
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>Contact Information</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: 36 }}>Reach us anytime. Our team is ready to help you 24 hours a day, 7 days a week.</p>

                <div>
                  {[
                    { icon: <MapPin size={20} />, label: 'Address', val: 'Plot 7, Main Shahrah-e-Faisal, Near Metropole Hotel, Karachi-75400, Pakistan' },
                    { icon: <Phone size={20} />, label: 'Phone (OPD)', val: '+92-21-111-543-322' },
                    { icon: <Phone size={20} />, label: 'Emergency', val: '+92-21-111-911-911' },
                    { icon: <Mail size={20} />, label: 'Email', val: 'info@lifecare.com.pk' },
                    { icon: <Clock size={20} />, label: 'OPD Hours', val: 'Mon–Sat: 8:00 AM – 8:00 PM' },
                  ].map((item, i) => (
                    <div key={i} className="contact-info-item">
                      <div className="contact-info-icon">{item.icon}</div>
                      <div>
                        <div className="contact-info-label">{item.label}</div>
                        <div className="contact-info-value">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Socials */}
                <div style={{ marginTop: 32, display: 'flex', gap: 10 }}>
                  {[
                    { icon: 'fa-brands fa-facebook-f', href: '#' },
                    { icon: 'fa-brands fa-instagram', href: '#' },
                    { icon: 'fa-brands fa-twitter', href: '#' },
                    { icon: 'fa-brands fa-linkedin-in', href: '#' },
                  ].map((s, i) => (
                    <a key={i} href={s.href} style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', transition: 'all 0.2s', textDecoration: 'none' }}>
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Emergency Box */}
              <div style={{ background: 'var(--gray-900)', borderRadius: 'var(--radius-xl)', padding: 28, marginTop: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 56, height: 56, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: '#ef4444', flexShrink: 0 }}>
                  <i className="fa-solid fa-truck-medical" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>24/7 Emergency</div>
                  <a href="tel:+922111191191" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ef4444', display: 'block', lineHeight: 1.2 }}>+92-21-111-911-911</a>
                  <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)', marginTop: 2 }}>Trauma · ICU · Cardiac Emergency</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-card card" style={{ padding: 40 }}>
              {sent ? (
                <div className="success-msg text-center" style={{ padding: '40px 0' }}>
                  <div style={{ width: 80, height: 80, background: 'var(--green-50)', border: '3px solid var(--green-200)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <CheckCircle size={36} style={{ color: 'var(--primary)' }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--gray-500)', lineHeight: 1.7 }}>
                    Thank you for reaching out, <strong>{form.name}</strong>. Our team will respond to <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>Send Us a Message</h3>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginBottom: 28 }}>Fill in the form below and our team will get back to you within 24 hours.</p>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input type="text" className="form-input" placeholder="Your name" required value={form.name} onChange={e => update('name', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input type="tel" className="form-input" placeholder="+92 300 1234567" value={form.phone} onChange={e => update('phone', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input type="email" className="form-input" placeholder="your@email.com" required value={form.email} onChange={e => update('email', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <select className="form-select" required value={form.subject} onChange={e => update('subject', e.target.value)}>
                        <option value="">Select a subject</option>
                        <option>Appointment Inquiry</option>
                        <option>Medical Report Request</option>
                        <option>Billing / Insurance</option>
                        <option>Doctor Feedback</option>
                        <option>General Inquiry</option>
                        <option>Career Opportunity</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Your Message *</label>
                      <textarea className="form-textarea" style={{ minHeight: 140 }} placeholder="Tell us how we can help..." required value={form.message} onChange={e => update('message', e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
                      <Send size={16} /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section style={{ height: 400, position: 'relative' }}>
        <iframe
          title="Lifecare Hospital Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.5408505248887!2d67.0099!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e7b3a25f13d%3A0x49ef04bc84f10e7a!2sShahrah-e-Faisal%2C%20Karachi!5e0!3m2!1sen!2spk!4v1700000000000"
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
};

export default Contact;
