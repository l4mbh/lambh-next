import { getBlogs } from "@/backend/actions/blog";
import { BlogItem } from "@/components/features/blog/blog-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@prisma/client";
import { ContactSection } from "@/components/features/home/contact-section";

export default async function Home() {
  const allBlogs = await getBlogs();
  const recentBlogs = allBlogs.filter((b: BlogPost) => b.published).slice(0, 3);

  return (
    <div
      id="home-scroll-container"
      className="flex flex-col w-full font-sans"
    >

      {/* Minimalist Hero */}
      <section className="w-full px-6 md:px-12 py-16 border-b border-border relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center snap-start">
        {/* Decorative background element for "phá cách" */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col">
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">
            [ Hello _ World ]
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.85] mb-12">
            I build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground/30">
              interfaces.
            </span>
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-foreground to-transparent" />
            <p className="text-sm uppercase tracking-[0.1em] text-muted-foreground">
              minimalism is not about having less, it's about making room for more of what matters
            </p>
          </div>


          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 mt-12 md:mt-24">
            {/* Terminal / Code Editor Profile Section */}
            <div className="w-full max-w-2xl bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              {/* Window controls */}
              <div className="h-8 bg-zinc-900 dark:bg-zinc-950 flex items-center px-4 gap-2 border-b border-zinc-800">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs font-mono text-zinc-500 select-none">lam@developer:~</span>
              </div>
              {/* Code block */}
              <div className="p-4 md:p-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed text-zinc-300">
                <div className="flex gap-4">
                  <span className="text-zinc-600 select-none">1</span>
                  <span><span className="text-pink-400">const</span> <span className="text-blue-400">developer</span> = {'{'}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-zinc-600 select-none">2</span>
                  <span className="ml-4"><span className="text-zinc-400">name:</span> <span className="text-yellow-300">'Lam'</span>,</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-zinc-600 select-none">3</span>
                  <span className="ml-4"><span className="text-zinc-400">role:</span> <span className="text-yellow-300">'Fullstack Engineer'</span>,</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-zinc-600 select-none">4</span>
                  <span className="ml-4"><span className="text-zinc-400">location:</span> <span className="text-yellow-300">'Ho Chi Minh City, Vietnam'</span>,</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-zinc-600 select-none">5</span>
                  <span className="ml-4 hidden sm:inline"><span className="text-zinc-400">email:</span> <span className="text-yellow-300">'lambh.1998@gmail.com'</span>,</span>
                  <span className="ml-4 sm:hidden"><span className="text-zinc-400">email:</span> <br /><span className="text-yellow-300 ml-4">'lambh.1998@gmail...</span>,</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-zinc-600 select-none">6</span>
                  <span className="ml-4 hidden sm:inline"><span className="text-zinc-400">passion:</span> <span className="text-yellow-300">'Building minimal & scalable web apps'</span>,</span>
                  <span className="ml-4 sm:hidden"><span className="text-zinc-400">passion:</span> <br /><span className="text-yellow-300 ml-4">'Building minimal...'</span>,</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-zinc-600 select-none">7</span>
                  <span className="ml-4"><span className="text-zinc-400">stack:</span> [<span className="text-yellow-300">'Next.js'</span>, <span className="text-yellow-300">'TypeScript'</span>, <span className="text-yellow-300">'Tailwind'</span>, <span className="text-yellow-300">'PostgreSQL'</span>, <span className="text-yellow-300">'GIT'</span>, <span className="text-yellow-300">'Antd'</span>, <span className="text-yellow-300">'Shadcn/ui'</span>, <span className="text-yellow-300">'Express'</span>, <span className="text-yellow-300">'Node.js'</span>],</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-zinc-600 select-none">8</span>
                  <span>{'}'};</span>
                </div>
                <div className="flex gap-4 mt-2">
                  <span className="text-zinc-600 select-none">9</span>
                  <span><span className="text-pink-400">export default</span> developer; <span className="inline-block w-2 h-4 ml-1 bg-zinc-400 animate-pulse align-middle" /></span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8 md:mt-0 shrink-0">
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="border-border hover:bg-foreground hover:text-background transition-colors px-6 h-10 rounded-sm text-xs uppercase tracking-wider"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPlacement="right"
                >
                  More about me
                </Button>
              </Link>
              <a href="#contact" className="group flex items-center gap-4 text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors">
                <span className="w-12 h-[1px] bg-foreground group-hover:bg-primary transition-colors" />
                Contact me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Thoughts */}
      <section className="w-full px-6 md:px-12 py-24 bg-secondary/30 min-h-[calc(100vh-4rem)] flex flex-col justify-center snap-start">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Recent <br /> Thoughts</h2>
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">/ Logs & Tutorials</p>
            </div>
            <Button asChild variant="outline" className="rounded-none border-border hover:bg-foreground hover:text-background transition-colors h-12 px-8">
              <Link href="/blog" className="flex items-center">
                View Archive <ArrowUpRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Grid of 3 newest posts */}
          {recentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {recentBlogs.map((blog: BlogPost) => (
                <div key={blog.id} className="relative group">
                  <BlogItem blog={blog} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 border border-dashed border-border flex items-center justify-center">
              <p className="text-muted-foreground font-mono">No logs found. System quiet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Unconventional Contact Section */}
      <ContactSection email="lambh.1998@gmail.com" />
    </div>
  );
}
