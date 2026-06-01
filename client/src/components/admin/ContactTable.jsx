import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Mail, Trash2 } from 'lucide-react';
import { updateContact, deleteContact } from '../../api/contact';
import { formatDateTime } from '../../utils/formatDate';

export default function ContactTable({ messages }) {
  const queryClient = useQueryClient();

  const toggleRead = useMutation({
    mutationFn: ({ id, isRead }) => updateContact(id, { isRead }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      toast.success('Message deleted');
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed'),
  });

  if (!messages?.length) {
    return <p className="py-8 text-center text-slate-500">No messages found.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div
          key={m._id}
          className={`rounded-xl border bg-white p-5 shadow-sm ${!m.isRead ? 'border-primary-200 bg-primary-50/30' : 'border-slate-100'}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-slate-900">{m.name}</h4>
                {!m.isRead && (
                  <span className="rounded-full bg-primary-600 px-2 py-0.5 text-xs text-white">New</span>
                )}
              </div>
              <p className="text-sm text-slate-500">{m.email} {m.phone && `• ${m.phone}`}</p>
              <p className="mt-1 font-medium text-slate-800">{m.subject}</p>
              <p className="mt-2 text-sm text-slate-600">{m.message}</p>
              <p className="mt-2 text-xs text-slate-400">{formatDateTime(m.createdAt)}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => toggleRead.mutate({ id: m._id, isRead: !m.isRead })}
                className="rounded p-2 text-slate-500 hover:bg-slate-100 hover:text-primary-600"
                title={m.isRead ? 'Mark unread' : 'Mark read'}
              >
                <Mail className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm('Delete this message?')) deleteMutation.mutate(m._id);
                }}
                className="rounded p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
