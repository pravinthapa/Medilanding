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
    <div ref={pageRef}>
      <PageHero
        image={HERO_IMAGES.services}
        title="Medical Services"
        subtitle="From general consultation and diagnostics to vaccinations and specialized treatments."
      >
        <Link to="/appointments" className="btn-primary">
          Book a Service <ArrowRight className="h-5 w-5" />
        </Link>
      </PageHero>

      <Section className="bg-white dark:bg-slate-950">
        <SectionHeading
          center
          eyebrow="Comprehensive Care"
          title="What We Provide"
          description="General consultation, diagnostics, vaccinations, and specialized treatments tailored to your needs."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </Section>

      <Section className="bg-primary-600 dark:bg-primary-900">
        <div className="gsap-reveal mx-auto max-w-2xl text-center text-white">
          <h2 className="text-2xl font-bold md:text-3xl">Not sure which service you need?</h2>
          <p className="mt-3 text-primary-100">Our front desk will match you with the right specialist.</p>
          <Link to="/contact" className="btn-primary mt-6 !bg-white !text-primary-700">
            Contact Us
          </Link>
        </div>
      </Section>
    </div>
  );
}
