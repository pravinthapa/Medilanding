import { Link } from 'react-router-dom';
import { Award, Calendar, GraduationCap } from 'lucide-react';
import { getImageUrl } from '../../utils/formatDate';

export default function DoctorCard({ doctor }) {
  return (
    <article className="gsap-reveal group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(doctor.image)}
          alt={doctor.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white">{doctor.name}</h3>
          <p className="text-sm font-medium text-primary-300">{doctor.specialization}</p>
        </div>
      </div>
      <div className="p-5">
        {doctor.qualification && (
          <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <GraduationCap className="h-3.5 w-3.5" />
            {doctor.qualification}
          </p>
        )}
        {doctor.experience > 0 && (
          <p className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Award className="h-3.5 w-3.5" />
            {doctor.experience}+ years experience
          </p>
        )}
        {doctor.bio && (
          <p className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{doctor.bio}</p>
        )}
        <Link
          to={`/appointments?doctor=${doctor._id}`}
          className="btn-primary mt-4 w-full !py-2.5 text-center text-sm"
        >
          <Calendar className="h-4 w-4" />
          Book Appointment
        </Link>
      </div>
    </article>
  );
}
