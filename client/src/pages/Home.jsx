import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { getDoctors } from '../api/doctors';
import DoctorCard from '../components/doctors/DoctorCard';
import ServiceCard from '../components/services/ServiceCard';
import PageHero from '../components/layout/PageHero';
import { Section, SectionHeading } from '../components/layout/Section';
import PageLoader from '../components/ui/PageLoader';
import { useGsapReveal } from '../hooks/useGsapAnimations';
import { CLINIC_INTRO, HERO_IMAGES, SERVICES, TESTIMONIALS } from '../utils/constants';

export default function Home() {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);

  const { data, isLoading } = useQuery({ queryKey: ['doctors'], queryFn: getDoctors });
  const doctors = data?.data?.slice(0, 4) || [];

  return (
    <div ref={pageRef} className="overflow-hidden">
      <PageHero
        image={HERO_IMAGES.home}
        title={
          <>
            Your Health, Our <span className="text-primary-400">Priority</span>
          </>
        }
        subtitle={CLINIC_INTRO.description}
      >
        <div className="flex flex-wrap gap-4">
          <Link to="/appointments" className="btn-primary">
            Book Appointment <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/about" className="btn-outline">
            About Our Clinic
          </Link>
        </div>
      </PageHero>

      <Section className="bg-white dark:bg-slate-950">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="gsap-reveal">
            <SectionHeading
              eyebrow="Clinic Introduction"
              title={CLINIC_INTRO.title}
              description={CLINIC_INTRO.tagline}
            />
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">{CLINIC_INTRO.description}</p>
            <Link to="/about" className="group mt-8 inline-flex items-center gap-2 font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              Learn our story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="gsap-reveal grid grid-cols-2 gap-6">
            {CLINIC_INTRO.stats.map((s, i) => (
              <div key={s.label} className={`glass-card p-8 text-center ${i % 2 === 1 ? 'lg:translate-y-8' : ''}`}>
                <p className="text-4xl font-extrabold tracking-tight text-primary-600 dark:text-primary-400">{s.value}</p>
                <p className="mt-2 font-medium text-slate-600 dark:text-slate-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <SectionHeading
          center
          eyebrow="What We Offer"
          title="Services Overview"
          description="Comprehensive care from consultation to specialized treatment — all under one roof."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/services" className="btn-outline-dark px-8">
            View All Services
          </Link>
        </div>
      </Section>

      <Section className="bg-white dark:bg-slate-950">
        <SectionHeading
          eyebrow="Expert Team"
          title="Featured Doctors"
          description="Board-certified specialists dedicated to personalized patient care."
        />
        {isLoading ? (
          <PageLoader />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d) => (
              <DoctorCard key={d._id} doctor={d} />
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <Link to="/doctors" className="group inline-flex items-center gap-2 font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Meet the Full Team <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Section>

      <section className="relative overflow-hidden bg-primary-900 py-24">
        <img
          src="https://images.unsplash.com/photo-1579684453294-bea84c68349d?w=1600&h=400&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-primary-900/80 mix-blend-multiply" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white">
          <h2 className="gsap-reveal text-3xl font-bold tracking-tight md:text-5xl">Ready to prioritize your health?</h2>
          <p className="gsap-reveal mt-6 text-lg text-primary-100">
            Book an appointment online in minutes. Our team will confirm your visit shortly.
          </p>
          <Link to="/appointments" className="gsap-reveal btn-primary mt-10 px-8 py-4 text-base !bg-white !text-primary-800 hover:!bg-primary-50">
            Schedule Your Visit
          </Link>
        </div>
      </section>

      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <SectionHeading center eyebrow="Patient Stories" title="What Our Patients Say" />
        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="gsap-reveal glass-card relative p-8">
              <Quote className="absolute right-6 top-6 h-10 w-10 text-primary-500/10 dark:text-primary-400/10" />
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="relative z-10 text-slate-700 dark:text-slate-300 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold dark:bg-primary-900 dark:text-primary-300">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
