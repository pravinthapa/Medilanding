import { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import AdminAuthCard, { AuthDivider } from '../../components/auth/AdminAuthCard';
import GoogleSignInButton from '../../components/auth/GoogleSignInButton';

export default function AdminLogin() {
  const { login, googleLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: location.state?.email || '', password: '' });

  useEffect(() => {
    if (location.state?.email) {
      setForm((f) => ({ ...f, email: location.state.email }));
    }
  }, [location.state?.email]);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleDirectLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credential) => {
    setGoogleLoading(true);
    try {
      await googleLogin(credential);
      toast.success('Signed in with Google!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Google sign-in failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  const busy = loading || googleLoading;

  return (
    <AdminAuthCard
      title="Admin Login"
      subtitle="MediCare Clinic Management"
      footer={
        <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?
          </p>
          <Link
            to="/admin/register"
            className="flex w-full items-center justify-center rounded-lg border-2 border-primary-600 bg-primary-50 py-3 text-sm font-semibold text-primary-700 transition hover:bg-primary-100"
          >
            Create account
          </Link>
          <p className="text-center text-xs text-slate-400">
            Already registered? Use Google or email sign-in above.
          </p>
        </div>
      }
    >
      <GoogleSignInButton
        onSuccess={handleGoogleSuccess}
        disabled={busy}
        label="Continue with Google"
      />

      <AuthDivider label="or sign in with email" />

      <form onSubmit={handleDirectLogin} className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Direct login</p>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="input-field pl-10"
              placeholder="admin@clinic.com"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="input-field pl-10"
              placeholder="••••••••"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary-700 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign in with email'}
        </button>
      </form>
    </AdminAuthCard>
  );
}
