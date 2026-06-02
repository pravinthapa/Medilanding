import { Link } from 'react-router-dom';
import { HeartPulse, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600" />
      
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 xl:grid-cols-4 lg:grid-cols-2">
          {/* Brand & Newsletter */}
          <div className="xl:col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-md shadow-primary-600/20">
                <HeartPulse className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">MediCare</span>
            </div>
            <p className="mb-8 text-sm leading-relaxed">
              Committed to providing compassionate, evidence-based healthcare for our community. Your health is our priority.
            </p>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Subscribe to health tips</p>
              <div className="flex rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden focus-within:ring-2 focus-within:ring-primary-500">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none"
                />
                <button className="bg-primary-600 px-4 py-2.5 text-white transition hover:bg-primary-700">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-bold text-slate-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Our Doctors', path: '/doctors' },
                { label: 'Services', path: '/services' },
                { label: 'Health Blog', path: '/blog' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="transition hover:text-primary-600 dark:hover:text-primary-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="mb-6 font-bold text-slate-900 dark:text-white">Our Services</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/services" className="transition hover:text-primary-600 dark:hover:text-primary-400">General Consultation</Link></li>
              <li><Link to="/services" className="transition hover:text-primary-600 dark:hover:text-primary-400">Diagnostics & Labs</Link></li>
              <li><Link to="/services" className="transition hover:text-primary-600 dark:hover:text-primary-400">Pediatric Care</Link></li>
              <li><Link to="/services" className="transition hover:text-primary-600 dark:hover:text-primary-400">Vaccinations</Link></li>
              <li><Link to="/services" className="transition hover:text-primary-600 dark:hover:text-primary-400">Specialized Treatments</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 font-bold text-slate-900 dark:text-white">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-slate-800 dark:text-primary-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="leading-relaxed">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-slate-800 dark:text-primary-400">
                  <Phone className="h-4 w-4" />
                </div>
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-slate-800 dark:text-primary-400">
                  <Mail className="h-4 w-4" />
                </div>
                <span>{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-slate-100 bg-slate-50 py-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row lg:px-8">
          <p className="text-sm font-medium text-slate-500">
            &copy; {new Date().getFullYear()} MediCare Clinic. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm font-medium">
            <Link to="#" className="hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary-600 dark:hover:text-primary-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
