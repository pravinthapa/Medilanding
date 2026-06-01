import { STATUS_COLORS } from '../../utils/constants';

export default function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || 'bg-slate-100 text-slate-800';
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${color}`}>
      {status}
    </span>
  );
}
