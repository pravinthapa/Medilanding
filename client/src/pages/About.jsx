import { useRef } from 'react';
import { Eye, Heart, Target, Users } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import { Section, SectionHeading } from '../components/layout/Section';
import { useGsapReveal } from '../hooks/useGsapAnimations';
import { HERO_IMAGES, MISSION_VISION, TEAM } from '../utils/constants';

export default function About() {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);

  return (
    <div ref={pageRef} className="overflow-hidden">
      <PageHero
        image={HERO_IMAGES.about}
        title="About MediCare Clinic"
        subtitle="Dedicated to compassionate, evidence-based healthcare for our community since 1998."
      />

      <Section className="bg-white dark:bg-slate-950">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="gsap-reveal overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop"
              alt="Clinic interior"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="gsap-reveal">
            <SectionHeading eyebrow="Our History" title="A legacy of trusted care" />
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">{MISSION_VISION.history}</p>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Today we operate a 120-bed outpatient center with digital records, on-site diagnostics, and
              same-week scheduling for over 50,000 patients each year.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <SectionHeading center eyebrow="Purpose" title="Mission & Vision" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="gsap-reveal glass-card p-10 relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-primary-50 opacity-50 transition-transform group-hover:scale-150 dark:bg-primary-900/20" />
            <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
              <Target className="h-7 w-7" />
            </div>
            <h3 className="relative z-10 text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="relative z-10 mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">{MISSION_VISION.mission}</p>
          </div>
          <div className="gsap-reveal glass-card p-10 relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-primary-50 opacity-50 transition-transform group-hover:scale-150 dark:bg-primary-900/20" />
            <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
              <Eye className="h-7 w-7" />
            </div>
            <h3 className="relative z-10 text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="relative z-10 mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">{MISSION_VISION.vision}</p>
          </div>
        </div>
        <div className="gsap-reveal mt-10 glass-card flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 text-center sm:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
            <Heart className="h-8 w-8" />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Integrity, compassion, excellence, and respect guide every interaction — from front desk to
            operating room.
          </p>
        </div>
      </Section>

      <Section className="bg-white dark:bg-slate-950">
        <SectionHeading
          center
          eyebrow="Leadership"
          title="Team Information"
          description="Experienced clinicians and care coordinators working together for your wellbeing."
        />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name} className="gsap-reveal group text-center">
              <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full shadow-lg ring-4 ring-white dark:ring-slate-800">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
              <p className="mt-1 font-medium text-primary-600 dark:text-primary-400">{member.role}</p>
            </div>
          ))}
        </div>
        <div className="gsap-reveal mt-16 flex items-center justify-center gap-4 rounded-3xl bg-primary-50 p-8 dark:bg-primary-900/20">
          <div className="rounded-full bg-primary-200 p-3 text-primary-700 dark:bg-primary-800 dark:text-primary-300">
            <Users className="h-8 w-8" />
          </div>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            <strong>40+ specialists</strong> across cardiology, neurology, pediatrics, orthopedics, and more.
          </p>
        </div>
      </Section>
    </div>
  );
}
