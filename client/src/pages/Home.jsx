import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Star } from 'lucide-react';
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
    <div ref={pageRef}>
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
            Book Appointment <ArrowRight className="h-5 w-5" />
          </Link>
          <Link to="/about" className="btn-outline">
            About Our Clinic
          </Link>
        </div>
      </PageHero>

      <Section className="bg-white dark:bg-slate-950">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="gsap-reveal">
            <SectionHeading
              eyebrow="Clinic Introduction"
              title={CLINIC_INTRO.title}
              description={CLINIC_INTRO.tagline}
            />
            <p className="text-slate-600 dark:text-slate-400">{CLINIC_INTRO.description}</p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 font-medium text-primary-600 dark:text-primary-400">
              Learn our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="gsap-reveal grid grid-cols-2 gap-4">
            {CLINIC_INTRO.stats.map((s) => (
              <div key={s.label} className="glass-card p-6 text-center">
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{s.value}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.label}</p>
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services" className="btn-outline-dark">
            View all services
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d) => (
              <DoctorCard key={d._id} doctor={d} />
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link to="/doctors" className="font-medium text-primary-600 hover:underline dark:text-primary-400">
            Meet the full team →
          </Link>
        </div>
      </Section>

      <section className="relative overflow-hidden bg-primary-600 py-20 dark:bg-primary-800">
        <img
          src="https://images.unsplash.com/photo-1579684453294-bea84c68349d?w=1600&h=400&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white">
          <h2 className="gsap-reveal text-3xl font-bold md:text-4xl">Ready to prioritize your health?</h2>
          <p className="gsap-reveal mt-4 text-primary-100">
            Book an appointment online in minutes. Our team will confirm your visit shortly.
          </p>
          <Link to="/appointments" className="gsap-reveal btn-primary mt-8 !bg-white !text-primary-700 hover:!bg-primary-50">
            Schedule Your Visit
          </Link>
        </div>
      </section>

      <Section>
        <SectionHeading center eyebrow="Patient Stories" title="What Our Patients Say" />
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="gsap-reveal glass-card p-6">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 font-semibold text-slate-900 dark:text-white">{t.name}</p>
              <p className="text-xs text-slate-500">{t.role}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
