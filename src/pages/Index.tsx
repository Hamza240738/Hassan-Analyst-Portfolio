import { useEffect } from 'react';
import { useGitHub } from '@/hooks/useGitHub';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const { user, repos, featuredRepos, technologies, loading, error } = useGitHub('HassanAli135');

  // Add scroll reveal animation
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center glass-reflection p-8 rounded-lg">
          <h1 className="mb-4 text-4xl font-bold text-destructive">Error Loading Portfolio</h1>
          <p className="text-xl text-muted-foreground">
            Failed to load GitHub data: {error}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <div className="reveal">
          <Hero user={user} />
        </div>
        
        <div className="reveal">
          <About user={user} />
        </div>
        
        <div className="reveal">
          <Projects repos={repos} featuredRepos={featuredRepos} />
        </div>
        
        <div className="reveal">
          <Skills technologies={technologies} />
        </div>
        
        <div className="reveal">
          <Contact user={user} />
        </div>
      </main>
      
      <Footer user={user} />
    </div>
  );
};

export default Index;
