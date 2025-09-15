import { Badge } from '@/components/ui/badge';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';
import { BarChart3, LineChart, Microscope, Briefcase, Zap } from 'lucide-react';

interface SkillsProps {
  technologies: string[];
}

const Skills = ({ technologies }: SkillsProps) => {
  // Define skill categories matching the monochromatic theme
  const skillCategories = {
    'Data Analysis': {
      color: 'bg-primary/5 text-foreground border-primary/20 hover:bg-primary/10 hover:border-primary/30',
      skills: ['Python', 'R', 'SQL', 'Excel', 'Data Analysis', 'Statistical Analysis', 'Research Analysis'],
      icon: BarChart3
    },
    'Visualization': {
      color: 'bg-muted/30 text-foreground border-muted hover:bg-muted/50 hover:border-foreground/20',
      skills: ['Power BI', 'Tableau', 'Data Visualization', 'Dashboard Development', 'Business Intelligence'],
      icon: LineChart
    },
    'Data Science': {
      color: 'bg-secondary/50 text-foreground border-secondary hover:bg-secondary/70 hover:border-foreground/30',
      skills: ['Machine Learning', 'Data Science', 'Pandas', 'NumPy', 'Statistics', 'Bioinformatics'],
      icon: Microscope
    },
    'Business': {
      color: 'bg-accent/5 text-foreground border-accent/20 hover:bg-accent/10 hover:border-accent/30',
      skills: ['Business Analytics', 'Market Research', 'KPI Analysis', 'Strategic Planning'],
      icon: Briefcase
    },
    'Technical': {
      color: 'bg-glass border-glass-border text-foreground hover:bg-primary/5 hover:border-primary/20',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Git', 'Docker', 'AWS'],
      icon: Zap
    },
  };

  const categorizeSkill = (skill: string) => {
    for (const [category, data] of Object.entries(skillCategories)) {
      if (data.skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
        return { category, color: data.color };
      }
    }
    return { category: 'other', color: 'bg-muted/20 text-muted-foreground border-muted/50' };
  };

  if (!technologies.length) {
    return (
      <section id="skills" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-landscape-section text-foreground leading-none tracking-tight">
              04<br />SKILLS
            </h2>
            <div className="animate-pulse flex flex-wrap gap-3 mt-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-8 w-20 bg-muted/20 rounded" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 opacity-0 animate-fade-in">
          <h2 className="text-section text-foreground mb-6">
            Expertise & Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Specialized in data analytics and business intelligence with a focus on transforming complex datasets into actionable insights
          </p>
        </div>

        {/* Core Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(skillCategories).map(([categoryName, categoryData], index) => {
            const categorySkills = technologies.filter(tech =>
              categoryData.skills.some(s => s.toLowerCase() === tech.toLowerCase())
            );

            if (categorySkills.length === 0) return null;

            return (
              <div 
                key={categoryName} 
                className={cn(
                  "min-h-[20rem] opacity-0 hover:scale-[1.02] transition-all duration-500",
                  index % 3 === 0 && "animate-slide-in-left",
                  index % 3 === 1 && "animate-fade-in",
                  index % 3 === 2 && "animate-slide-in-right"
                )}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 group">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] group-hover:shadow-lg transition-shadow duration-500">
                    <div className="relative flex flex-1 flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-fit rounded-lg border-[0.75px] border-border p-2">
                          <categoryData.icon className="h-5 w-5 text-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold font-sans tracking-[-0.04em] md:text-2xl text-foreground">
                          {categoryName}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill, skillIndex) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default hover:bg-primary hover:text-primary-foreground"
                            style={{ 
                              animationDelay: `${(index * 0.3) + (skillIndex * 0.1)}s`,
                              animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both'
                            }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Overview */}
        <div className="text-center opacity-0 animate-scale-in" style={{ animationDelay: '1.5s' }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted/30 rounded-full hover:bg-muted/50 transition-colors duration-300 group">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce-gentle group-hover:bg-accent transition-colors duration-300"></span>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {technologies.length} specialized skills across data science and analytics
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;