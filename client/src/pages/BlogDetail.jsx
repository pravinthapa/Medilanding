import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, User, CalendarDays, Share2 } from 'lucide-react';
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
      <div className="flex min-h-[50vh] flex-col items-center justify-center dark:text-slate-300">
        <h2 className="text-2xl font-bold">Post not found.</h2>
        <p className="mt-2 text-slate-500">The article you're looking for doesn't exist.</p>
        <Link to="/blog" className="btn-primary mt-6">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white pb-24 dark:bg-slate-950">
      {/* Back Navigation */}
      <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 dark:bg-slate-950/80 dark:border-slate-800">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <header className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-primary-500" />
            {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-primary-500" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary-500" />
            5 min read
          </span>
        </div>
        
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-[1.1]">
          {post.title}
        </h1>
      </header>

      {/* Featured Image */}
      <div className="mx-auto mt-12 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="aspect-video w-full overflow-hidden rounded-3xl bg-slate-100 shadow-2xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10">
          <img
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1600&h=900&fit=crop"
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-slate mx-auto dark:prose-invert prose-headings:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-img:rounded-xl">
          <p className="whitespace-pre-wrap leading-loose text-slate-700 dark:text-slate-300">
            {post.content}
          </p>
        </div>
        
        {/* Share Section */}
        <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-8 dark:border-slate-800">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Share this article</p>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
      </div>
    </article>
  );
}
