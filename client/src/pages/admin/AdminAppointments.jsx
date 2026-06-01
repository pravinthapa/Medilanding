import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '../../api/appointments';
import AppointmentsTable from '../../components/admin/AppointmentsTable';
import PageLoader from '../../components/ui/PageLoader';

const filters = ['', 'pending', 'confirmed', 'cancelled', 'rescheduled'];

export default function AdminAppointments() {
  const [status, setStatus] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['appointments', status],
    queryFn: () => getAppointments(status || undefined),
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">Appointments</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f || 'all'}
              onClick={() => setStatus(f)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize ${
                status === f ? 'bg-primary-600 text-white' : 'bg-white text-slate-600 shadow-sm hover:bg-slate-50'
              }`}
            >
              {f || 'All'}
            </button>
          ))}
        </div>
      </div>
      {isLoading ? <PageLoader /> : <AppointmentsTable appointments={data?.data || []} />}
    </div>
  );
}
