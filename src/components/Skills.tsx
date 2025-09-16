import { Badge } from '@/components/ui/badge';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';
import { BarChart3, LineChart, Microscope, Briefcase, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-section text-foreground mb-6"
          >
            Expertise & Skills
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Specialized in data analytics and business intelligence with a focus on transforming complex datasets into actionable insights
          </motion.p>
        </motion.div>

        {/* Core Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(skillCategories).map(([categoryName, categoryData], index) => {
            const categorySkills = technologies.filter(tech =>
              categoryData.skills.some(s => s.toLowerCase() === tech.toLowerCase())
            );

            if (categorySkills.length === 0) return null;

            return (
              <motion.div 
                key={categoryName} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="min-h-[20rem]"
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
                      <motion.div 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-fit rounded-lg border-[0.75px] border-border p-2"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <categoryData.icon className="h-5 w-5 text-foreground" />
                        </motion.div>
                        <h3 className="text-xl font-semibold font-sans tracking-[-0.04em] md:text-2xl text-foreground">
                          {categoryName}
                        </h3>
                      </motion.div>
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                        viewport={{ once: true }}
                      >
                        {categorySkills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.1 + 0.6 + skillIndex * 0.05,
                              type: "spring",
                              stiffness: 200
                            }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <Badge
                              variant="secondary"
                              className="text-sm font-medium transition-all duration-200 cursor-default"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skills Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-3 bg-muted/30 rounded-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.span 
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.span>
            <span className="text-sm font-medium text-muted-foreground">
              {technologies.length} specialized skills across data science and analytics
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;