import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ServiceCard from '../components/services/ServiceCard';
import PageHero from '../components/layout/PageHero';
import { Section, SectionHeading } from '../components/layout/Section';
import { useGsapReveal } from '../hooks/useGsapAnimations';
import { HERO_IMAGES, SERVICES } from '../utils/constants';

export default function Services() {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);

  return (
    <div ref={pageRef} className="overflow-hidden">
      <PageHero
        image={HERO_IMAGES.services}
        title="Medical Services"
        subtitle="From general consultation and diagnostics to vaccinations and specialized treatments."
      >
        <Link to="/appointments" className="btn-primary">
          Book a Service <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </PageHero>

      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <SectionHeading
          center
          eyebrow="Comprehensive Care"
          title="What We Provide"
          description="General consultation, diagnostics, vaccinations, and specialized treatments tailored to your needs."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden bg-primary-900 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 opacity-90" />
        <div className="relative mx-auto max-w-2xl text-center text-white px-4">
          <h2 className="gsap-reveal text-3xl font-bold tracking-tight md:text-4xl">Not sure which service you need?</h2>
          <p className="gsap-reveal mt-4 text-lg text-primary-100">Our front desk will match you with the right specialist.</p>
          <Link to="/contact" className="gsap-reveal btn-primary mt-8 !bg-white !text-primary-800 px-8 hover:!bg-primary-50 hover:shadow-xl hover:shadow-white/10">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
