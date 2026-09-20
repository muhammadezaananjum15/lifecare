import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Shield,
  Star,
  Clock,
  PhoneCall,
  Activity,
  Award,
  Stethoscope,
  Pill,
  Truck,
  Sparkles,
  MapPin,
  CheckCircle2,
  Calendar,
  Search,
  ShoppingCart
} from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { doctors } from '../data/doctors';
import { services, testimonials } from '../data/services';
import { medicines } from '../data/medicines';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

interface HeroSlideData {
  id: number;
  tag: string;
  titleLight: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  image: string;
  badgeTopText: string;
  badgeTopSub: string;
  badgeBottomVal: string;
  badgeBottomText: string;
  quickTags: string[];
}

const heroSlides: HeroSlideData[] = [
  {
    id: 1,
    tag: "Karachi's #1 Emergency & Level-1 Trauma Centre",
    titleLight: "Rapid Emergency Response",
    titleHighlight: "When Every Second",
    titleEnd: "Matters Most.",
    description: "Dedicated cardiac cath labs, 24/7 hyperbaric ICU suites, and 12-minute rapid ambulance dispatch stationed across Clifton, DHA, and Gulshan.",
    primaryBtnText: "Book Doctor Appointment",
    primaryBtnLink: "/book",
    secondaryBtnText: "Emergency: 111-911-911",
    secondaryBtnLink: "tel:+9221111911911",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=85",
    badgeTopText: "24/7 Emergency & ICU",
    badgeTopSub: "Trauma Teams On Standby",
    badgeBottomVal: "12 Mins",
    badgeBottomText: "Avg Ambulance Dispatch",
    quickTags: ["Level-1 Trauma", "24/7 Cath Lab", "Clifton & Gulshan Hubs"]
  },
  {
    id: 2,
    tag: "120+ Board-Certified Professors & Consultants",
    titleLight: "Pioneering Minimally Invasive",
    titleHighlight: "Robotic Surgery & Specialist",
    titleEnd: "OPD Clinics.",
    description: "Consult with internationally recognized leaders in Cardiology, Neurology, Orthopedics, and Oncology with guaranteed on-time consultations and digital prescriptions.",
    primaryBtnText: "Explore Specialist Doctors",
    primaryBtnLink: "/doctors",
    secondaryBtnText: "View Weekly Schedule",
    secondaryBtnLink: "/book",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=85",
    badgeTopText: "Next Slot Available",
    badgeTopSub: "Today 11:30 AM (Clifton)",
    badgeBottomVal: "99.4%",
    badgeBottomText: "Patient Satisfaction",
    quickTags: ["Cardiology", "Neurology", "Robotic Laparoscopy"]
  },
  {
    id: 3,
    tag: "Karachi Online Pharmacy • Express Dispatch",
    titleLight: "100% Genuine Prescription",
    titleHighlight: "Medicines Delivered in",
    titleEnd: "2 Hours.",
    description: "Temperature-regulated cold-chain delivery, certified clinical pharmacists, and automated dosage verification across all 18 Karachi towns.",
    primaryBtnText: "Order Medicines Online",
    primaryBtnLink: "/medicines",
    secondaryBtnText: "Upload Prescription",
    secondaryBtnLink: "/medicines",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&q=85",
    badgeTopText: "2-Hour Express Delivery",
    badgeTopSub: "Active Across Karachi",
    badgeBottomVal: "20% OFF",
    badgeBottomText: "Use Code: LIFECARE20",
    quickTags: ["Cold-Chain Storage", "PMDC Certified", "Free Delivery on PKR 1,500+"]
  },
  {
    id: 4,
    tag: "Cutting-Edge AI Diagnostics & Clinical Imaging",
    titleLight: "Ultra-Fast 3.0 Tesla MRI &",
    titleHighlight: "128-Slice Low-Dose CT",
    titleEnd: "Scans.",
    description: "Experience ultra-precise, low-radiation diagnostic imaging and molecular pathology with encrypted digital reports sent directly to your phone in under 4 hours.",
    primaryBtnText: "Explore Diagnostic Services",
    primaryBtnLink: "/services",
    secondaryBtnText: "Download Online Reports",
    secondaryBtnLink: "/contact",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=85",
    badgeTopText: "Digital Reports in 4 Hrs",
    badgeTopSub: "AI Radiologist Verification",
    badgeBottomVal: "99.9%",
    badgeBottomText: "Diagnostic Accuracy",
    quickTags: ["3.0T Silent MRI", "Digital Mammography", "Automated Lab"]
  }
];

// Karachi Zones for the Emergency Dispatch Widget
const karachiZones = [
  { name: 'Clifton / Sea View', eta: '6-8 mins', hub: 'Lifecare Main Hospital, Block 5 Clifton', phone: '021-3587-1122' },
  { name: 'DHA Phase 1-8', eta: '8-10 mins', hub: 'Lifecare DHA Medical Centre, 26th Street', phone: '021-3587-1123' },
  { name: 'Gulshan-e-Iqbal / Johar', eta: '10-12 mins', hub: 'Lifecare Gulshan Centre, University Rd', phone: '021-3498-1122' },
  { name: 'PECHS / Tariq Road', eta: '12-14 mins', hub: 'Lifecare Central Hub, Shahrah-e-Faisal', phone: '021-3455-1122' },
  { name: 'North Nazimabad', eta: '14-16 mins', hub: 'Lifecare North Satellite, Block L', phone: '021-3664-1122' },
  { name: 'Korangi / Malir', eta: '16-18 mins', hub: 'Lifecare East Rapid Unit, Korangi Rd', phone: '021-3506-1122' }
];

// Symptom Navigator Data
const symptomsData = [
  {
    symptom: 'Chest Tightness & Palpitations',
    department: 'Cardiology & Vascular',
    doctor: 'Dr. Tariq Mahmood',
    actionLink: '/doctors/1',
    tip: 'Immediate ECG and cardiac enzymes test advised'
  },
  {
    symptom: 'Severe Migraines & Dizziness',
    department: 'Neurology & Stroke Unit',
    doctor: 'Dr. Sarah Farooq',
    actionLink: '/doctors/2',
    tip: 'Comprehensive neurological screening & MRI support'
  },
  {
    symptom: 'Persistent Fever in Children',
    department: 'Pediatrics & Neonatal Care',
    doctor: 'Dr. Ayesha Malik',
    actionLink: '/doctors/3',
    tip: '24/7 Pediatric emergency consultation & vaccination'
  },
  {
    symptom: 'Joint Pain & Sports Injuries',
    department: 'Orthopedic & Joint Replacement',
    doctor: 'Dr. Kamran Siddiqui',
    actionLink: '/doctors/4',
    tip: 'Digital X-ray & arthroscopic minimally invasive treatment'
  },
  {
    symptom: 'Skin Rash & Allergic Reactions',
    department: 'Dermatology & Cosmetology',
    doctor: 'Dr. Zainab Akhtar',
    actionLink: '/doctors/6',
    tip: 'Patch testing & clinical allergy management'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedZone, setSelectedZone] = useState(0);
  const [selectedSymptom, setSelectedSymptom] = useState(0);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const slideTimerRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Carousel Auto-Play
  useEffect(() => {
    if (isPaused) return;

    slideTimerRef.current = window.setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isPaused]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter ticker animation
      ScrollTrigger.create({
        trigger: '.stats-floating-strip',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          document.querySelectorAll('.stat-number-count').forEach(el => {
            const target = parseInt(el.getAttribute('data-target') || '0', 10);
            const counter = { val: 0 };
            gsap.to(counter, {
              val: target,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.round(counter.val).toLocaleString();
              }
            });
          });
        }
      });

      // Reveal animations
      gsap.utils.toArray('.reveal-up').forEach((el: any) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      });

      gsap.utils.toArray('.reveal-stagger-cards').forEach((parent: any) => {
        gsap.fromTo(parent.children, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: parent, start: 'top 85%', once: true }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/doctors?search=${encodeURIComponent(searchDoctor)}&specialty=${encodeURIComponent(searchSpecialty)}`);
  };

  const featuredDoctors = doctors.slice(0, 4);
  const featuredMedicines = medicines.slice(0, 4);
  const activeSlideData = heroSlides[currentSlide];

  return (
    <>
      {/* ========================================================= */}
      {/* HERO SECTION WITH DYNAMIC CAROUSEL                        */}
      {/* ========================================================= */}
      <section
        className="hero-carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="hero-carousel-bg-glow" />
        <div className="hero-carousel-bg-glow-2" />

        <div className="container" style={{ position: 'relative', zIndex: 5, flex: 1, display: 'flex', alignItems: 'center' }}>
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`hero-slide ${isActive ? 'active' : ''}`}
                style={{ width: '100%' }}
              >
                <div className="hero-slide-grid">
                  {/* Left: Content */}
                  <div>
                    <div className="hero-tag-pill">
                      <span className="hero-live-indicator" />
                      {slide.tag}
                    </div>

                    <h1 className="hero-slide-title">
                      {slide.titleLight}{' '}
                      <span>{slide.titleHighlight}</span>{' '}
                      {slide.titleEnd}
                    </h1>

                    <p className="hero-slide-desc">
                      {slide.description}
                    </p>

                    <div className="hero-slide-actions">
                      <Link to={slide.primaryBtnLink} className="btn btn-primary btn-lg" style={{ boxShadow: '0 8px 30px rgba(74, 222, 128, 0.35)' }}>
                        {slide.primaryBtnText} <ArrowRight size={18} />
                      </Link>

                      {slide.secondaryBtnLink.startsWith('tel:') ? (
                        <a href={slide.secondaryBtnLink} className="btn btn-ghost btn-lg">
                          <PhoneCall size={18} style={{ color: '#ef4444' }} /> {slide.secondaryBtnText}
                        </a>
                      ) : (
                        <Link to={slide.secondaryBtnLink} className="btn btn-ghost btn-lg">
                          {slide.secondaryBtnText} <ChevronRight size={18} />
                        </Link>
                      )}
                    </div>

                    {/* Quick Tags */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Highlights:
                      </span>
                      {slide.quickTags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            color: '#dcfce7',
                            fontWeight: 500
                          }}
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Visual Showcase */}
                  <div className="hero-visual-card">
                    <img
                      src={slide.image}
                      alt={slide.titleLight}
                      className="hero-visual-img"
                    />

                    {/* Floating Top Badge */}
                    <div className="hero-floating-badge-top">
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <Activity size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>{slide.badgeTopText}</div>
                        <div style={{ fontSize: '0.75rem', color: '#86efac' }}>{slide.badgeTopSub}</div>
                      </div>
                    </div>

                    {/* Floating Bottom Metric */}
                    <div className="hero-floating-badge-bottom">
                      <div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{slide.badgeBottomVal}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--gray-600)', fontWeight: 600 }}>{slide.badgeBottomText}</div>
                      </div>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--green-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                        <CheckCircle2 size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CAROUSEL BOTTOM CONTROLS & TABS */}
        <div className="hero-controls-bar">
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
              {/* Arrow navigation buttons */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={prevSlide}
                  className="hero-arrow-btn"
                  title="Previous Slide"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="hero-arrow-btn"
                  title="Next Slide"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Slide Tabs */}
              <div className="hero-nav-tabs" style={{ flex: 1 }}>
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    className={`hero-nav-tab ${idx === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(idx)}
                  >
                    <div className="hero-nav-tab-index">0{slide.id} • HIGHLIGHT</div>
                    <div className="hero-nav-tab-title">{slide.tag.split('•')[0].trim()}</div>
                    {idx === currentSlide && <div className="hero-tab-progress" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FLOATING STATS STRIP                                      */}
      {/* ========================================================= */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="container">
          <div className="stats-floating-strip">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
              {[
                { icon: <Award size={26} />, count: 18, suffix: '+ Years', label: 'Clinical Excellence' },
                { icon: <Stethoscope size={26} />, count: 120, suffix: '+', label: 'Consultant Doctors' },
                { icon: <Heart size={26} />, count: 500, suffix: 'K+', label: 'Karachi Patients Cured' },
                { icon: <Clock size={26} />, count: 24, suffix: '/7', label: 'Emergency & Pharmacy' },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '16px', background: 'var(--green-50)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {stat.icon}
                  </div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--gray-900)', lineHeight: 1.1 }}>
                    <span className="stat-number-count" data-target={stat.count}>0</span>
                    <span style={{ color: 'var(--primary)' }}>{stat.suffix}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)', fontWeight: 600 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* UNIQUE PATTERN 1: KARACHI EMERGENCY DISPATCH ESTIMATOR   */}
      {/* ========================================================= */}
      <section className="section" style={{ background: 'var(--gray-50)', paddingTop: 40 }}>
        <div className="container">
          <div className="dispatch-widget-card reveal-up">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 48, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '6px 14px', borderRadius: '30px', color: '#fca5a5', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', animation: 'liveBlink 1.5s infinite' }} />
                  Live Karachi Ambulance Dispatch
                </div>

                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'white', marginBottom: 14 }}>
                  Select Your Karachi Location for Instant Medical Response
                </h2>

                <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.98rem', marginBottom: 24, lineHeight: 1.6 }}>
                  Lifecare maintains rapid-response ambulances with onboard oxygen, telemetry, and trauma paramedics stationed strategically across major Karachi districts.
                </p>

                {/* Zone pills */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
                  {karachiZones.map((z, idx) => (
                    <button
                      key={z.name}
                      className={`zone-selector-pill ${selectedZone === idx ? 'active' : ''}`}
                      onClick={() => setSelectedZone(idx)}
                    >
                      <MapPin size={14} style={{ display: 'inline', marginRight: 4 }} />
                      {z.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dispatch status readout */}
              <div style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '20px', padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>
                  Estimated Arrival Time in {karachiZones[selectedZone].name}
                </div>

                <div style={{ fontSize: '3.2rem', fontWeight: 900, color: '#4ade80', lineHeight: 1, marginBottom: 12 }}>
                  {karachiZones[selectedZone].eta}
                </div>

                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: 20 }}>
                  Nearest Centre: <strong>{karachiZones[selectedZone].hub}</strong>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <a
                    href={`tel:${karachiZones[selectedZone].phone}`}
                    className="btn btn-primary"
                    style={{ background: '#ef4444', borderColor: '#ef4444', fontSize: '1rem' }}
                  >
                    <PhoneCall size={18} /> Call Ambulance Dispatch ({karachiZones[selectedZone].phone})
                  </a>
                  <Link to="/contact" className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>
                    View All 6 Hospital Branches
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* UNIQUE PATTERN 2: INTERACTIVE SYMPTOM-TO-DOCTOR FINDER    */}
      {/* ========================================================= */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header reveal-up">
            <div className="section-tag">
              <Sparkles size={14} /> Smart Healthcare Navigator
            </div>
            <h2 className="section-title">What Symptoms Are You Experiencing?</h2>
            <p className="section-desc">
              Choose your primary concern below. Our clinical algorithm connects you directly to the correct department and on-duty Karachi consultants.
            </p>
          </div>

          {/* Symptom chips */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 40 }} className="reveal-up">
            {symptomsData.map((s, idx) => (
              <button
                key={s.symptom}
                className={`symptom-chip ${selectedSymptom === idx ? 'active' : ''}`}
                onClick={() => setSelectedSymptom(idx)}
              >
                <Activity size={16} />
                {s.symptom}
              </button>
            ))}
          </div>

          {/* Dynamic Match Result Card */}
          <div className="reveal-up" style={{ maxWidth: 880, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--green-50) 0%, #ffffff 100%)', border: '2px solid var(--green-200)', borderRadius: '24px', padding: '36px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center', boxShadow: 'var(--shadow-lg)' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--green-100)', color: 'var(--green-800)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, marginBottom: 12 }}>
                  Recommended Department
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: 8 }}>
                  {symptomsData[selectedSymptom].department}
                </h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem', marginBottom: 12 }}>
                  💡 <strong>Clinical Guidance:</strong> {symptomsData[selectedSymptom].tip}
                </p>
                <div style={{ fontSize: '0.9rem', color: 'var(--gray-700)' }}>
                  Lead On-Duty Specialist: <strong>{symptomsData[selectedSymptom].doctor}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 200 }}>
                <Link to={symptomsData[selectedSymptom].actionLink} className="btn btn-primary">
                  Book with Specialist <ArrowRight size={16} />
                </Link>
                <Link to="/book" className="btn btn-outline" style={{ background: 'white' }}>
                  Choose Time Slot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SPECIALIST DOCTORS SPOTLIGHT                              */}
      {/* ========================================================= */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="section-tag"><Stethoscope size={14} /> Certified Consultants</div>
              <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Meet Our Top Karachi Specialists</h2>
            </div>
            <Link to="/doctors" className="btn btn-outline">
              View All 120+ Doctors <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-4 reveal-stagger-cards">
            {featuredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2-HOUR PHARMACY QUICK-ORDER SECTION                       */}
      {/* ========================================================= */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="section-tag"><Pill size={14} /> 24/7 Lifecare Pharmacy</div>
              <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>
                Fast Medicine Delivery in Karachi
              </h2>
              <p style={{ color: 'var(--gray-500)', marginTop: 8 }}>
                Genuine prescription medicines, chronic condition refills, and cold-chain insulin delivered directly to your doorstep.
              </p>
            </div>
            <Link to="/medicines" className="btn btn-primary">
              Visit Full Pharmacy <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-4 reveal-stagger-cards">
            {featuredMedicines.map(med => (
              <div
                key={med.id}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '20px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div>
                  <img
                    src={med.image}
                    alt={med.name}
                    style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: '14px', marginBottom: 14 }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', background: 'var(--green-50)', padding: '3px 8px', borderRadius: '6px' }}>
                      {med.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{med.dosage}</span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>{med.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: 14 }}>{med.description.slice(0, 60)}...</p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gray-900)' }}>
                      PKR {med.price}
                    </div>
                    {med.inStock && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>✓ In Stock</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(med)}
                    className="btn btn-primary w-full"
                    style={{ padding: '10px 16px', fontSize: '0.88rem' }}
                  >
                    <ShoppingCart size={15} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* COMPREHENSIVE HOSPITAL SERVICES (DEPARTMENTS)             */}
      {/* ========================================================= */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header reveal-up">
            <div className="section-tag"><Activity size={14} /> Medical Excellence</div>
            <h2 className="section-title">20+ Super-Specialized Departments</h2>
            <p className="section-desc">
              Every department is equipped with internationally certified infrastructure and multidisciplinary clinical teams.
            </p>
          </div>

          <div className="grid grid-3 reveal-stagger-cards">
            {services.slice(0, 6).map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon-wrap">
                  <i className={service.icon} />
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
                <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {service.features.slice(0, 3).map(f => (
                    <span key={f} style={{ background: 'var(--green-50)', color: 'var(--green-700)', padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600 }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 48 }}>
            <Link to="/services" className="btn btn-outline btn-lg">
              Explore All Hospital Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PATIENT TESTIMONIALS & TRUST                              */}
      {/* ========================================================= */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header reveal-up">
            <div className="section-tag"><Heart size={14} /> Patient Experiences</div>
            <h2 className="section-title">Trusted by Karachi Families Since 2008</h2>
            <p className="section-desc">
              Hear directly from patients whose lives were transformed by our expert care.
            </p>
          </div>

          <div className="grid grid-3 reveal-stagger-cards">
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <i key={i} className="fa-solid fa-star star" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar-placeholder">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 24/7 EMERGENCY CONTACT FOOTER BANNER                      */}
      {/* ========================================================= */}
      <section style={{ background: 'var(--gray-900)', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 64, height: 64, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-truck-medical" />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                  24/7 Emergency & ICU Services
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>
                  Need Immediate Medical Attention?
                </h3>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Emergency Hotline</div>
                <a href="tel:+9221111911911" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ef4444', letterSpacing: '-0.02em' }}>
                  +92-21-111-911-911
                </a>
              </div>
              <div style={{ width: 1, height: 48, background: 'var(--gray-700)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>OPD Consultation</div>
                <a href="tel:+9221111543322" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--green-400)', letterSpacing: '-0.02em' }}>
                  111-543-322
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
