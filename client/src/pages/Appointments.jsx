import { useRef } from 'react';
import { Clock, FileText, ShieldCheck } from 'lucide-react';
import AppointmentForm from '../components/appointments/AppointmentForm';
import PageHero from '../components/layout/PageHero';
import { Section, SectionHeading } from '../components/layout/Section';
import { useGsapReveal } from '../hooks/useGsapAnimations';
import { HERO_IMAGES } from '../utils/constants';

export default function Appointments() {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);

  return (
    <div ref={pageRef}>
      <PageHero
        image={HERO_IMAGES.appointments}
        title="Book an Appointment"
        subtitle="Submit an online booking request — our team will review and confirm your visit by email."
      />

      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <SectionHeading eyebrow="How it works" title="Online booking" />
            {[
              { icon: FileText, title: 'Fill the form', text: 'Choose your doctor, date, time, and describe symptoms.' },
              { icon: Clock, title: 'We review', text: 'Appointment requests are reviewed within 24 hours.' },
              { icon: ShieldCheck, title: 'Confirmation', text: 'You receive email when your visit is confirmed.' },
            ].map((step) => (
              <div key={step.title} className="gsap-reveal flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/50">
                  <step.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="gsap-reveal lg:col-span-2">
            <div className="glass-card p-6 sm:p-8">
              <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Appointment request form</h2>
              <AppointmentForm />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
