import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
// The 700 weights are used only by this admin screen. Importing them here keeps
// them in the lazily-loaded admin chunk, so public visitors never download them.
import "@fontsource/fraunces/700.css";
import "@fontsource/inter/700.css";
import { 
  Lock, 
  LogOut, 
  Home, 
  User, 
  Briefcase, 
  Code, 
  BarChart3, 
  Mail,
  Save,
  RotateCcw,
  Key,
  ChevronRight,
  X,
  Plus,
  Sparkles,
  Shield,
  Eye,
  EyeOff,
  Menu,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { usePortfolio } from "@/contexts/PortfolioContext";
import type { Project, Skill } from "@/contexts/PortfolioContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Animated gradient background
const GradientBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
    <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
  </div>
);

const AdminLogin = ({ onLogin }: { onLogin: (password: string) => boolean }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate slight delay for UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (onLogin(password)) {
      setError("");
    } else {
      setError("Incorrect password");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <GradientBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center pb-2">
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield className="w-10 h-10 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl md:text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-base">Enter your password to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      "h-12 pr-12 text-base transition-all",
                      error ? "border-destructive focus-visible:ring-destructive" : ""
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-11"
                onClick={() => navigate("/")}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                Default password: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">admin123</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

// Sidebar navigation item
interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: string;
}

const NavItem = ({ icon: Icon, label, isActive, onClick, badge }: NavItemProps) => (
  <motion.button
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all",
      isActive 
        ? "bg-primary text-primary-foreground shadow-lg" 
        : "hover:bg-muted text-muted-foreground hover:text-foreground"
    )}
  >
    <Icon className="w-5 h-5 flex-shrink-0" />
    <span className="font-medium truncate">{label}</span>
    {badge && (
      <Badge variant="secondary" className="ml-auto text-xs">
        {badge}
      </Badge>
    )}
  </motion.button>
);

// Section wrapper with animation
const SectionWrapper = ({ children, title, description }: { children: React.ReactNode; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
    <Card className="border-border/50 shadow-lg">
      <CardContent className="p-4 md:p-6">
        {children}
      </CardContent>
    </Card>
  </motion.div>
);

// Save button component
const SaveButton = ({ onClick, label = "Save Changes" }: { onClick: () => void; label?: string }) => (
  <Button onClick={onClick} className="gap-2 shadow-lg">
    <Save className="w-4 h-4" />
    {label}
  </Button>
);

const HeroEditor = () => {
  const { data, updateSection } = usePortfolio();
  const { toast } = useToast();
  const [hero, setHero] = useState(data.hero);

  const handleSave = () => {
    updateSection("hero", hero);
    toast({ title: "✓ Hero section updated!", description: "Your changes have been saved." });
  };

  return (
    <SectionWrapper title="Hero Section" description="Update your name, tagline, and social links">
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Full Name</Label>
            <Input 
              value={hero.name} 
              onChange={(e) => setHero({ ...hero, name: e.target.value })}
              className="h-11"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Company</Label>
            <Input 
              value={hero.company} 
              onChange={(e) => setHero({ ...hero, company: e.target.value })}
              className="h-11"
              placeholder="Tech Corp"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tagline</Label>
          <Input 
            value={hero.tagline} 
            onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
            className="h-11"
            placeholder="🚀 Full Stack Developer"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Description</Label>
          <Textarea 
            value={hero.description} 
            onChange={(e) => setHero({ ...hero, description: e.target.value })} 
            rows={3}
            className="resize-none"
            placeholder="A brief description about yourself..."
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-sm font-medium">GitHub URL</Label>
            <Input 
              value={hero.githubUrl} 
              onChange={(e) => setHero({ ...hero, githubUrl: e.target.value })}
              className="h-11"
              placeholder="https://github.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">LinkedIn URL</Label>
            <Input 
              value={hero.linkedinUrl} 
              onChange={(e) => setHero({ ...hero, linkedinUrl: e.target.value })}
              className="h-11"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Email</Label>
            <Input 
              value={hero.email} 
              onChange={(e) => setHero({ ...hero, email: e.target.value })}
              className="h-11"
              placeholder="you@email.com"
            />
          </div>
        </div>
        
        <div className="pt-2">
          <SaveButton onClick={handleSave} label="Save Hero" />
        </div>
      </div>
    </SectionWrapper>
  );
};

const AboutEditor = () => {
  const { data, updateSection } = usePortfolio();
  const { toast } = useToast();
  const [about, setAbout] = useState(data.about);

  const handleSave = () => {
    updateSection("about", about);
    toast({ title: "✓ About section updated!", description: "Your changes have been saved." });
  };

  return (
    <SectionWrapper title="About Section" description="Update your bio and personal information">
      <div className="space-y-5">
        {about.bio.map((paragraph, index) => (
          <div key={index} className="space-y-2">
            <Label className="text-sm font-medium">Paragraph {index + 1}</Label>
            <Textarea
              value={paragraph}
              onChange={(e) => {
                const newBio = [...about.bio];
                newBio[index] = e.target.value;
                setAbout({ ...about, bio: newBio });
              }}
              rows={3}
              className="resize-none"
            />
          </div>
        ))}
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Languages (comma separated)</Label>
          <Input
            value={about.languages.join(", ")}
            onChange={(e) => setAbout({ ...about, languages: e.target.value.split(", ").map(l => l.trim()) })}
            className="h-11"
            placeholder="🌐 English, 🇮🇳 Hindi"
          />
        </div>
        
        <div className="pt-2">
          <SaveButton onClick={handleSave} label="Save About" />
        </div>
      </div>
    </SectionWrapper>
  );
};

const ProjectsEditor = () => {
  const { data, updateSection } = usePortfolio();
  const { toast } = useToast();
  const [projects, setProjects] = useState(data.projects);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSave = () => {
    updateSection("projects", projects);
    toast({ title: "✓ Projects updated!", description: `${projects.length} projects saved.` });
    setEditingIndex(null);
  };

  const updateProject = <K extends keyof Project>(index: number, field: K, value: Project[K]) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: "New Project",
        description: "Project description",
        icon: "🆕",
        tags: ["React"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        type: "Personal",
        highlights: ["Feature 1"],
      },
    ]);
    setEditingIndex(projects.length);
  };

  const deleteProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
    setEditingIndex(null);
  };

  return (
    <SectionWrapper title="Projects" description="Add, edit, or remove your portfolio projects">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {projects.length} projects
            </Badge>
          </div>
          <Button onClick={addProject} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>
        
        <ScrollArea className="h-[450px] pr-2">
          <div className="space-y-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={cn(
                  "overflow-hidden transition-all",
                  editingIndex === index ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                )}>
                  <div
                    className="p-4 cursor-pointer flex items-center justify-between hover:bg-muted/50 transition-colors"
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl flex-shrink-0">{project.icon}</span>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-foreground truncate">{project.title}</h4>
                        <p className="text-xs text-muted-foreground">{project.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.featured && (
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                      )}
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-transform text-muted-foreground",
                        editingIndex === index && "rotate-90"
                      )} />
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {editingIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 space-y-4 border-t">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label className="text-xs font-medium">Title</Label>
                              <Input 
                                value={project.title} 
                                onChange={(e) => updateProject(index, "title", e.target.value)}
                                className="h-10"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-medium">Icon (emoji)</Label>
                              <Input 
                                value={project.icon} 
                                onChange={(e) => updateProject(index, "icon", e.target.value)}
                                className="h-10"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-xs font-medium">Description</Label>
                            <Textarea 
                              value={project.description} 
                              onChange={(e) => updateProject(index, "description", e.target.value)} 
                              rows={2}
                              className="resize-none"
                            />
                          </div>
                          
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label className="text-xs font-medium">Live URL</Label>
                              <Input 
                                value={project.liveUrl} 
                                onChange={(e) => updateProject(index, "liveUrl", e.target.value)}
                                className="h-10"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-medium">GitHub URL</Label>
                              <Input 
                                value={project.githubUrl} 
                                onChange={(e) => updateProject(index, "githubUrl", e.target.value)}
                                className="h-10"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-xs font-medium">Tags (comma separated)</Label>
                            <Input
                              value={project.tags.join(", ")}
                              onChange={(e) => updateProject(index, "tags", e.target.value.split(", ").map(t => t.trim()))}
                              className="h-10"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-xs font-medium">Highlights (comma separated)</Label>
                            <Input
                              value={project.highlights.join(", ")}
                              onChange={(e) => updateProject(index, "highlights", e.target.value.split(", ").map(h => h.trim()))}
                              className="h-10"
                            />
                          </div>
                          
                          <div className="flex justify-end">
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => deleteProject(index)}
                              className="gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="pt-2">
          <SaveButton onClick={handleSave} label="Save All Projects" />
        </div>
      </div>
    </SectionWrapper>
  );
};

const SkillsEditor = () => {
  const { data, updateSection } = usePortfolio();
  const { toast } = useToast();
  const [skills, setSkills] = useState(data.skills);

  const handleSave = () => {
    updateSection("skills", skills);
    toast({ title: "✓ Skills updated!", description: "Your changes have been saved." });
  };

  const updateSkill = <K extends keyof Skill>(
    category: "frontend" | "backend",
    index: number,
    field: K,
    value: Skill[K]
  ) => {
    const newSkills = { ...skills };
    newSkills[category][index] = { ...newSkills[category][index], [field]: value };
    setSkills(newSkills);
  };

  const SkillRow = ({ skill, index, category }: { skill: { name: string; level: number }; index: number; category: "frontend" | "backend" }) => (
    <div className="flex gap-3 items-center group">
      <Input
        value={skill.name}
        onChange={(e) => updateSkill(category, index, "name", e.target.value)}
        className="flex-1 h-10"
        placeholder="Skill name"
      />
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={0}
          max={100}
          value={skill.level}
          onChange={(e) => updateSkill(category, index, "level", parseInt(e.target.value) || 0)}
          className="w-20 h-10 text-center"
        />
        <span className="text-xs text-muted-foreground w-4">%</span>
      </div>
      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden hidden sm:block">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );

  return (
    <SectionWrapper title="Skills & Expertise" description="Update your skill levels and proficiency">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <h4 className="font-semibold text-foreground">Frontend Skills</h4>
          </div>
          <div className="space-y-3">
            {skills.frontend.map((skill, index) => (
              <SkillRow key={index} skill={skill} index={index} category="frontend" />
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <h4 className="font-semibold text-foreground">Backend & Tools</h4>
          </div>
          <div className="space-y-3">
            {skills.backend.map((skill, index) => (
              <SkillRow key={index} skill={skill} index={index} category="backend" />
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <SaveButton onClick={handleSave} label="Save Skills" />
        </div>
      </div>
    </SectionWrapper>
  );
};

const StatsEditor = () => {
  const { data, updateSection } = usePortfolio();
  const { toast } = useToast();
  const [stats, setStats] = useState(data.stats);

  const handleSave = () => {
    updateSection("stats", stats);
    toast({ title: "✓ Stats updated!", description: "Your changes have been saved." });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };

  return (
    <SectionWrapper title="Statistics" description="Update your achievement statistics">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 bg-muted/30 border-dashed">
                <div className="space-y-3">
                  <Input
                    value={stat.value}
                    onChange={(e) => updateStat(index, "value", e.target.value)}
                    placeholder="50+"
                    className="text-center text-2xl font-bold h-14 bg-background"
                  />
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(index, "label", e.target.value)}
                    placeholder="Projects Completed"
                    className="text-center text-sm bg-background"
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="pt-2">
          <SaveButton onClick={handleSave} label="Save Stats" />
        </div>
      </div>
    </SectionWrapper>
  );
};

const ContactEditor = () => {
  const { data, updateSection } = usePortfolio();
  const { toast } = useToast();
  const [contact, setContact] = useState(data.contact);

  const handleSave = () => {
    updateSection("contact", contact);
    toast({ title: "✓ Contact info updated!", description: "Your changes have been saved." });
  };

  return (
    <SectionWrapper title="Contact Information" description="Update your contact details">
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Email</Label>
            <Input 
              value={contact.email} 
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="h-11"
              placeholder="you@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Location</Label>
            <Input 
              value={contact.location} 
              onChange={(e) => setContact({ ...contact, location: e.target.value })}
              className="h-11"
              placeholder="City, Country"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">GitHub Username</Label>
            <Input 
              value={contact.github} 
              onChange={(e) => setContact({ ...contact, github: e.target.value })}
              className="h-11"
              placeholder="github.com/username"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">LinkedIn Display Name</Label>
            <Input 
              value={contact.linkedin} 
              onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
              className="h-11"
              placeholder="Your Name"
            />
          </div>
        </div>
        
        <div className="pt-2">
          <SaveButton onClick={handleSave} label="Save Contact" />
        </div>
      </div>
    </SectionWrapper>
  );
};

const SettingsEditor = () => {
  const { changePassword, resetToDefault } = usePortfolio();
  const { toast } = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (changePassword(oldPassword, newPassword)) {
      toast({ title: "✓ Password changed!", description: "Your new password is now active." });
      setOldPassword("");
      setNewPassword("");
    } else {
      toast({ title: "Error", description: "Incorrect current password", variant: "destructive" });
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure? This will reset ALL data to defaults. This cannot be undone.")) {
      resetToDefault();
      toast({ title: "Data reset", description: "All data has been reset to defaults." });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>
      
      <Card className="border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Change Password
          </CardTitle>
          <CardDescription>Update your admin password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Current Password</Label>
              <div className="relative">
                <Input 
                  type={showOldPassword ? "text" : "password"} 
                  value={oldPassword} 
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="h-11 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">New Password</Label>
              <div className="relative">
                <Input 
                  type={showNewPassword ? "text" : "password"} 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-11 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="gap-2">
              <Key className="w-4 h-4" />
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="border-destructive/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Reset all portfolio data to default values</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset All Data
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const navItems = [
  { id: "hero", icon: User, label: "Hero", badge: undefined },
  { id: "about", icon: User, label: "About", badge: undefined },
  { id: "projects", icon: Briefcase, label: "Projects", badge: undefined },
  { id: "skills", icon: Code, label: "Skills", badge: undefined },
  { id: "stats", icon: BarChart3, label: "Stats", badge: undefined },
  { id: "contact", icon: Mail, label: "Contact", badge: undefined },
  { id: "settings", icon: Key, label: "Settings", badge: undefined },
];

const AdminDashboard = () => {
  const { logout, data } = usePortfolio();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "hero": return <HeroEditor />;
      case "about": return <AboutEditor />;
      case "projects": return <ProjectsEditor />;
      case "skills": return <SkillsEditor />;
      case "stats": return <StatsEditor />;
      case "contact": return <ContactEditor />;
      case "settings": return <SettingsEditor />;
      default: return <HeroEditor />;
    }
  };

  // Update project count badge
  const updatedNavItems = navItems.map(item => ({
    ...item,
    badge: item.id === "projects" ? String(data.projects.length) : undefined
  }));

  return (
    <div className="min-h-screen bg-background">
      <GradientBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-bold text-foreground hidden sm:block">Admin Panel</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-border/50 bg-background/50 backdrop-blur-sm min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="flex-1 p-4 space-y-1">
            {updatedNavItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
                badge={item.badge}
              />
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed left-0 top-16 bottom-0 w-72 border-r border-border/50 bg-background z-50 md:hidden"
              >
                <nav className="p-4 space-y-1">
                  {updatedNavItems.map((item) => (
                    <NavItem
                      key={item.id}
                      icon={item.icon}
                      label={item.label}
                      isActive={activeSection === item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      badge={item.badge}
                    />
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={activeSection}>
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

const Admin = () => {
  const { isAuthenticated, login } = usePortfolio();

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return <AdminDashboard />;
};

export default Admin;
