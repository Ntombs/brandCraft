
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@shared/schema";
import { Link } from "wouter";
import { FolderOpen, FileText, ArrowRight, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';

const serviceOfferings = {
  marketing: [
    { id: "content_marketing", label: "Content Marketing & Email Marketing" },
    { id: "market_research", label: "Market Research & Strategy" },
    { id: "social_media", label: "Social Media Marketing (SMM)" },
    { id: "public_relations", label: "Public Relations" }
  ],
  design: [
    { id: "corporate_identity", label: "Corporate Identity Package" },
    { id: "print_material", label: "Print & Marketing Material Design" },
    { id: "infographics", label: "Infographics Design" },
    { id: "presentation", label: "Presentation Design" },
    { id: "social_media_design", label: "Social Media Post & Content Design" },
    { id: "custom_design", label: "Custom Design Projects" }
  ],
  business: [
    { id: "company_registration", label: "Company Registration (CIPC)" },
    { id: "tax_number", label: "Tax Number & Clearance" },
    { id: "sars_update", label: "SARS Representative Update" },
    { id: "coida", label: "COIDA Registration & Letter of Good Standing" },
    { id: "business_plan", label: "Business Plan" },
    { id: "business_profile", label: "Business Profile" }
  ]
};

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    startDate: "",
    deadline: "",
    services: {
      marketing: [] as string[],
      design: [] as string[],
      business: [] as string[]
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCreateProject = async () => {
    if (!newProject.title) {
      toast({
        title: "Error",
        description: "Project title is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/projects", {
        title: newProject.title,
        description: newProject.description,
        startDate: newProject.startDate,
        deadline: newProject.deadline,
        services: newProject.services,
        status: "draft",
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setNewProject({
        title: "",
        description: "",
        startDate: "",
        deadline: "",
        services: { marketing: [], design: [], business: [] }
      });
      setIsCreatingProject(false);
      
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceToggle = (category: string, serviceId: string) => {
    setNewProject(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [category]: prev.services[category].includes(serviceId)
          ? prev.services[category].filter(id => id !== serviceId)
          : [...prev.services[category], serviceId]
      }
    }));
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold mb-2">Your Projects</h1>
            <p className="text-gray-600">Manage and track all your brand and design projects</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Dialog open={isCreatingProject} onOpenChange={setIsCreatingProject}>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Start a new project by selecting your required services and project timeline
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Project Title
                    </label>
                    <Input
                      id="title"
                      placeholder="e.g., Company Rebranding Project"
                      value={newProject.title}
                      onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Project Description
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project requirements..."
                      value={newProject.description}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="startDate" className="text-sm font-medium">
                        Start Date
                      </label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newProject.startDate}
                        onChange={(e) => setNewProject(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="deadline" className="text-sm font-medium">
                        Deadline
                      </label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newProject.deadline}
                        onChange={(e) => setNewProject(prev => ({ ...prev, deadline: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Marketing & Promotion Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceOfferings.marketing.map((service) => (
                        <div key={service.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={service.id}
                            checked={newProject.services.marketing.includes(service.id)}
                            onCheckedChange={() => handleServiceToggle('marketing', service.id)}
                          />
                          <label htmlFor={service.id} className="text-sm">
                            {service.label}
                          </label>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-medium">Corporate Identity & Branding Design</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceOfferings.design.map((service) => (
                        <div key={service.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={service.id}
                            checked={newProject.services.design.includes(service.id)}
                            onCheckedChange={() => handleServiceToggle('design', service.id)}
                          />
                          <label htmlFor={service.id} className="text-sm">
                            {service.label}
                          </label>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-medium">Essential Business Setup & Compliance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceOfferings.business.map((service) => (
                        <div key={service.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={service.id}
                            checked={newProject.services.business.includes(service.id)}
                            onCheckedChange={() => handleServiceToggle('business', service.id)}
                          />
                          <label htmlFor={service.id} className="text-sm">
                            {service.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreatingProject(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateProject}
                    disabled={isSubmitting}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    Create Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !projects || projects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FolderOpen className="h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-medium mb-2">No projects yet</h2>
              <p className="text-gray-500 text-center mb-6">
                Create your first project to get started with our branding and design services.
              </p>
              <Button
                onClick={() => setIsCreatingProject(true)}
                className="bg-black text-white hover:bg-gray-800"
              >
                <Plus className="mr-2 h-4 w-4" /> Create Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-2">{project.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Created: {format(new Date(project.createdAt), 'dd MMM yyyy')}</span>
                    </div>
                    {project.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        project.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : project.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {project.status.replace("_", " ")}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
