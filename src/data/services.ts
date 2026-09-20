export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: 'Emergency Care',
    description: '24/7 emergency services with fully equipped trauma bays, rapid response teams, and critical care specialists.',
    icon: 'fa-solid fa-truck-medical',
    features: ['24/7 Availability', 'Trauma Center', 'Critical Care ICU', 'Rapid Response'],
    color: '#ef4444'
  },
  {
    id: 2,
    title: 'Cardiology',
    description: 'Comprehensive heart care with advanced diagnostics, interventional procedures, and cardiac rehabilitation.',
    icon: 'fa-solid fa-heart-pulse',
    features: ['ECG & Echocardiography', 'Angioplasty', 'Cardiac Surgery', 'Heart Failure Clinic'],
    color: '#16a34a'
  },
  {
    id: 3,
    title: 'Neurology & Neurosurgery',
    description: 'Expert neurological care for brain, spine, and nerve disorders with cutting-edge diagnostic imaging.',
    icon: 'fa-solid fa-brain',
    features: ['MRI & CT Scan', 'Stroke Management', 'Epilepsy Clinic', 'Brain Surgery'],
    color: '#7c3aed'
  },
  {
    id: 4,
    title: 'Pediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents in a child-friendly environment.',
    icon: 'fa-solid fa-baby',
    features: ['NICU', 'Pediatric ICU', 'Vaccination', 'Child Development'],
    color: '#0ea5e9'
  },
  {
    id: 5,
    title: 'Orthopedics',
    description: 'Advanced bone, joint, and muscle care with state-of-the-art surgical and rehabilitation facilities.',
    icon: 'fa-solid fa-bone',
    features: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Fracture Care'],
    color: '#f59e0b'
  },
  {
    id: 6,
    title: 'Maternity & Women\'s Health',
    description: 'Comprehensive obstetric and gynecological care supporting women through every stage of life.',
    icon: 'fa-solid fa-venus',
    features: ['Antenatal Care', 'Labour Suite', 'High-Risk Pregnancy', 'Fertility Clinic'],
    color: '#ec4899'
  },
  {
    id: 7,
    title: 'Diagnostics & Imaging',
    description: 'Full-service diagnostic centre with MRI, CT, PET scans, ultrasound, and comprehensive lab testing.',
    icon: 'fa-solid fa-microscope',
    features: ['3T MRI Scanner', 'CT Angiography', 'Digital X-Ray', 'Laboratory'],
    color: '#14b8a6'
  },
  {
    id: 8,
    title: 'Oncology',
    description: 'Compassionate cancer care with multidisciplinary teams offering chemotherapy, radiation, and immunotherapy.',
    icon: 'fa-solid fa-ribbon',
    features: ['Chemotherapy', 'Radiation Therapy', 'Immunotherapy', 'Palliative Care'],
    color: '#f97316'
  },
  {
    id: 9,
    title: 'Physiotherapy & Rehabilitation',
    description: 'Evidence-based rehabilitation programs to restore function, reduce pain, and improve quality of life.',
    icon: 'fa-solid fa-person-walking',
    features: ['Post-Surgery Rehab', 'Neurological Rehab', 'Pain Management', 'Sports Injury'],
    color: '#16a34a'
  },
  {
    id: 10,
    title: 'Pharmacy',
    description: 'In-hospital pharmacy with a comprehensive range of medications, supplements, and medical supplies.',
    icon: 'fa-solid fa-pills',
    features: ['24/7 Dispensing', 'Online Orders', 'Home Delivery', 'Expert Consultation'],
    color: '#6366f1'
  },
  {
    id: 11,
    title: 'Dental Care',
    description: 'Complete dental services from routine cleanings to complex restorative and cosmetic procedures.',
    icon: 'fa-solid fa-tooth',
    features: ['General Dentistry', 'Orthodontics', 'Dental Implants', 'Cosmetic Dentistry'],
    color: '#22c55e'
  },
  {
    id: 12,
    title: 'Mental Health & Psychiatry',
    description: 'Confidential, compassionate mental health support for anxiety, depression, addiction, and more.',
    icon: 'fa-solid fa-head-side-brain',
    features: ['Individual Therapy', 'Group Therapy', 'Addiction Treatment', 'Child Psychiatry'],
    color: '#8b5cf6'
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Fatima Noor',
    role: 'Patient — Cardiology',
    text: 'The cardiology team at Lifecare literally saved my life. Dr. Ayesha Farooq is exceptional — her expertise and warmth made a terrifying experience feel manageable. The facilities are world-class.',
    rating: 5,
    initials: 'FN'
  },
  {
    id: 2,
    name: 'Ahmed Raza',
    role: 'Patient — Orthopedics',
    text: 'Had my knee replacement done here and the entire experience was superb. From admission to recovery, every staff member was professional and caring. Back to walking in just 6 weeks!',
    rating: 5,
    initials: 'AR'
  },
  {
    id: 3,
    name: 'Sana Malik',
    role: 'Patient — Maternity',
    text: 'Dr. Zainab and the maternity team were absolutely wonderful during my high-risk pregnancy. The NICU is top-notch and my baby received the best possible care. Forever grateful.',
    rating: 5,
    initials: 'SM'
  },
  {
    id: 4,
    name: 'Tariq Hassan',
    role: 'Patient — Neurology',
    text: 'After my stroke, the speed of Lifecare\'s response was incredible. Dr. Hamza\'s expertise in stroke management made a significant difference to my recovery. Highly recommend.',
    rating: 5,
    initials: 'TH'
  },
  {
    id: 5,
    name: 'Zara Mirza',
    role: 'Patient — Pediatrics',
    text: 'Dr. Sara Ahmed is simply the best pediatrician in Karachi. My children adore her and she always takes time to thoroughly explain everything. The pediatric ward is warm and child-friendly.',
    rating: 5,
    initials: 'ZM'
  },
  {
    id: 6,
    name: 'Bilal Qureshi',
    role: 'Patient — General Surgery',
    text: 'Underwent laparoscopic surgery with Dr. Usman. Minimal scarring, quick recovery, and excellent post-op care. The online appointment system is also very convenient.',
    rating: 4,
    initials: 'BQ'
  }
];
