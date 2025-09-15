import { useState, useEffect } from 'react';
import { Menu, X, Github, Mail, Home, User, FolderOpen, Code, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', href: '#hero', icon: Home },
    { id: 'about', label: 'About', href: '#about', icon: User },
    { id: 'projects', label: 'Projects', href: '#projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', href: '#skills', icon: Code },
    { id: 'contact', label: 'Contact', href: '#contact', icon: MessageCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation - Modern floating navbar */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block transition-all duration-300 rounded-xl ${
        isScrolled ? 'glass-reflection shadow-lg' : 'glass'
      }`}>
        <div className="flex items-center space-x-1 px-6 py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.href)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation - Modern hamburger */}
      <nav className="fixed top-6 right-6 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={`glass-reflection transition-all duration-300 ${
            isScrolled ? 'shadow-lg' : ''
          }`}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-16 right-0 glass-reflection border border-glass-border rounded-xl p-6 min-w-[240px] shadow-xl">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Social Links - Floating on left */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
        <div className="flex flex-col space-y-4">
            <Button
              variant="outline"
              size="icon"
              className="glass-reflection hover:scale-110 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg transform"
              onClick={() => window.open('https://github.com/HassanAli135', '_blank')}
            >
            <Github size={18} />
          </Button>
            <Button
              variant="outline"
              size="icon"
              className="glass-reflection hover:scale-110 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg transform"
              onClick={() => scrollToSection('#contact')}
            >
            <Mail size={18} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navigation;