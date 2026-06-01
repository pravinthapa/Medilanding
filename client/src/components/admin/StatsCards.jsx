import { Calendar, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const cards = [
  { key: 'total', label: 'Total Appointments', icon: Calendar, color: 'bg-blue-500' },
  { key: 'pending', label: 'Pending', icon: Clock, color: 'bg-amber-500' },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle, color: 'bg-emerald-500' },
  { key: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'bg-red-500' },
  { key: 'rescheduled', label: 'Rescheduled', icon: RefreshCw, color: 'bg-indigo-500' },
];

export default function StatsCards({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map(({ key, label, icon: Icon, color }) => (
        <div key={key} className="rounded-xl bg-white p-5 shadow-sm dark:border dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{stats?.[key] ?? 0}</p>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color} text-white`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
