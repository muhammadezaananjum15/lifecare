import { Link } from 'react-router-dom';
import type { Doctor } from '../data/doctors';
import { MapPin, Award, Star, Clock, ChevronRight } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(doctor.rating));

  return (
    <div className="doctor-card">
      <div className="doctor-card-img">
        <img src={doctor.image} alt={doctor.name} loading="lazy" />
        <div className="doctor-card-overlay" />
        <div className="doctor-card-badge">
          {doctor.available ? '✓ Available Today' : 'Fully Booked'}
        </div>
        <div className="doctor-card-actions">
          <Link
            to={`/doctors/${doctor.id}`}
            className="btn btn-white btn-sm"
            style={{ flex: 1, fontSize: '0.8rem', padding: '8px 16px' }}
          >
            View Profile
          </Link>
          <Link
            to={`/book-appointment?doctor=${doctor.id}`}
            className="btn btn-primary btn-sm"
            style={{ flex: 1, fontSize: '0.8rem', padding: '8px 16px' }}
          >
            Book Now
          </Link>
        </div>
      </div>

      <div className="doctor-card-body">
        <div className="doctor-card-specialty">{doctor.specialty}</div>
        <h3 className="doctor-card-name">{doctor.name}</h3>

        <div className="doctor-card-rating">
          {stars.map((full, i) => (
            <i key={i} className={`fa-solid fa-star ${full ? 'star' : 'star-empty'}`} />
          ))}
          <span className="rating-count">({doctor.reviews} reviews)</span>
        </div>

        <div className="doctor-card-info">
          <span className="doctor-card-info-item">
            <Award size={12} style={{ color: 'var(--primary)' }} />
            {doctor.experience} yrs exp.
          </span>
          <span className="doctor-card-info-item">
            <MapPin size={12} style={{ color: 'var(--primary)' }} />
            {doctor.city}
          </span>
          <span className="doctor-card-info-item">
            <Clock size={12} style={{ color: 'var(--primary)' }} />
            {doctor.slots.length} slots
          </span>
        </div>

        <div className="doctor-card-footer">
          <div className="doctor-fee">
            <span className="doctor-fee-label">Consultation Fee</span>
            <span className="doctor-fee-amount">PKR {doctor.fee.toLocaleString()}</span>
          </div>
          <Link
            to={`/doctors/${doctor.id}`}
            className="btn btn-outline btn-sm"
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
          >
            Details <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
