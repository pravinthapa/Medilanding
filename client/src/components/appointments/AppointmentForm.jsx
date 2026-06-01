import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createAppointment } from '../../api/appointments';
import { getDoctors } from '../../api/doctors';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function AppointmentForm() {
  const [searchParams] = useSearchParams();
  const preselectedDoctor = searchParams.get('doctor') || '';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    doctorId: preselectedDoctor,
    date: '',
    time: '',
    symptoms: '',
  });

  const { data: doctorsData, isLoading: doctorsLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  });

  const doctors = doctorsData?.data || [];

  const mutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success('Appointment request submitted! We will contact you shortly.');
      setForm({
        name: '',
        email: '',
        phone: '',
        doctorId: '',
        date: '',
        time: '',
        symptoms: '',
      });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to submit appointment');
    },
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.doctorId) {
      toast.error('Please select a doctor');
      return;
    }
    mutation.mutate(form);
  };

  if (doctorsLoading) return <LoadingSpinner className="py-12" />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Full Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="john@email.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Phone *</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="+1 555 000 0000"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Doctor *</label>
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          >
            <option value="">Select a doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name} — {d.specialization}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Preferred Date *</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Preferred Time *</label>
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Symptoms / Reason for Visit</label>
        <textarea
          name="symptoms"
          value={form.symptoms}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          placeholder="Describe your symptoms or reason for the visit..."
        />
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {mutation.isPending ? 'Submitting...' : 'Request Appointment'}
      </button>
    </form>
  );
}
