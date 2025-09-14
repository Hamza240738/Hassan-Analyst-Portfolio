import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SkillsProps {
  technologies: string[];
}

const Skills = ({ technologies }: SkillsProps) => {
  // Define skill categories matching the monochromatic theme
  const skillCategories = {
    'Data Analysis': {
      color: 'bg-primary/5 text-foreground border-primary/20 hover:bg-primary/10 hover:border-primary/30',
      skills: ['Python', 'R', 'SQL', 'Excel', 'Data Analysis', 'Statistical Analysis', 'Research Analysis'],
      icon: '📊'
    },
    'Visualization': {
      color: 'bg-muted/30 text-foreground border-muted hover:bg-muted/50 hover:border-foreground/20',
      skills: ['Power BI', 'Tableau', 'Data Visualization', 'Dashboard Development', 'Business Intelligence'],
      icon: '📈'
    },
    'Data Science': {
      color: 'bg-secondary/50 text-foreground border-secondary hover:bg-secondary/70 hover:border-foreground/30',
      skills: ['Machine Learning', 'Data Science', 'Pandas', 'NumPy', 'Statistics', 'Bioinformatics'],
      icon: '🔬'
    },
    'Business': {
      color: 'bg-accent/5 text-foreground border-accent/20 hover:bg-accent/10 hover:border-accent/30',
      skills: ['Business Analytics', 'Market Research', 'KPI Analysis', 'Strategic Planning'],
      icon: '💼'
    },
    'Technical': {
      color: 'bg-glass border-glass-border text-foreground hover:bg-primary/5 hover:border-primary/20',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Git', 'Docker', 'AWS'],
      icon: '⚡'
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
        <div className="text-center mb-20">
          <h2 className="text-section text-foreground mb-6">
            Expertise & Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Specialized in data analytics and business intelligence with a focus on transforming complex datasets into actionable insights
          </p>
        </div>

        {/* Core Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(skillCategories).map(([categoryName, categoryData]) => {
            const categorySkills = technologies.filter(tech =>
              categoryData.skills.some(s => s.toLowerCase() === tech.toLowerCase())
            );

            if (categorySkills.length === 0) return null;

            return (
              <Card 
                key={categoryName} 
                className="glass-reflection border-glass-border overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-foreground">
                    <span className="text-2xl">{categoryData.icon}</span>
                    {categoryName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categorySkills.map((skill, index) => (
                    <div
                      key={skill}
                      className={`inline-block px-3 py-2 rounded-lg text-sm font-medium ${categoryData.color} transition-all duration-200 hover:scale-105 cursor-default mr-2 mb-2`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Skills Overview */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted/30 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-muted-foreground">
              {technologies.length} specialized skills across data science and analytics
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;