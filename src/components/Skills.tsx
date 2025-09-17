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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10
      }
    }
  };

  return (
    <motion.section 
      id="skills" 
      className="py-24 px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-20" variants={cardVariants}>
          <h2 className="text-section text-foreground mb-6">
            Expertise & Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Specialized in data analytics and business intelligence with a focus on transforming complex datasets into actionable insights
          </p>
        </motion.div>

        {/* Core Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
        >
          {Object.entries(skillCategories).map(([categoryName, categoryData]) => {
            const categorySkills = technologies.filter(tech =>
              categoryData.skills.some(s => s.toLowerCase() === tech.toLowerCase())
            );

            if (categorySkills.length === 0) return null;

            return (
              <motion.div 
                key={categoryName} 
                className="min-h-[20rem]"
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 transition-all duration-300 hover:border-primary/30">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <motion.div 
                    className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]"
                    whileHover={{ backgroundColor: "hsl(var(--glass))" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative flex flex-1 flex-col gap-4">
                      <motion.div 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div 
                          className="w-fit rounded-lg border-[0.75px] border-border p-2"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <categoryData.icon className="h-5 w-5 text-foreground" />
                        </motion.div>
                        <h3 className="text-xl font-semibold font-sans tracking-[-0.04em] md:text-2xl text-foreground">
                          {categoryName}
                        </h3>
                      </motion.div>
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        variants={containerVariants}
                      >
                        {categorySkills.map((skill, index) => (
                          <motion.div
                            key={skill}
                            variants={badgeVariants}
                            whileHover={{ scale: 1.1, y: -2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Badge
                              variant="secondary"
                              className="text-sm font-medium cursor-default"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills Overview */}
        <motion.div 
          className="text-center"
          variants={cardVariants}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-3 bg-muted/30 rounded-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span 
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-muted-foreground">
              {technologies.length} specialized skills across data science and analytics
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;