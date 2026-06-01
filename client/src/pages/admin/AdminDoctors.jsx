import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { getDoctors, createDoctor, updateDoctor } from '../../api/doctors';
import DoctorsTable from '../../components/admin/DoctorsTable';
import DoctorForm from '../../components/admin/DoctorForm';
import Modal from '../../components/ui/Modal';
import PageLoader from '../../components/ui/PageLoader';

export default function AdminDoctors() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);

  const { data, isLoading } = useQuery({ queryKey: ['doctors'], queryFn: getDoctors });

  const saveMutation = useMutation({
    mutationFn: (fd) => (editDoctor ? updateDoctor(editDoctor._id, fd) : createDoctor(fd)),
    onSuccess: () => {
      toast.success(editDoctor ? 'Doctor updated' : 'Doctor added');
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      setModalOpen(false);
      setEditDoctor(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Save failed'),
  });

  const openCreate = () => {
    setEditDoctor(null);
    setModalOpen(true);
  };

  const openEdit = (doctor) => {
    setEditDoctor(doctor);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Doctors</h2>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" /> Add Doctor
        </button>
      </div>

      {isLoading ? <PageLoader /> : <DoctorsTable doctors={data?.data || []} onEdit={openEdit} />}

      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditDoctor(null); }}
        title={editDoctor ? 'Edit Doctor' : 'Add Doctor'}
        size="lg"
      >
        <DoctorForm
          doctor={editDoctor}
          loading={saveMutation.isPending}
          onSubmit={(fd) => saveMutation.mutate(fd)}
        />
      </Modal>
    </div>
  );
}
