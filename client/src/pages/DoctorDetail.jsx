import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Award, GraduationCap, Clock } from 'lucide-react';
import { getDoctor } from '../api/doctors';
import PageLoader from '../components/ui/PageLoader';
import { getImageUrl } from '../utils/formatDate';

export default function DoctorDetail() {
  const { id } = useParams();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['doctor', id],
    queryFn: () => getDoctor(id),
  });

  const doctor = data?.data;

  if (isLoading) return <PageLoader />;
  if (error || !doctor) {
    return (
      <div className="py-24 text-center dark:text-slate-300">
        <p>Doctor not found.</p>
        <Link to="/doctors" className="mt-4 inline-block text-primary-600 hover:underline">← Back to our team</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Top Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/doctors" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
            <ArrowLeft className="h-4 w-4" /> Back to Team
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Image Section (Left on Desktop, Top on Mobile) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10">
              <img
                src={getImageUrl(doctor.image, doctor.name)}
                alt={doctor.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-flex rounded-full bg-primary-500/90 px-3 py-1 text-sm font-semibold text-white backdrop-blur-md">
                  {doctor.specialization}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section (Right on Desktop) */}
          <div className="lg:col-span-7">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                {doctor.name}
              </h1>
              <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {doctor.bio || "Dedicated to providing comprehensive and compassionate care to all patients. Specializes in modern medical treatments and personalized health plans."}
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Qualifications</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{doctor.qualification || "Board Certified"}</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Experience</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{doctor.experience ? `${doctor.experience}+ Years` : "Extensive Experience"}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Book an Appointment</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Select {doctor.name} on the appointment form to schedule your consultation.
              </p>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/appointments?doctor=${doctor._id}`}
                  className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-lg"
                >
                  <Calendar className="h-5 w-5" />
                  Schedule Visit
                </Link>
                <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-slate-100 dark:bg-slate-800/50">
                  <Clock className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Accepting new patients</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </article>
  );
}
