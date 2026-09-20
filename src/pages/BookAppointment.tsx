import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { CheckCircle, User, Calendar, CreditCard, Check } from 'lucide-react';
import { doctors } from '../data/doctors';

const steps = [
  { label: 'Personal Info', icon: <User size={16} /> },
  { label: 'Appointment', icon: <Calendar size={16} /> },
  { label: 'Payment', icon: <CreditCard size={16} /> },
  { label: 'Confirmation', icon: <Check size={16} /> },
];

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const preDoctor = doctors.find(d => d.id === Number(searchParams.get('doctor')));
  const preDate = searchParams.get('date') || '';
  const preSlot = searchParams.get('slot') || '';

  const [form, setForm] = useState({
    name: '', email: '', phone: '', dob: '', gender: '',
    doctorId: preDoctor?.id.toString() || '',
    date: preDate, slot: preSlot,
    reason: '', payment: 'cash',
    address: '', city: 'Karachi',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo('.page-hero-content', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });
  }, []);

  useEffect(() => {
    gsap.fromTo('.step-content', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' });
  }, [step]);

  const selectedDoctor = doctors.find(d => d.id === Number(form.doctorId));

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return { value: d.toISOString().split('T')[0], label: d.toLocaleDateString('en-PK', { weekday: 'short', day: 'numeric', month: 'short' }) };
  });

  const handleSubmit = () => {
    gsap.to('.step-content', { opacity: 0, y: -20, duration: 0.3, onComplete: () => {
      setSubmitted(true);
      gsap.fromTo('.success-content', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' });
    }});
  };

  const updateForm = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <>
        <section className="page-hero">
          <div className="container page-hero-content">
            <h1 className="page-hero-title">Appointment Confirmed!</h1>
          </div>
        </section>
        <section className="section" style={{ background: 'var(--gray-50)' }}>
          <div className="container success-content" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: 100, height: 100, background: 'var(--green-50)', border: '3px solid var(--green-300)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '2.5rem', color: 'var(--primary)' }}>
              <CheckCircle size={48} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 12 }}>Booking Confirmed!</h2>
            <p style={{ color: 'var(--gray-500)', marginBottom: 32, lineHeight: 1.7 }}>
              Your appointment with <strong>{selectedDoctor?.name}</strong> has been successfully booked.
              A confirmation SMS will be sent to <strong>{form.phone}</strong>.
            </p>

            <div className="card" style={{ textAlign: 'left', marginBottom: 32 }}>
              <h4 style={{ fontWeight: 700, marginBottom: 16, color: 'var(--primary)' }}>
                <i className="fa-solid fa-receipt" style={{ marginRight: 8 }} />Booking Details
              </h4>
              {[
                { label: 'Booking ID', val: `LC-APT-${Date.now().toString().slice(-6)}` },
                { label: 'Doctor', val: selectedDoctor?.name },
                { label: 'Specialty', val: selectedDoctor?.specialty },
                { label: 'Patient', val: form.name },
                { label: 'Date', val: dates.find(d => d.value === form.date)?.label || form.date },
                { label: 'Time', val: form.slot },
                { label: 'Consultation Fee', val: `PKR ${selectedDoctor?.fee.toLocaleString()}` },
                { label: 'Hospital', val: 'Lifecare Hospital, Karachi' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-100)', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--gray-500)' }}>{r.label}</span>
                  <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{r.val}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/doctors" className="btn btn-primary btn-lg">Book Another</Link>
              <Link to="/" className="btn btn-outline btn-lg">Go to Home</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item active">Book Appointment</span>
          </div>
          <h1 className="page-hero-title">Book an Appointment</h1>
          <p className="page-hero-desc">Complete the form below to schedule your visit with our specialists</p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray-50)', paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          {/* Wizard Steps */}
          <div className="wizard-steps" style={{ marginBottom: 40 }}>
            {steps.map((s, i) => (
              <div key={i} className={`wizard-step ${step > i + 1 ? 'completed' : ''} ${step === i + 1 ? 'active' : ''}`}>
                <div className="wizard-step-dot">
                  {step > i + 1 ? <Check size={16} /> : i + 1}
                </div>
                <span className="wizard-step-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="step-content card">
            {/* Step 1 — Personal Info */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 24, color: 'var(--gray-900)' }}>
                  <User size={18} style={{ color: 'var(--primary)', marginRight: 8 }} />Personal Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" className="form-input" placeholder="Your full name" value={form.name} onChange={e => updateForm('name', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input type="tel" className="form-input" placeholder="+92 300 1234567" value={form.phone} onChange={e => updateForm('phone', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={e => updateForm('email', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Birth *</label>
                    <input type="date" className="form-input" value={form.dob} onChange={e => updateForm('dob', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender *</label>
                    <select className="form-select" value={form.gender} onChange={e => updateForm('gender', e.target.value)}>
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <select className="form-select" value={form.city} onChange={e => updateForm('city', e.target.value)}>
                      <option>Karachi</option><option>Lahore</option><option>Islamabad</option><option>Rawalpindi</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
                  <button className="btn btn-primary btn-lg" onClick={() => setStep(2)} disabled={!form.name || !form.phone || !form.gender}>
                    Next: Select Doctor <i className="fa-solid fa-arrow-right" style={{ marginLeft: 4 }} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Appointment */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 24 }}>
                  <Calendar size={18} style={{ color: 'var(--primary)', marginRight: 8 }} />Schedule Appointment
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {/* Doctor select */}
                  <div className="form-group">
                    <label className="form-label">Select Doctor *</label>
                    <select className="form-select" value={form.doctorId} onChange={e => updateForm('doctorId', e.target.value)}>
                      <option value="">Choose a specialist...</option>
                      {doctors.map(d => (
                        <option key={d.id} value={d.id}>{d.name} — {d.specialty} (PKR {d.fee.toLocaleString()})</option>
                      ))}
                    </select>
                  </div>

                  {selectedDoctor && (
                    <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-200)', borderRadius: 'var(--radius-lg)', padding: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
                      <img src={selectedDoctor.image} alt={selectedDoctor.name} style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{selectedDoctor.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>{selectedDoctor.specialty}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{selectedDoctor.qualification} · {selectedDoctor.experience} yrs experience</div>
                      </div>
                      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>PKR {selectedDoctor.fee.toLocaleString()}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>per session</div>
                      </div>
                    </div>
                  )}

                  {/* Date */}
                  <div>
                    <label className="form-label" style={{ marginBottom: 10 }}>Select Date *</label>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {dates.map(d => (
                        <button key={d.value} className={`slot-btn ${form.date === d.value ? 'selected' : ''}`} style={{ fontSize: '0.8rem', padding: '10px 14px' }} onClick={() => updateForm('date', d.value)}>
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slot */}
                  <div>
                    <label className="form-label" style={{ marginBottom: 10 }}>Select Time Slot *</label>
                    <div className="slot-grid">
                      {(selectedDoctor?.slots || ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']).map(slot => (
                        <button key={slot} className={`slot-btn ${form.slot === slot ? 'selected' : ''}`} onClick={() => updateForm('slot', slot)}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="form-group">
                    <label className="form-label">Reason for Visit / Symptoms</label>
                    <textarea className="form-textarea" placeholder="Briefly describe your symptoms or reason for the appointment..." value={form.reason} onChange={e => updateForm('reason', e.target.value)} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                  <button className="btn btn-outline btn-lg" onClick={() => setStep(1)}>
                    <i className="fa-solid fa-arrow-left" style={{ marginRight: 4 }} /> Back
                  </button>
                  <button className="btn btn-primary btn-lg" onClick={() => setStep(3)} disabled={!form.doctorId || !form.date || !form.slot}>
                    Next: Payment <i className="fa-solid fa-arrow-right" style={{ marginLeft: 4 }} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Payment */}
            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 24 }}>
                  <CreditCard size={18} style={{ color: 'var(--primary)', marginRight: 8 }} />Payment Method
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  {/* Payment options */}
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {[
                        { val: 'cash', icon: 'fa-solid fa-money-bill-wave', label: 'Cash on Visit', desc: 'Pay at hospital reception' },
                        { val: 'jazz', icon: 'fa-solid fa-mobile-screen', label: 'JazzCash / EasyPaisa', desc: 'Mobile wallet payment' },
                        { val: 'card', icon: 'fa-solid fa-credit-card', label: 'Credit / Debit Card', desc: 'Visa, MasterCard, UnionPay' },
                      ].map(p => (
                        <div
                          key={p.val}
                          onClick={() => updateForm('payment', p.val)}
                          style={{
                            padding: 20, borderRadius: 'var(--radius-lg)', cursor: 'pointer',
                            border: `2px solid ${form.payment === p.val ? 'var(--primary)' : 'var(--gray-200)'}`,
                            background: form.payment === p.val ? 'var(--green-50)' : 'var(--white)',
                            display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s'
                          }}
                        >
                          <i className={p.icon} style={{ fontSize: '1.3rem', color: form.payment === p.val ? 'var(--primary)' : 'var(--gray-400)', width: 24 }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--gray-900)' }}>{p.label}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{p.desc}</div>
                          </div>
                          {form.payment === p.val && <CheckCircle size={18} style={{ color: 'var(--primary)', marginLeft: 'auto' }} />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius-xl)', padding: 24 }}>
                    <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: '1rem' }}>Appointment Summary</h4>
                    {[
                      { label: 'Patient', val: form.name },
                      { label: 'Doctor', val: selectedDoctor?.name },
                      { label: 'Specialty', val: selectedDoctor?.specialty },
                      { label: 'Date', val: dates.find(d => d.value === form.date)?.label },
                      { label: 'Time', val: form.slot },
                      { label: 'Consultation Fee', val: `PKR ${selectedDoctor?.fee.toLocaleString() || '—'}` },
                    ].map(r => (
                      <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--gray-200)', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--gray-500)' }}>{r.label}</span>
                        <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{r.val || '—'}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '1rem', fontWeight: 800 }}>
                      <span>Total</span>
                      <span style={{ color: 'var(--primary)' }}>PKR {selectedDoctor?.fee.toLocaleString() || '—'}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                  <button className="btn btn-outline btn-lg" onClick={() => setStep(2)}>
                    <i className="fa-solid fa-arrow-left" style={{ marginRight: 4 }} /> Back
                  </button>
                  <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
                    Confirm Appointment <CheckCircle size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookAppointment;
