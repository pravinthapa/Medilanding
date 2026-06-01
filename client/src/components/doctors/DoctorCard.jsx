import { Link } from 'react-router-dom';
import { Award, Calendar, GraduationCap } from 'lucide-react';
import { getImageUrl } from '../../utils/formatDate';

export default function DoctorCard({ doctor }) {
  return (
    <article className="gsap-reveal group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:border-slate-800 dark:bg-slate-900/80 dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={getImageUrl(doctor.image, doctor.name)}
          alt={doctor.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-xl font-bold tracking-tight text-white">{doctor.name}</h3>
          <p className="mt-1 inline-block rounded-full bg-primary-500/20 px-2.5 py-1 text-xs font-medium text-primary-300 backdrop-blur-md border border-primary-400/20">
            {doctor.specialization}
          </p>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-2.5">
          {doctor.qualification && (
            <p className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
              <span className="leading-snug">{doctor.qualification}</span>
            </p>
          )}
          {doctor.experience > 0 && (
            <p className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              <Award className="h-4 w-4 shrink-0 text-primary-500" />
              <span>{doctor.experience}+ years experience</span>
            </p>
          )}
        </div>
        
        {doctor.bio && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {doctor.bio}
          </p>
        )}
        
        <div className="mt-auto pt-5">
          <Link
            to={`/appointments?doctor=${doctor._id}`}
            className="btn-primary w-full !rounded-lg !py-2.5 shadow-none group-hover:shadow-primary-600/25"
          >
            <Calendar className="h-4 w-4" />
            Book Appointment
          </Link>
        </div>
      </div>
    </article>
  );
}
