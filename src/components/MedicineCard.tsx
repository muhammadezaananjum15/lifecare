import type { Medicine } from '../data/medicines';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard = ({ medicine }: MedicineCardProps) => {
  const { addToCart } = useCart();
  const discount = medicine.originalPrice
    ? Math.round((1 - medicine.price / medicine.originalPrice) * 100)
    : 0;

  return (
    <div className="medicine-card">
      <div className="medicine-card-img">
        <img src={medicine.image} alt={medicine.name} loading="lazy" />
        {discount > 0 && (
          <div className="medicine-card-badge">
            <span className="badge badge-green">−{discount}% OFF</span>
          </div>
        )}
        {!medicine.inStock && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--radius-lg)'
          }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', background: 'rgba(0,0,0,0.6)', padding: '8px 16px', borderRadius: '4px' }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="medicine-card-category">{medicine.category}</div>
      <h3 className="medicine-card-name">{medicine.name}</h3>

      {/* Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={12} fill={i < Math.floor(medicine.rating) ? '#f59e0b' : 'none'} color={i < Math.floor(medicine.rating) ? '#f59e0b' : '#d1d5db'} />
        ))}
        <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginLeft: 2 }}>({medicine.reviews})</span>
      </div>

      <p className="medicine-card-desc">{medicine.description}</p>

      {/* Dosage */}
      <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 4 }}>
        <span style={{ fontWeight: 600, color: 'var(--gray-600)' }}>{medicine.dosage}</span> · {medicine.unit}
      </div>

      {medicine.requiresPrescription && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#ef4444', marginBottom: 8 }}>
          <i className="fa-solid fa-prescription" style={{ fontSize: '0.7rem' }} />
          Prescription Required
        </div>
      )}

      <div className="medicine-card-footer">
        <div>
          <div className="medicine-price">PKR {medicine.price}</div>
          {medicine.originalPrice && (
            <div className="medicine-price-old">PKR {medicine.originalPrice}</div>
          )}
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => addToCart(medicine)}
          disabled={!medicine.inStock}
          style={{ gap: 6 }}
        >
          <ShoppingCart size={14} />
          {medicine.inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default MedicineCard;
