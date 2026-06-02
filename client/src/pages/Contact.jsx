import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
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
    <div ref={pageRef} className="overflow-hidden bg-slate-50 dark:bg-slate-950">
      <PageHero
        image={HERO_IMAGES.contact}
        title="Contact Us"
        subtitle="Reach our care team by phone, email, or visit us — we're here to help."
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          
          {/* Contact Information (Left Column) */}
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Get in touch" title="We'd love to hear from you" />
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you have a question about services, pricing, need to book an appointment, or anything else, our team is ready to answer all your questions.
            </p>
            <div className="mt-10 space-y-8">
              {[
                { icon: Phone, label: 'Phone', value: CONTACT_INFO.phone },
                { icon: Phone, label: 'Emergency', value: CONTACT_INFO.emergency },
                { icon: Mail, label: 'Email', value: CONTACT_INFO.email },
                { icon: Mail, label: 'Appointments', value: CONTACT_INFO.appointments },
                { icon: MapPin, label: 'Address', value: CONTACT_INFO.address },
                { icon: Clock, label: 'Hours', value: CONTACT_INFO.hours },
              ].map((item) => (
                <div key={item.label} className="gsap-reveal flex gap-5 group">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 text-primary-600 transition-all group-hover:bg-primary-600 group-hover:text-white dark:bg-slate-900 dark:ring-white/10 dark:text-primary-400 dark:group-hover:bg-primary-500 dark:group-hover:text-white group-hover:-translate-y-1">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-500">{item.label}</p>
                    <p className="mt-1.5 text-base font-semibold text-slate-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-3">
            <div className="gsap-reveal rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-900/5 sm:p-12 dark:bg-slate-900 dark:shadow-none dark:ring-white/10">
              <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">Send us a message</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  mutation.mutate(form);
                }}
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Full Name *</label>
                    <input name="name" value={form.name} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} required placeholder="John Doe" className="input-field !py-3.5" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} required placeholder="john@example.com" className="input-field !py-3.5" />
                  </div>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} placeholder="(123) 456-7890" className="input-field !py-3.5" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Subject *</label>
                    <input name="subject" value={form.subject} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} required placeholder="How can we help?" className="input-field !py-3.5" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">Message *</label>
                  <textarea name="message" value={form.message} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} required rows={6} placeholder="Please provide detailed information..." className="input-field resize-none !py-3.5" />
                </div>
                
                <button type="submit" disabled={mutation.isPending} className="btn-primary flex w-full items-center justify-center gap-2 !py-4 text-lg">
                  {mutation.isPending ? 'Sending...' : (
                    <>
                      Send Message <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edge-to-Edge Map */}
      <div className="gsap-reveal mt-12 w-full h-[500px] border-t border-slate-200 dark:border-slate-800">
        <iframe
          title="Clinic map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959222350!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="grayscale filter dark:invert dark:hue-rotate-180 dark:contrast-75"
        />
      </div>
    </div>
  );
}
