import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Github, ExternalLink, Download, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackgroundPaths } from '@/components/ui/background-paths';

interface HeroProps {
  user: any;
}

const Hero = ({ user }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!user) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center relative px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-muted/20 rounded w-3/4" />
            <div className="h-8 bg-muted/20 rounded w-1/2" />
            <div className="h-6 bg-muted/20 rounded w-2/3" />
          </div>
        </div>
      </section>
    );
  }

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-6 lg:px-8 overflow-hidden bg-background">
      {/* Animated Background */}
      <BackgroundPaths />
      
      {/* Fade overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent z-5"></div>
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-center"
        >
          
          {/* Greeting and Name - Connected Typography */}
          <div className="mb-8">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-1"
            >
              <p className="text-primary font-bold text-2xl md:text-3xl lg:text-4xl tracking-wide">
                Hello, I'm
              </p>
            </motion.div>

            <h1 className="text-hero font-bold leading-tight mb-6 whitespace-nowrap overflow-hidden">
              <motion.span
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 150,
                  damping: 25,
                }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80"
              >
                {user.name || user.login}
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed"
            >
              {user.bio || 'Passionate software developer creating innovative digital solutions'}
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="font-semibold bg-primary hover:bg-primary/80 hover:shadow-lg text-primary-foreground transition-all duration-200"
                onClick={() => window.open(user.html_url, '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                View My Work
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="font-medium glass-reflection border-glass-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>


      {/* Scroll indicator */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
        >
          <span className="text-xs md:text-sm font-medium">Scroll down</span>
          <ArrowDown size={16} className="animate-bounce group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;