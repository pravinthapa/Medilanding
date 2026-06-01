import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../../api/contact';
import ContactTable from '../../components/admin/ContactTable';
import PageLoader from '../../components/ui/PageLoader';

export default function AdminContacts() {
  const { data, isLoading } = useQuery({ queryKey: ['contacts'], queryFn: getContacts });

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-slate-900">Contact Messages</h2>
      {isLoading ? <PageLoader /> : <ContactTable messages={data?.data || []} />}
    </div>
  );
}
