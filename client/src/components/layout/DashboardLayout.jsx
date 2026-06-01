import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import ThemeToggle from '../ui/ThemeToggle';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-lg font-semibold text-slate-800 dark:text-white">Clinic Management Dashboard</h1>
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto p-6 dark:text-slate-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
