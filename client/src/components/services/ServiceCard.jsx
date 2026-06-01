import * as Icons from 'lucide-react';

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.HeartPulse;

  return (
    <article className="gsap-reveal group glass-card flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 transition group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-900/50 dark:text-primary-400 dark:group-hover:bg-primary-600 dark:group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {service.description}
      </p>
      {service.features && (
        <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 dark:border-slate-700">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              {f}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
