import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDoctors } from '../api/doctors';
import DoctorCard from '../components/doctors/DoctorCard';
import PageHero from '../components/layout/PageHero';
import { Section, SectionHeading } from '../components/layout/Section';
import PageLoader from '../components/ui/PageLoader';
import { useGsapReveal } from '../hooks/useGsapAnimations';
import { HERO_IMAGES } from '../utils/constants';

export default function Doctors() {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);

  const { data, isLoading } = useQuery({ queryKey: ['doctors'], queryFn: getDoctors });
  const doctors = data?.data || [];

  return (
    <div ref={pageRef} className="overflow-hidden">
      <PageHero
        image={HERO_IMAGES.doctors}
        title="Our Doctors"
        subtitle="Expert physicians with advanced qualifications and diverse specializations — here for you and your family."
      />

      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <SectionHeading
          center
          eyebrow="Medical Team"
          title="Doctor Profiles"
          description="Each profile includes specialization, qualifications, experience, and availability for booking."
        />
        {isLoading ? (
          <PageLoader />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map((d) => (
              <DoctorCard key={d._id} doctor={d} />
            ))}
          </div>
        )}
      </Section>

      <Section className="bg-white dark:bg-slate-950">
        <SectionHeading
          center
          eyebrow="Our Standard"
          title="Why Choose Our Team"
          description="We uphold the highest medical standards to ensure you receive world-class care."
        />
        <div className="grid gap-6 mt-4 lg:grid-cols-3">
          {[
            {
              title: 'Qualifications',
              text: 'MD, board certifications, fellowships, and continuous medical education.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ),
            },
            {
              title: 'Specializations',
              text: 'Experts in cardiology, neurology, pediatrics, orthopedics, and more.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              ),
            },
            {
              title: 'Patient-Centered',
              text: 'Collaborative care plans with clear communication at every visit.',
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <div key={item.title} className={`gsap-reveal glass-card group relative overflow-hidden p-8 transition-all hover:shadow-2xl hover:shadow-primary-500/10 ${i === 1 ? 'lg:-translate-y-4' : ''}`}>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-50 transition-transform duration-500 group-hover:scale-150 dark:bg-primary-900/20" />
              <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/80 dark:text-primary-400">
                {item.icon}
              </div>
              <h3 className="relative z-10 text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="relative z-10 mt-3 text-base text-slate-600 dark:text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
