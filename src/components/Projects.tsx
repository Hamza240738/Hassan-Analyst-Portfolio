import { useState } from 'react';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProjectsProps {
  repos: any[];
  featuredRepos: any[];
}

const Projects = ({ repos, featuredRepos }: ProjectsProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayRepos = showAll ? repos : featuredRepos;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  if (!repos.length) {
    return (
      <section id="projects" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-landscape-section text-foreground leading-none tracking-tight">
              03<br />SHOWCASES
            </h2>
            <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted/20 rounded" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-section text-foreground mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A showcase of my best work, featuring innovative solutions and modern development practices.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayRepos.map((repo, index) => (
            <motion.div 
              key={repo.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="min-h-[24rem]"
            >
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
                  <div className="relative flex flex-1 flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <h3 className="text-xl font-semibold font-sans tracking-[-0.04em] md:text-2xl text-foreground line-clamp-1">
                          {repo.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {repo.stargazers_count > 0 && (
                            <div className="flex items-center gap-1">
                              <Star size={14} />
                              {repo.stargazers_count}
                            </div>
                          )}
                          {repo.forks_count > 0 && (
                            <div className="flex items-center gap-1">
                              <GitFork size={14} />
                              {repo.forks_count}
                            </div>
                          )}
                        </div>
                      </div>
                      {repo.language && (
                        <Badge variant="secondary" className="shrink-0">
                          {repo.language}
                        </Badge>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-[1.375rem] md:text-base text-muted-foreground line-clamp-3">
                      {repo.description || 'No description available for this project.'}
                    </p>

                    {/* Technologies */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {repo.topics.slice(0, 4).map((topic: string) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Last updated */}
                    <p className="text-xs text-muted-foreground">
                      Last updated {formatDate(repo.updated_at)}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        onClick={() => window.open(repo.html_url, '_blank')}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                    </motion.div>
                    {repo.homepage && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-background/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                          onClick={() => window.open(repo.homepage, '_blank')}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {repos.length > featuredRepos.length && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(!showAll)}
                className="bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                {showAll ? `Show Featured Only` : `View All ${repos.length} Projects`}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;