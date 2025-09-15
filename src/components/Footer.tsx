import { Github, ExternalLink, Heart, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface FooterProps {
  user: any;
}
const Footer = ({
  user
}: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <footer className="border-t border-glass-border py-16 px-6 lg:px-8 bg-muted/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-title font-semibold text-foreground mb-2">
                {user?.name || 'Hassan Ali'}
              </h3>
              <p className="text-muted-foreground">
                {user?.bio || 'Software Developer & Creative Technologist'}
              </p>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Passionate about creating innovative digital solutions that make a difference. 
              Let's build something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-3">
              {[{
              label: 'About',
              href: '#about'
            }, {
              label: 'Projects',
              href: '#projects'
            }, {
              label: 'Skills',
              href: '#skills'
            }, {
              label: 'Contact',
              href: '#contact'
            }].map(link => <button key={link.label} onClick={() => scrollToSection(link.href)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                  {link.label}
                </button>)}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="space-y-3">
              {user?.html_url && <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <Github className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>GitHub</span>
                </a>}
              <button onClick={() => scrollToSection('#contact')} className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <Mail className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-glass-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {user?.name || 'Hassan Ali'}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Built with ❤️ by hamza00990.khan@gmail.com</p>
        </div>
      </div>
    </footer>;
};
export default Footer;