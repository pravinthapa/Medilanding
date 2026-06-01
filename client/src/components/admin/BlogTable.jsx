import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Edit, Trash2, Plus } from 'lucide-react';
import Modal from '../ui/Modal';
import { createBlogPost, updateBlogPost, deleteBlogPost } from '../../api/blog';
import { formatDate } from '../../utils/formatDate';

export default function BlogTable({ posts }) {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', author: 'MediCare Team', isPublished: true });

  const saveMutation = useMutation({
    mutationFn: (data) => (editPost ? updateBlogPost(editPost._id, data) : createBlogPost(data)),
    onSuccess: () => {
      toast.success(editPost ? 'Post updated' : 'Post created');
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      setModalOpen(false);
      setEditPost(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Save failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      toast.success('Post deleted');
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed'),
  });

  const openCreate = () => {
    setEditPost(null);
    setForm({ title: '', excerpt: '', content: '', author: 'MediCare Team', isPublished: true });
    setModalOpen(true);
  };

  const openEdit = (post) => {
    setEditPost(post);
    setForm({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      author: post.author || 'MediCare Team',
      isPublished: post.isPublished,
    });
    setModalOpen(true);
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">Title</th>
              <th className="px-4 py-3 font-medium text-slate-600">Author</th>
              <th className="px-4 py-3 font-medium text-slate-600">Status</th>
              <th className="px-4 py-3 font-medium text-slate-600">Date</th>
              <th className="px-4 py-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts?.map((p) => (
              <tr key={p._id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3">{p.author}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                    {p.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{formatDate(p.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="rounded p-1.5 hover:bg-slate-100"><Edit className="h-4 w-4" /></button>
                    <button
                      onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(p._id); }}
                      className="rounded p-1.5 hover:bg-red-50 hover:text-red-600"
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editPost ? 'Edit Post' : 'New Post'} size="lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate(form);
          }}
          className="space-y-4"
        >
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Title" className="input-field" />
          <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Excerpt" className="input-field" />
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={6} placeholder="Content" className="input-field" />
          <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author" className="input-field" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
            Published
          </label>
          <button type="submit" disabled={saveMutation.isPending} className="rounded-lg bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700 disabled:opacity-60">
            {saveMutation.isPending ? 'Saving...' : 'Save'}
          </button>
        </form>
      </Modal>
    </>
  );
}
