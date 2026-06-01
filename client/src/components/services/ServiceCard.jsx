import * as Icons from 'lucide-react';

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.HeartPulse;

  return (
    <article className="gsap-reveal group relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:bg-slate-900/80 dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-primary-500/10" />
      
      <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-600/30 dark:bg-slate-800 dark:text-primary-400 dark:group-hover:bg-primary-600 dark:group-hover:text-white">
        <Icon className="h-8 w-8" />
      </div>
      
      <h3 className="relative z-10 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
        {service.title}
      </h3>
      
      <p className="relative z-10 mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {service.description}
      </p>
      
      {service.features && (
        <ul className="relative z-10 mt-6 space-y-2.5 border-t border-slate-100 pt-6 dark:border-slate-800">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500 transition-transform group-hover:scale-125" />
              <span className="leading-snug">{f}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
