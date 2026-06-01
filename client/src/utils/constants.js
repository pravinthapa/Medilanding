export const HERO_IMAGES = {
  home: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop&q=80',
  about: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1600&h=900&fit=crop&q=80',
  doctors: 'https://images.unsplash.com/photo-1631217868264-e5b89f5b4ab8?w=1600&h=900&fit=crop&q=80',
  services: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&h=900&fit=crop&q=80',
  appointments: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop&q=80',
  contact: 'https://images.unsplash.com/photo-1423666639048-f5600c27da93?w=1600&h=900&fit=crop&q=80',
  blog: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1600&h=900&fit=crop&q=80',
};

export const CLINIC_INTRO = {
  title: 'MediCare Clinic',
  tagline: 'Advanced care. Human touch.',
  description:
    'For over 25 years, MediCare Clinic has delivered trusted outpatient and specialty care with board-certified physicians, digital health records, and same-week appointments for families across our community.',
  stats: [
    { value: '50K+', label: 'Patients served yearly' },
    { value: '40+', label: 'Specialist physicians' },
    { value: '24/7', label: 'Emergency support line' },
    { value: '98%', label: 'Patient satisfaction' },
  ],
};

export const SERVICES = [
  {
    id: 1,
    title: 'General Consultation',
    description: 'Primary care visits, health screenings, chronic disease management, and preventive wellness plans.',
    icon: 'Stethoscope',
    features: ['Annual physicals', 'Illness & injury care', 'Referrals to specialists'],
  },
  {
    id: 2,
    title: 'Diagnostics',
    description: 'On-site laboratory, imaging, and rapid-result testing for accurate same-day decisions.',
    icon: 'Microscope',
    features: ['Blood work & urinalysis', 'X-ray & ultrasound', 'Cardiac screening'],
  },
  {
    id: 3,
    title: 'Vaccinations',
    description: 'Immunizations for children, adults, travel, and seasonal flu with certified nursing staff.',
    icon: 'Syringe',
    features: ['Pediatric vaccines', 'Travel medicine', 'Flu & COVID boosters'],
  },
  {
    id: 4,
    title: 'Specialized Treatments',
    description: 'Cardiology, neurology, pediatrics, orthopedics, and coordinated multi-specialty care.',
    icon: 'HeartPulse',
    features: ['Cardiac care', 'Neurology', 'Sports medicine'],
  },
  {
    id: 5,
    title: 'Emergency Care',
    description: '24/7 triage line and rapid stabilization with direct hospital transfer when needed.',
    icon: 'Siren',
    features: ['Urgent walk-ins', 'Ambulance coordination', 'Critical care network'],
  },
  {
    id: 6,
    title: 'Telehealth',
    description: 'Secure video consultations for follow-ups, prescriptions, and minor illness from home.',
    icon: 'Video',
    features: ['Same-day slots', 'E-prescriptions', 'Secure messaging'],
  },
];

export const TEAM = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Medical Director — Cardiology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. James Chen',
    role: 'Head of Neurology',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Chief of Pediatrics',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
  },
  {
    name: 'Nurse Patricia Cole',
    role: 'Director of Patient Care',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop',
  },
];

export const MISSION_VISION = {
  mission:
    'To deliver accessible, compassionate, and evidence-based healthcare that improves quality of life for every patient we serve.',
  vision:
    'To be the most trusted community clinic — recognized for clinical excellence, innovation, and unwavering patient advocacy.',
  history:
    'Founded in 1998 as a single-family practice, MediCare grew into a full-service medical center through community trust, modern facilities opened in 2015, and a digital-first patient experience launched in 2022.',
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Jennifer Adams',
    role: 'Patient since 2019',
    text: 'The staff was incredibly caring. My appointment was handled professionally from start to finish.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Robert Williams',
    role: 'Patient since 2021',
    text: 'Best clinic experience I have had. Quick booking and excellent doctors.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Maria Garcia',
    role: 'Patient since 2017',
    text: 'Clean facilities, modern equipment, and doctors who truly listen. Highly recommend!',
    rating: 5,
  },
];

export const CONTACT_INFO = {
  phone: '+1 (555) 123-4567',
  emergency: '1-800-MEDICARE',
  email: 'info@medicare-clinic.com',
  appointments: 'appointments@medicare-clinic.com',
  address: '123 Healthcare Boulevard, Medical City, MC 10001',
  hours: 'Mon–Fri 8AM–8PM · Sat 9AM–5PM · Sun Emergency only',
};

export const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  confirmed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  rescheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
};

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
