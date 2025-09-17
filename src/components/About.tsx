import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface AboutProps {
  user: any;
}

const About = ({ user }: AboutProps) => {
  if (!user) {
    return (
      <section id="about" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-landscape-section text-foreground leading-none tracking-tight">
              02<br />ABOUT ME
            </h2>
            <div className="animate-pulse max-w-4xl mt-8">
              <div className="h-6 bg-muted/20 rounded mb-4" />
              <div className="h-6 bg-muted/20 rounded mb-4 w-3/4" />
              <div className="h-6 bg-muted/20 rounded w-1/2" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const joinDate = new Date(user.created_at).getFullYear();
  const yearsActive = new Date().getFullYear() - joinDate;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
        delay: 0.5
      }
    }
  };

  return (
    <motion.section 
      id="about" 
      className="py-20 px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-section text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div className="lg:col-span-5" variants={itemVariants}>
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <motion.img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-full aspect-square object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-60" />
              </div>
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-75 -z-10"
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div className="lg:col-span-7 space-y-8" variants={itemVariants}>
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <div>
                <h3 className="text-title font-semibold text-foreground mb-2">
                  {user.name || user.login}
                </h3>
                <p className="text-primary font-medium">
                  {user.bio || 'Software Developer & Creative Technologist'}
                </p>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  With {yearsActive}+ years of experience, I'm passionate about creating innovative solutions that make a difference.
                </p>
                <p className="leading-relaxed">
                  I specialize in modern web technologies, clean architecture, and user-centered design. 
                  My approach combines technical expertise with creative problem-solving to deliver exceptional results.
                </p>
                <p className="leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge with the developer community.
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-glass-border pt-8"
              variants={statsVariants}
            >
              {[
                { value: user.public_repos, label: 'Projects' },
                { value: user.followers, label: 'Followers' },
                { value: `${yearsActive}+`, label: 'Years Exp' },
                { value: user.company || '∞', label: user.company ? 'Company' : 'Passion' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.div 
                    className="text-2xl font-bold text-foreground mb-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Info */}
            {user.location && (
              <motion.div 
                className="flex items-center space-x-2 text-muted-foreground"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin size={16} />
                <span>{user.location}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;