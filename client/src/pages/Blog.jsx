import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { getBlogPosts } from '../api/blog';
import PageHero from '../components/layout/PageHero';
import { Section, SectionHeading } from '../components/layout/Section';
import PageLoader from '../components/ui/PageLoader';
import { useGsapReveal } from '../hooks/useGsapAnimations';
import { formatDate } from '../utils/formatDate';
import { HERO_IMAGES } from '../utils/constants';

export default function Blog() {
  const pageRef = useRef(null);
  useGsapReveal(pageRef);

  const { data, isLoading } = useQuery({ queryKey: ['blog'], queryFn: getBlogPosts });
  const posts = data?.data || [];

  return (
    <div ref={pageRef}>
      <PageHero
        image={HERO_IMAGES.blog}
        title="Health Blog & Tips"
        subtitle="Expert articles, wellness advice, and the latest updates from MediCare Clinic."
      />

      <Section className="bg-white dark:bg-slate-950">
        <SectionHeading
          center
          eyebrow="Stay informed"
          title="Health articles & clinic updates"
          description="Trusted guidance from our medical team on prevention, treatment, and healthy living."
        />
        {isLoading ? (
          <PageLoader />
        ) : posts.length === 0 ? (
          <p className="text-center text-slate-500">No articles yet. Check back soon.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post._id} className="gsap-reveal group glass-card overflow-hidden">
                <div className="h-48 overflow-hidden bg-primary-100 dark:bg-primary-900/30">
                  <img
                    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=300&fit=crop"
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-slate-500">
                    {formatDate(post.createdAt)} · {post.author}
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                    {post.excerpt || post.content}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400"
                  >
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
