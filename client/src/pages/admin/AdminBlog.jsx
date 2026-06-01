import { useQuery } from '@tanstack/react-query';
import { getBlogPosts } from '../../api/blog';
import BlogTable from '../../components/admin/BlogTable';
import PageLoader from '../../components/ui/PageLoader';

export default function AdminBlog() {
  const { data, isLoading } = useQuery({ queryKey: ['blog'], queryFn: getBlogPosts });

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-slate-900">Blog Management</h2>
      {isLoading ? <PageLoader /> : <BlogTable posts={data?.data || []} />}
    </div>
  );
}
