import { useState } from 'react';
import { Send, Github, Mail, MapPin, Phone, Calendar, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ContactProps {
  user: any;
}

const Contact = ({ user }: ContactProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mvgbnplp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast({
          title: "Thanks! Your message has been sent.",
          description: "I'll get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Oops! Something went wrong, please try again.",
        description: "Please try submitting your message again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you. 
            Let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="glass-reflection border-glass-border overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4 inline-block">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border border-glass-border bg-background/50 backdrop-blur-sm">
                    <img
                      src={user?.avatar_url}
                      alt={user?.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-foreground/10 rounded-full blur opacity-50 -z-10" />
                </div>
                <h3 className="text-title font-semibold text-foreground mb-2">
                  {user?.name || 'Hassan Ali'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {user?.bio || 'Bridging biotech and data. I\'m a student actively learning and applying data analytics techniques to understand complex biological systems.'}
                </p>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <div className="space-y-4">
              <Card className="glass-reflection border-glass-border">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                      <Github className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">GitHub</p>
                      <p className="text-sm text-muted-foreground">@{user?.login}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(user?.html_url, '_blank')}
                      className="hover:bg-primary/10 text-muted-foreground hover:text-primary"
                    >
                      Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {user?.location && (
                <Card className="glass-reflection border-glass-border">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Location</p>
                        <p className="text-sm text-muted-foreground">{user.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="glass-reflection border-glass-border">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">Available via form</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-reflection border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <MessageSquare className="h-5 w-5" />
                  <span>Send me a message</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6" action="https://formspree.io/f/mvgbnplp" method="POST">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                        <User size={16} />
                        <span>Your Name</span>
                      </label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-glass-border focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                        <Mail size={16} />
                        <span>Email Address</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-glass-border focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                      <MessageSquare size={16} />
                      <span>Subject</span>
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-glass-border focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project, idea, or just say hello..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-glass-border focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Contact Options */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Prefer a different way to connect?
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => window.open('https://github.com/HassanAli135', '_blank')}
              className="glass-reflection border-glass-border hover:bg-primary/10 hover:border-primary/20 hover:scale-105 transition-all duration-300 hover:text-primary"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('mailto:muhammadhassan.analytics@gmail.com', '_blank')}
              className="glass-reflection border-glass-border hover:bg-primary/10 hover:border-primary/20 hover:scale-105 transition-all duration-300 hover:text-primary"
            >
              <Mail className="mr-2 h-4 w-4" />
              Direct Email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;