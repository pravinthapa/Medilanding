import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Trash2, Edit } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import Modal from '../ui/Modal';
import { updateAppointment, deleteAppointment } from '../../api/appointments';
import { formatDateTime } from '../../utils/formatDate';

export default function AppointmentsTable({ appointments }) {
  const queryClient = useQueryClient();
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({});

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAppointment(id, data),
    onSuccess: () => {
      toast.success('Appointment updated');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['appointmentStats'] });
      setEditItem(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      toast.success('Appointment deleted');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['appointmentStats'] });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed'),
  });

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      status: item.status,
      rescheduledDate: item.rescheduledDate || '',
      rescheduledTime: item.rescheduledTime || '',
      adminNotes: item.adminNotes || '',
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate({ id: editItem._id, data: form });
  };

  if (!appointments?.length) {
    return <p className="py-8 text-center text-slate-500">No appointments found.</p>;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">Patient</th>
              <th className="px-4 py-3 font-medium text-slate-600">Doctor</th>
              <th className="px-4 py-3 font-medium text-slate-600">Date / Time</th>
              <th className="px-4 py-3 font-medium text-slate-600">Status</th>
              <th className="px-4 py-3 font-medium text-slate-600">Created</th>
              <th className="px-4 py-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appointments.map((a) => (
              <tr key={a._id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium">{a.name}</p>
                  <p className="text-xs text-slate-500">{a.email}</p>
                </td>
                <td className="px-4 py-3">{a.doctorId?.name || '—'}</td>
                <td className="px-4 py-3">
                  {a.date} at {a.time}
                  {a.status === 'rescheduled' && a.rescheduledDate && (
                    <p className="text-xs text-blue-600">
                      → {a.rescheduledDate} {a.rescheduledTime}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-4 py-3 text-slate-500">{formatDateTime(a.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(a)}
                      className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-primary-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this appointment?')) deleteMutation.mutate(a._id);
                      }}
                      className="rounded p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Update Appointment" size="lg">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rescheduled">Rescheduled</option>
            </select>
          </div>
          {form.status === 'rescheduled' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">New Date</label>
                <input
                  type="date"
                  value={form.rescheduledDate}
                  onChange={(e) => setForm({ ...form, rescheduledDate: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">New Time</label>
                <input
                  type="time"
                  value={form.rescheduledTime}
                  onChange={(e) => setForm({ ...form, rescheduledTime: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium">Admin Notes</label>
            <textarea
              value={form.adminNotes}
              onChange={(e) => setForm({ ...form, adminNotes: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </Modal>
    </>
  );
}
