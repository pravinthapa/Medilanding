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
        <div className="gsap-reveal glass-card grid gap-8 p-10 md:grid-cols-3 border-t-4 border-t-primary-500">
          {[
            { title: 'Qualifications', text: 'MD, board certifications, fellowships, and continuing medical education.' },
            { title: 'Specializations', text: 'Cardiology, neurology, pediatrics, orthopedics, and primary care.' },
            { title: 'Patient-Centered', text: 'Collaborative care plans with clear communication at every visit.' },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
