import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, SlidersHorizontal } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { doctors, specialties } from '../data/doctors';

gsap.registerPlugin(ScrollTrigger);

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [specialty, setSpecialty] = useState(searchParams.get('specialty') || '');
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo('.page-hero-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    gsap.fromTo('.filter-bar', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.4 });
  }, []);

  useEffect(() => {
    gsap.fromTo('.doctor-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' });
  }, [search, specialty, availability]);

  const filtered = doctors.filter(d => {
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()) || d.qualification.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = !specialty || specialty === 'All Specialties' || d.specialty === specialty;
    const matchAvail = !availability || (availability === 'available' ? d.available : !d.available);
    return matchSearch && matchSpecialty && matchAvail;
  });

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item active">Find Doctors</span>
          </div>
          <h1 className="page-hero-title">Find Specialist Doctors</h1>
          <p className="page-hero-desc">Search from our network of 120+ board-certified specialists by name, specialty, or availability</p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section" style={{ background: 'var(--gray-50)', paddingTop: 48 }}>
        <div className="container">
          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="filter-bar-grid">
              <div className="form-group">
                <label className="form-label">Search Doctor</label>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: 40 }}
                    placeholder="Name, specialty, qualification..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Specialty</label>
                <select className="form-select" value={specialty} onChange={e => setSpecialty(e.target.value)}>
                  {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Availability</label>
                <select className="form-select" value={availability} onChange={e => setAvailability(e.target.value)}>
                  <option value="">All Doctors</option>
                  <option value="available">Available Today</option>
                  <option value="unavailable">Fully Booked</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">&nbsp;</label>
                <button className="btn btn-primary w-full" onClick={() => { setSearch(''); setSpecialty(''); setAvailability(''); }}>
                  <SlidersHorizontal size={16} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
              Showing <strong style={{ color: 'var(--gray-900)' }}>{filtered.length}</strong> doctor{filtered.length !== 1 ? 's' : ''}
              {specialty && specialty !== 'All Specialties' && <> in <strong style={{ color: 'var(--primary)' }}>{specialty}</strong></>}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ label: 'All', val: '' }, { label: 'Available', val: 'available' }].map(f => (
                <button
                  key={f.val}
                  className={`btn btn-sm ${availability === f.val ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setAvailability(f.val)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Grid */}
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><i className="fa-solid fa-user-doctor" /></div>
              <h3 className="empty-state-title">No doctors found</h3>
              <p className="empty-state-desc">Try adjusting your search or filter criteria</p>
              <button className="btn btn-primary" onClick={() => { setSearch(''); setSpecialty(''); setAvailability(''); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-4">
              {filtered.map(d => <DoctorCard key={d.id} doctor={d} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
