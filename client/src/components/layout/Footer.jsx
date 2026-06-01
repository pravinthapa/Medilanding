import { Link } from 'react-router-dom';
import { HeartPulse, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800 dark:bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-white">MediCare Clinic</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{CONTACT_INFO.address}</p>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            {['/', '/about', '/doctors', '/services', '/appointments', '/blog', '/contact'].map((path) => (
              <li key={path}>
                <Link to={path} className="hover:text-primary-400">
                  {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>General Consultation</li>
            <li>Diagnostics</li>
            <li>Vaccinations</li>
            <li>Specialized Treatments</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary-400" />
              {CONTACT_INFO.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary-400" />
              {CONTACT_INFO.email}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
              {CONTACT_INFO.hours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} MediCare Clinic. All rights reserved.
      </div>
    </footer>
  );
}
