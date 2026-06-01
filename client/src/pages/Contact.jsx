import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { createContact } from '../api/contact';
import PageHero from '../components/layout/PageHero';
import { Section, SectionHeading } from '../components/layout/Section';
import { useGsapReveal } from '../hooks/useGsapAnimations';
import { CONTACT_INFO, HERO_IMAGES } from '../utils/constants';

export default function Contact() {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const mutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to send message'),
  });

  return (
    <div ref={pageRef} className="overflow-hidden">
      <PageHero
        image={HERO_IMAGES.contact}
        title="Contact Us"
        subtitle="Reach our care team by phone, email, or visit us — we're here to help."
      />

      <Section className="bg-white dark:bg-slate-950">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Get in touch" title="Phone, email & directions" />
            <div className="mt-8 space-y-6">
              {[
                { icon: Phone, label: 'Phone', value: CONTACT_INFO.phone },
                { icon: Phone, label: 'Emergency', value: CONTACT_INFO.emergency },
                { icon: Mail, label: 'Email', value: CONTACT_INFO.email },
                { icon: Mail, label: 'Appointments', value: CONTACT_INFO.appointments },
                { icon: MapPin, label: 'Address', value: CONTACT_INFO.address },
                { icon: Clock, label: 'Hours', value: CONTACT_INFO.hours },
              ].map((item) => (
                <div key={item.label} className="gsap-reveal flex gap-5 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-slate-800 dark:text-primary-400 dark:group-hover:bg-primary-500 dark:group-hover:text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="mt-1 text-base font-medium text-slate-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="gsap-reveal glass-card p-8 sm:p-10 lg:translate-y-4">
            <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">Send a message</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(form);
              }}
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <input name="name" value={form.name} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} required placeholder="Name *" className="input-field" />
                <input name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} required placeholder="Email *" className="input-field" />
              </div>
              <input name="phone" value={form.phone} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} placeholder="Phone" className="input-field" />
              <input name="subject" value={form.subject} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} required placeholder="Subject *" className="input-field" />
              <textarea name="message" value={form.message} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} required rows={5} placeholder="Message *" className="input-field resize-none" />
              <button type="submit" disabled={mutation.isPending} className="btn-primary mt-2 w-full !py-3.5 text-base">
                {mutation.isPending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 p-0 dark:bg-slate-900/50">
        <div className="gsap-reveal overflow-hidden shadow-2xl">
          <iframe
            title="Clinic map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959222350!5m2!1sen!2sus"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="w-full grayscale filter dark:invert dark:hue-rotate-180 dark:contrast-75"
          />
        </div>
      </Section>
    </div>
  );
}
