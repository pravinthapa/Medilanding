import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, HeartPulse, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import { CONTACT_INFO } from '../../utils/constants';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/services', label: 'Services' },
  { to: '/appointments', label: 'Appointments' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="bg-primary-600 px-4 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-sm dark:bg-primary-700">
        <span className="inline-flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Emergency: <strong>{CONTACT_INFO.emergency}</strong> — 24/7
        </span>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-600/30 transition-transform hover:scale-105">
            <HeartPulse className="h-6 w-6" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white lg:text-2xl">MediCare</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600 dark:text-slate-300 dark:hover:bg-slate-900/50 dark:hover:text-primary-400'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/appointments" className="btn-primary hidden !py-2.5 sm:inline-flex">
            Book Now
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/appointments" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full text-center">
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
