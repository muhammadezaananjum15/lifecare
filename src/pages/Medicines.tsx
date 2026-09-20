import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Search, Filter } from 'lucide-react';
import MedicineCard from '../components/MedicineCard';
import { medicines, medicineCategories } from '../data/medicines';

const Medicines = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [prescriptionOnly, setPrescriptionOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo('.page-hero-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
  }, []);

  useEffect(() => {
    gsap.fromTo('.medicine-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' });
  }, [search, category, prescriptionOnly, inStockOnly, sortBy]);

  let filtered = medicines.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()) || m.manufacturer.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All Categories' || m.category === category;
    const matchRx = !prescriptionOnly || m.requiresPrescription;
    const matchStock = !inStockOnly || m.inStock;
    return matchSearch && matchCat && matchRx && matchStock;
  });

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item active">Pharmacy</span>
          </div>
          <h1 className="page-hero-title">Online Pharmacy</h1>
          <p className="page-hero-desc">Order genuine medicines online — delivered to your door across Karachi within hours</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            {['✓ 100% Genuine Medicines', '✓ Fast Delivery', '✓ Expert Consultation', '✓ Easy Returns'].map(b => (
              <span key={b} style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)', color: 'var(--green-300)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray-50)', paddingTop: 48 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32, alignItems: 'start' }}>
            {/* Sidebar Filters */}
            <div className="card" style={{ position: 'sticky', top: 100, padding: 24 }}>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 20 }}>
                <Filter size={16} style={{ color: 'var(--primary)', marginRight: 6 }} />
                Filter Medicines
              </h3>

              {/* Search */}
              <div className="form-group" style={{ marginBottom: 20 }}>
                <label className="form-label">Search</label>
                <div style={{ position: 'relative' }}>
                  <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                  <input type="text" className="form-input" style={{ paddingLeft: 36, fontSize: '0.875rem' }} placeholder="Medicine name..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
              </div>

              {/* Category */}
              <div style={{ marginBottom: 20 }}>
                <div className="form-label" style={{ marginBottom: 10 }}>Category</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {medicineCategories.map(c => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '8px 12px', borderRadius: 'var(--radius-md)', border: 'none',
                        cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.85rem',
                        fontWeight: category === c ? 600 : 400, textAlign: 'left',
                        background: category === c ? 'var(--green-50)' : 'transparent',
                        color: category === c ? 'var(--primary)' : 'var(--gray-600)',
                        transition: 'all 0.2s'
                      }}
                    >
                      {c}
                      <span style={{ background: category === c ? 'var(--green-100)' : 'var(--gray-100)', color: category === c ? 'var(--green-700)' : 'var(--gray-500)', padding: '1px 7px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 600 }}>
                        {medicines.filter(m => c === 'All Categories' ? true : m.category === c).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'In Stock Only', state: inStockOnly, setter: setInStockOnly },
                  { label: 'Prescription Required', state: prescriptionOnly, setter: setPrescriptionOnly },
                ].map(({ label, state, setter }) => (
                  <label key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)', fontWeight: 500 }}>{label}</span>
                    <div
                      onClick={() => setter(!state)}
                      style={{
                        width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                        background: state ? 'var(--primary)' : 'var(--gray-200)',
                        position: 'relative', transition: 'background 0.2s', flexShrink: 0
                      }}
                    >
                      <div style={{
                        position: 'absolute', top: 3, left: state ? 23 : 3,
                        width: 18, height: 18, borderRadius: '50%',
                        background: 'white', transition: 'left 0.2s',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
                      }} />
                    </div>
                  </label>
                ))}
              </div>

              <button className="btn btn-outline w-full btn-sm" style={{ marginTop: 20 }} onClick={() => { setSearch(''); setCategory('All Categories'); setPrescriptionOnly(false); setInStockOnly(false); setSortBy('default'); }}>
                Reset Filters
              </button>
            </div>

            {/* Products grid */}
            <div>
              {/* Sort bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--gray-900)' }}>{filtered.length}</strong> medicines found
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Sort by:</span>
                  <select className="form-select" style={{ width: 'auto', fontSize: '0.875rem', padding: '8px 12px' }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon"><i className="fa-solid fa-pills" /></div>
                  <h3 className="empty-state-title">No medicines found</h3>
                  <p className="empty-state-desc">Try different search terms or filters</p>
                  <button className="btn btn-primary" onClick={() => { setSearch(''); setCategory('All Categories'); }}>Clear Filters</button>
                </div>
              ) : (
                <div className="grid grid-3">
                  {filtered.map(m => <MedicineCard key={m.id} medicine={m} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Medicines;
