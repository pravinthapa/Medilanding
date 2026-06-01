import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register as registerApi } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import AdminAuthCard, { AuthDivider } from '../../components/auth/AdminAuthCard';
import GoogleSignInButton from '../../components/auth/GoogleSignInButton';

export default function AdminRegister() {
  const { googleLogin, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await registerApi({ name: form.name, email: form.email, password: form.password });
      toast.success('Account created! Please sign in.');
      navigate('/admin/login', { state: { email: form.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credential) => {
    setGoogleLoading(true);
    try {
      await googleLogin(credential);
      logout();
      toast.success('Account created with Google! Please sign in.');
      navigate('/admin/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Google sign-up failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  const busy = loading || googleLoading;

  return (
    <AdminAuthCard
      title="Create Admin Account"
      subtitle="Register to manage the clinic dashboard"
      footer={
        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/admin/login" className="font-semibold text-primary-600 hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <GoogleSignInButton
        onSuccess={handleGoogleSuccess}
        disabled={busy}
        label="Sign up with Google"
      />

      <AuthDivider label="or create with email" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Full Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="input-field"
            placeholder="Clinic Admin"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="input-field"
            placeholder="admin@clinic.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
            className="input-field"
            placeholder="Min. 6 characters"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
            className="input-field"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AdminAuthCard>
  );
}
