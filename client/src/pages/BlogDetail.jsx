import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { getBlogPost } from '../api/blog';
import PageLoader from '../components/ui/PageLoader';
import { formatDate } from '../utils/formatDate';

export default function BlogDetail() {
  const { slug } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => getBlogPost(slug),
  });

  const post = data?.data;

  if (isLoading) return <PageLoader />;
  if (error || !post) {
    return (
      <div className="py-24 text-center dark:text-slate-300">
        <p>Post not found.</p>
        <Link to="/blog" className="mt-4 inline-block text-primary-600">← Back to blog</Link>
      </div>
    );
  }

  return (
    <article>
      <div className="relative h-72 overflow-hidden md:h-96">
        <img
          src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1600&h=600&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
        <p className="mt-4 text-sm text-slate-500">{formatDate(post.createdAt)} · {post.author}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">{post.title}</h1>
        <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
          <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>
        </div>
      </div>
    </article>
  );
}
