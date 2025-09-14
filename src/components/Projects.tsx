import { useState } from 'react';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my best work, featuring innovative solutions and modern development practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayRepos.map((repo, index) => (
            <Card
              key={repo.id}
              className="glass-reflection border-glass-border group hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {repo.name}
                    </CardTitle>
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
              </CardHeader>
              
              <CardContent className="space-y-6">
                <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
                  {repo.description || 'No description available for this project.'}
                </CardDescription>

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

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    onClick={() => window.open(repo.html_url, '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                  {repo.homepage && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                      onClick={() => window.open(repo.homepage, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {repos.length > featuredRepos.length && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              {showAll ? `Show Featured Only` : `View All ${repos.length} Projects`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;