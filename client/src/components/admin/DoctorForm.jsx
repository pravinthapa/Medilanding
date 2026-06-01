import { useState, useEffect } from 'react';
import { DAYS } from '../../utils/constants';

const emptyAvailability = { day: 'Monday', startTime: '09:00', endTime: '17:00' };

export default function DoctorForm({ doctor, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: '',
    specialization: '',
    qualification: '',
    experience: 0,
    bio: '',
    email: '',
    phone: '',
    isActive: true,
    availability: [{ ...emptyAvailability }],
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (doctor) {
      setForm({
        name: doctor.name || '',
        specialization: doctor.specialization || '',
        qualification: doctor.qualification || '',
        experience: doctor.experience || 0,
        bio: doctor.bio || '',
        email: doctor.email || '',
        phone: doctor.phone || '',
        isActive: doctor.isActive ?? true,
        availability: doctor.availability?.length ? doctor.availability : [{ ...emptyAvailability }],
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const updateAvailability = (index, field, value) => {
    setForm((prev) => {
      const availability = [...prev.availability];
      availability[index] = { ...availability[index], [field]: value };
      return { ...prev, availability };
    });
  };

  const addAvailability = () => {
    setForm((prev) => ({
      ...prev,
      availability: [...prev.availability, { ...emptyAvailability }],
    }));
  };

  const removeAvailability = (index) => {
    setForm((prev) => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'availability') fd.append(key, JSON.stringify(val));
      else fd.append(key, val);
    });
    if (imageFile) fd.append('image', imageFile);
    onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Specialization *</label>
          <input name="specialization" value={form.specialization} onChange={handleChange} required className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Qualification</label>
          <input name="qualification" value={form.qualification} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Experience (years)</label>
          <input name="experience" type="number" min="0" value={form.experience} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="input-field" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Bio</label>
        <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="input-field" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Profile Image</label>
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="text-sm" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} />
        Active
      </label>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium">Availability Schedule</label>
          <button type="button" onClick={addAvailability} className="text-sm text-primary-600 hover:underline">
            + Add slot
          </button>
        </div>
        {form.availability.map((slot, i) => (
          <div key={i} className="mb-2 flex flex-wrap items-center gap-2">
            <select
              value={slot.day}
              onChange={(e) => updateAvailability(i, 'day', e.target.value)}
              className="input-field w-auto"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <input type="time" value={slot.startTime} onChange={(e) => updateAvailability(i, 'startTime', e.target.value)} className="input-field w-auto" />
            <span className="text-slate-400">to</span>
            <input type="time" value={slot.endTime} onChange={(e) => updateAvailability(i, 'endTime', e.target.value)} className="input-field w-auto" />
            {form.availability.length > 1 && (
              <button type="button" onClick={() => removeAvailability(i)} className="text-sm text-red-500 hover:underline">
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <button type="submit" disabled={loading} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-60">
        {loading ? 'Saving...' : doctor ? 'Update Doctor' : 'Add Doctor'}
      </button>
    </form>
  );
}
