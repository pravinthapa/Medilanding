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
    <div ref={pageRef}>
      <PageHero
        image={HERO_IMAGES.about}
        title="About MediCare Clinic"
        subtitle="Dedicated to compassionate, evidence-based healthcare for our community since 1998."
      />

      <Section className="bg-white dark:bg-slate-950">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="gsap-reveal overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop"
              alt="Clinic interior"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="gsap-reveal">
            <SectionHeading eyebrow="Our History" title="A legacy of trusted care" />
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">{MISSION_VISION.history}</p>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
              Today we operate a 120-bed outpatient center with digital records, on-site diagnostics, and
              same-week scheduling for over 50,000 patients each year.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <SectionHeading center eyebrow="Purpose" title="Mission & Vision" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="gsap-reveal glass-card p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{MISSION_VISION.mission}</p>
          </div>
          <div className="gsap-reveal glass-card p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{MISSION_VISION.vision}</p>
          </div>
        </div>
        <div className="gsap-reveal mt-8 glass-card flex items-start gap-4 p-6">
          <Heart className="h-8 w-8 shrink-0 text-primary-600" />
          <p className="text-slate-600 dark:text-slate-400">
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name} className="gsap-reveal group text-center">
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto h-40 w-40 rounded-2xl object-cover shadow-lg ring-4 ring-white transition group-hover:scale-105 dark:ring-slate-800"
              />
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{member.name}</h3>
              <p className="text-sm text-primary-600 dark:text-primary-400">{member.role}</p>
            </div>
          ))}
        </div>
        <div className="gsap-reveal mt-12 flex items-center justify-center gap-3 rounded-2xl bg-primary-50 p-6 dark:bg-primary-900/20">
          <Users className="h-8 w-8 text-primary-600" />
          <p className="text-slate-700 dark:text-slate-300">
            <strong>40+ specialists</strong> across cardiology, neurology, pediatrics, orthopedics, and more.
          </p>
        </div>
      </Section>
    </div>
  );
}
