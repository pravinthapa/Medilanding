import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Stethoscope, Mail, Plus } from 'lucide-react';
import { getAppointmentStats } from '../../api/appointments';
import StatsCards from '../../components/admin/StatsCards';
import AppointmentsTable from '../../components/admin/AppointmentsTable';
import PageLoader from '../../components/ui/PageLoader';

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['appointmentStats'],
    queryFn: getAppointmentStats,
  });

  const stats = data?.data;

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-8">
      <StatsCards stats={stats} />

      <div className="flex flex-wrap gap-3">
        {[
          { to: '/admin/appointments', icon: Calendar, label: 'Manage Appointments' },
          { to: '/admin/doctors', icon: Stethoscope, label: 'Manage Doctors' },
          { to: '/admin/contacts', icon: Mail, label: 'View Messages' },
        ].map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-primary-300 hover:text-primary-600"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
        <Link
          to="/admin/doctors"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Add Doctor
        </Link>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Appointments</h2>
        <AppointmentsTable appointments={stats?.recent || []} />
      </div>
    </div>
  );
}
