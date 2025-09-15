import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

  return (
    <section id="about" className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-60" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
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
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-glass-border pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{user.public_repos}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{user.followers}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{yearsActive}+</div>
                <div className="text-sm text-muted-foreground">Years Exp</div>
              </div>
              {user.company ? (
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground mb-1 truncate">{user.company}</div>
                  <div className="text-sm text-muted-foreground">Company</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">∞</div>
                  <div className="text-sm text-muted-foreground">Passion</div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            {user.location && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;