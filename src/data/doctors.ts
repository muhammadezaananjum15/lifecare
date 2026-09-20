export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  city: string;
  hospital: string;
  image: string;
  available: boolean;
  languages: string[];
  slots: string[];
  about: string;
  awards: string[];
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Ayesha Farooq',
    specialty: 'Cardiologist',
    qualification: 'MBBS, FCPS (Cardiology)',
    experience: 15,
    rating: 4.9,
    reviews: 312,
    fee: 2500,
    city: 'Karachi',
    hospital: 'Lifecare Hospital',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    available: true,
    languages: ['Urdu', 'English'],
    slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
    about: 'Dr. Ayesha Farooq is a highly experienced cardiologist with 15 years of practice. She specializes in interventional cardiology and heart failure management.',
    awards: ['Best Cardiologist Award 2022', 'Excellence in Patient Care 2021']
  },
  {
    id: 2,
    name: 'Dr. Hamza Malik',
    specialty: 'Neurologist',
    qualification: 'MBBS, MRCP (Neurology)',
    experience: 12,
    rating: 4.8,
    reviews: 254,
    fee: 3000,
    city: 'Karachi',
    hospital: 'Lifecare Hospital',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    available: true,
    languages: ['Urdu', 'English', 'Sindhi'],
    slots: ['10:00 AM', '11:30 AM', '01:00 PM', '03:30 PM', '05:00 PM'],
    about: 'Dr. Hamza Malik is a renowned neurologist specializing in stroke management, epilepsy, and movement disorders.',
    awards: ['Outstanding Neurologist Award 2023']
  },
  {
    id: 3,
    name: 'Dr. Sara Ahmed',
    specialty: 'Pediatrician',
    qualification: 'MBBS, DCH, FCPS (Pediatrics)',
    experience: 10,
    rating: 4.9,
    reviews: 418,
    fee: 2000,
    city: 'Karachi',
    hospital: 'Lifecare Hospital',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    available: true,
    languages: ['Urdu', 'English'],
    slots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:00 PM'],
    about: 'Dr. Sara Ahmed is a compassionate pediatrician dedicated to children\'s health from birth through adolescence.',
    awards: ['Best Pediatrician Karachi 2023', 'Patient\'s Choice Award 2022']
  },
  {
    id: 4,
    name: 'Dr. Imran Siddiqui',
    specialty: 'Orthopedic Surgeon',
    qualification: 'MBBS, FRCS (Orthopedics)',
    experience: 18,
    rating: 4.7,
    reviews: 289,
    fee: 3500,
    city: 'Karachi',
    hospital: 'Lifecare Hospital',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    available: false,
    languages: ['Urdu', 'English'],
    slots: ['11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
    about: 'Dr. Imran Siddiqui is a senior orthopedic surgeon specializing in joint replacement, sports injuries, and spine surgery.',
    awards: ['Gold Medal in Orthopedics 2018']
  },
  {
    id: 5,
    name: 'Dr. Nadia Khan',
    specialty: 'Dermatologist',
    qualification: 'MBBS, DDV, FCPS (Dermatology)',
    experience: 8,
    rating: 4.8,
    reviews: 376,
    fee: 2200,
    city: 'Karachi',
    hospital: 'Lifecare Hospital',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80',
    available: true,
    languages: ['Urdu', 'English'],
    slots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:30 PM'],
    about: 'Dr. Nadia Khan is an expert dermatologist specializing in medical and cosmetic dermatology, laser treatments, and skin cancer.',
    awards: ['Best Dermatologist Award 2022']
  },
  {
    id: 6,
    name: 'Dr. Usman Tariq',
    specialty: 'General Surgeon',
    qualification: 'MBBS, FCPS (Surgery)',
    experience: 14,
    rating: 4.6,
    reviews: 198,
    fee: 2800,
    city: 'Karachi',
    hospital: 'Lifecare Hospital',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    available: true,
    languages: ['Urdu', 'English', 'Punjabi'],
    slots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    about: 'Dr. Usman Tariq is a skilled general surgeon with expertise in laparoscopic surgery, hernia repair, and abdominal procedures.',
    awards: ['Excellence in Surgical Innovation 2021']
  },
  {
    id: 7,
    name: 'Dr. Zainab Mirza',
    specialty: 'Gynecologist',
    qualification: 'MBBS, MRCOG, FCPS (Gynecology)',
    experience: 11,
    rating: 4.9,
    reviews: 521,
    fee: 2500,
    city: 'Karachi',
    hospital: 'Lifecare Hospital',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&q=80',
    available: true,
    languages: ['Urdu', 'English'],
    slots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM'],
    about: 'Dr. Zainab Mirza is a leading gynecologist and obstetrician with extensive experience in high-risk pregnancies and minimally invasive procedures.',
    awards: ['Best Gynecologist Karachi 2023', 'Women\'s Health Champion Award']
  },
  {
    id: 8,
    name: 'Dr. Faisal Rehman',
    specialty: 'Psychiatrist',
    qualification: 'MBBS, MRCPsych (UK)',
    experience: 9,
    rating: 4.7,
    reviews: 167,
    fee: 3000,
    city: 'Karachi',
    hospital: 'Lifecare Hospital',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80',
    available: true,
    languages: ['Urdu', 'English'],
    slots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'],
    about: 'Dr. Faisal Rehman provides compassionate mental health care, specializing in depression, anxiety, bipolar disorder, and addiction psychiatry.',
    awards: ['Mental Health Advocacy Award 2022']
  }
];

export const specialties = [
  'All Specialties',
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Dermatologist',
  'General Surgeon',
  'Gynecologist',
  'Psychiatrist',
];
