import { getAllPost, Post } from '../../lib/blog';
import Link from 'next/link';
import { BackButton } from './backButton';


export const metadata = {
  title: 'Blog | Vinayak',
  description: 'Blog posts about my experiences, insights, and thoughts on various topics.',
}

export default async function BlogPage() {
  const posts = getAllPost(); return (
    <section className="mx-auto py-8">
      <div className="mb-8 flex items-center justify-center">
        <BackButton />
        <h1 className="text-5xl font-bold mt-6 text-center text-accent">Blog</h1>
      </div>
      <p className="text-center text-text text-sm sm:text-lg mb-8">
        Here you might find some interesting experiences and insights.
        Expect one new post every 2 sunday, no promises though!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {posts.map((post: Post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="relative border-2 bg-surface pb-8 border-border flex flex-col gap-y-3                 transition-all 
  ease-in-out 
  duration-200 
  shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] 
  hover:-translate-y-2 
  hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] 
  active:translate-y-2
  active:translate-x-2
  active:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)]
"
          >
            {post.meta.image && (
              <img
                src={post.meta.image}
                alt={post.meta.title}
                className="w-full rounded-lg"
              />
            )}

            <h3 className="text-xl px-2 font-semibold text-accent hover:underline">
              {post.meta.title}
            </h3>

            <p className="text-white text-sm px-2">
              {post.meta.description}
            </p>

            <span className="absolute bottom-2 right-2 text-sm bg-accent/30 text-text px-2 py-0.5 rounded">
              {new Date(post.meta.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
