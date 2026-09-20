import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { MapPin, Award, Star, Clock, Phone, Mail, ChevronLeft, CheckCircle } from 'lucide-react';
import { doctors } from '../data/doctors';

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === Number(id));
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!doctor) return;
    gsap.fromTo('.doctor-detail-header', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 });
    gsap.fromTo('.detail-section', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.3 });
  }, [doctor]);

  if (!doctor) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
        <div className="empty-state">
          <div className="empty-state-icon"><i className="fa-solid fa-user-doctor" /></div>
          <h3 className="empty-state-title">Doctor not found</h3>
          <Link to="/doctors" className="btn btn-primary">Browse Doctors</Link>
        </div>
      </div>
    );
  }

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(doctor.rating));

  // Generate next 5 days
  const dates = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return { value: d.toISOString().split('T')[0], label: d.toLocaleDateString('en-PK', { weekday: 'short', day: 'numeric', month: 'short' }) };
  });

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) {
      alert('Please select a date and time slot to continue.');
      return;
    }
    navigate(`/book-appointment?doctor=${doctor.id}&date=${selectedDate}&slot=${encodeURIComponent(selectedSlot)}`);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-sep">›</span>
            <Link to="/doctors" className="breadcrumb-item" style={{ color: 'rgba(255,255,255,0.5)' }}>Doctors</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item active">{doctor.name}</span>
          </div>
          <h1 className="page-hero-title">{doctor.name}</h1>
          <p className="page-hero-desc">{doctor.specialty} · {doctor.hospital}</p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray-50)', paddingTop: 48 }}>
        <div className="container">
          <Link to="/doctors" className="btn btn-outline btn-sm" style={{ marginBottom: 24 }}>
            <ChevronLeft size={14} /> Back to Doctors
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }}>
            {/* Main content */}
            <div>
              {/* Header Card */}
              <div className="doctor-detail-header">
                <img src={doctor.image} alt={doctor.name} className="doctor-detail-img" />
                <div>
                  <div className="doctor-detail-specialty">{doctor.specialty}</div>
                  <h2 className="doctor-detail-name">{doctor.name}</h2>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginBottom: 12 }}>{doctor.qualification}</p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                    {stars.map((full, i) => (
                      <i key={i} className={`fa-solid fa-star ${full ? 'star' : 'star-empty'}`} />
                    ))}
                    <span style={{ fontWeight: 700, color: 'var(--gray-700)', marginLeft: 4 }}>{doctor.rating}</span>
                    <span style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>({doctor.reviews} reviews)</span>
                  </div>

                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
                    {[
                      { icon: <Award size={14} />, label: `${doctor.experience} Years Experience` },
                      { icon: <MapPin size={14} />, label: doctor.city },
                      { icon: <Clock size={14} />, label: doctor.available ? 'Available Today' : 'Fully Booked' },
                    ].map((item, i) => (
                      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                        <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                        {item.label}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {doctor.languages.map(l => (
                      <span key={l} className="badge badge-green">{l}</span>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'center', padding: '24px', background: 'var(--green-50)', borderRadius: 'var(--radius-xl)', border: '2px solid var(--green-200)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Consultation Fee</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
                    PKR {doctor.fee.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: 4 }}>per session</div>
                  <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                    <a href="tel:+922111154332" className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                      <Phone size={12} /> Call
                    </a>
                    <a href="mailto:info@lifecare.com.pk" className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                      <Mail size={12} /> Email
                    </a>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="card detail-section" style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>About Dr. {doctor.name.split(' ').pop()}</h3>
                <p style={{ color: 'var(--gray-500)', lineHeight: 1.75 }}>{doctor.about}</p>
              </div>

              {/* Awards */}
              <div className="card detail-section" style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16 }}>Awards & Recognition</h3>
                {doctor.awards.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <CheckCircle size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>{a}</span>
                  </div>
                ))}
              </div>

              {/* Hospital info */}
              <div className="card detail-section" style={{ marginTop: 16, background: 'var(--green-50)', border: '1px solid var(--green-200)' }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <div style={{ width: 64, height: 64, background: 'var(--gradient-primary)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.4rem', flexShrink: 0 }}>
                    <i className="fa-solid fa-hospital" />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{doctor.hospital}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>Plot 7, Main Shahrah-e-Faisal, Karachi</p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <span className="badge badge-green">JCI Accredited</span>
                      <span className="badge badge-green">ISO Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div style={{ position: 'sticky', top: 100 }}>
              <div className="card detail-section" style={{ border: '2px solid var(--green-200)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20, color: 'var(--gray-900)' }}>
                  <i className="fa-solid fa-calendar-check" style={{ color: 'var(--primary)', marginRight: 8 }} />
                  Book Appointment
                </h3>

                {/* Date selector */}
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label" style={{ marginBottom: 10 }}>Select Date</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {dates.map(d => (
                      <button
                        key={d.value}
                        className={`slot-btn ${selectedDate === d.value ? 'selected' : ''}`}
                        style={{ flex: '1 0 30%', fontSize: '0.75rem' }}
                        onClick={() => setSelectedDate(d.value)}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time slots */}
                <div style={{ marginBottom: 24 }}>
                  <label className="form-label" style={{ marginBottom: 10 }}>Select Time Slot</label>
                  <div className="slot-grid">
                    {doctor.slots.map(slot => (
                      <button
                        key={slot}
                        className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                {(selectedDate || selectedSlot) && (
                  <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-200)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: 8 }}>Booking Summary</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-700)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Doctor</span><span style={{ fontWeight: 600 }}>{doctor.name}</span>
                      </div>
                      {selectedDate && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Date</span><span style={{ fontWeight: 600 }}>{dates.find(d => d.value === selectedDate)?.label}</span>
                      </div>}
                      {selectedSlot && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Time</span><span style={{ fontWeight: 600 }}>{selectedSlot}</span>
                      </div>}
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--green-200)', paddingTop: 6, marginTop: 4 }}>
                        <span>Fee</span><span style={{ fontWeight: 700, color: 'var(--primary)' }}>PKR {doctor.fee.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button className="btn btn-primary w-full" style={{ fontSize: '1rem', padding: '16px' }} onClick={handleBook}>
                  Confirm Appointment <i className="fa-solid fa-arrow-right" style={{ marginLeft: 4 }} />
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 12 }}>
                  Free cancellation up to 2 hours before appointment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorDetail;
