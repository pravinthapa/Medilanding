export function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div className={`mb-12 max-w-2xl gsap-reveal ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{description}</p>
      )}
    </div>
  );
}
