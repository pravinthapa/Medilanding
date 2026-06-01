import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Edit, Trash2 } from 'lucide-react';
import { deleteDoctor } from '../../api/doctors';
import { getImageUrl } from '../../utils/formatDate';

export default function DoctorsTable({ doctors, onEdit }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteDoctor,
    onSuccess: () => {
      toast.success('Doctor deleted');
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed'),
  });

  if (!doctors?.length) {
    return <p className="py-8 text-center text-slate-500">No doctors found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-4 py-3 font-medium text-slate-600">Doctor</th>
            <th className="px-4 py-3 font-medium text-slate-600">Specialization</th>
            <th className="px-4 py-3 font-medium text-slate-600">Experience</th>
            <th className="px-4 py-3 font-medium text-slate-600">Status</th>
            <th className="px-4 py-3 font-medium text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {doctors.map((d) => (
            <tr key={d._id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={getImageUrl(d.image)} alt={d.name} className="h-10 w-10 rounded-full object-cover" />
                  <span className="font-medium">{d.name}</span>
                </div>
              </td>
              <td className="px-4 py-3">{d.specialization}</td>
              <td className="px-4 py-3">{d.experience}+ yrs</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${d.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                  {d.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button onClick={() => onEdit(d)} className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-primary-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this doctor?')) deleteMutation.mutate(d._id);
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
  );
}
