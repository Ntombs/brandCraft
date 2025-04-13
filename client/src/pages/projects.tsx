
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
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactRole: "",
    websiteUrl: "",
    timelineFlexibility: "",
    budgetRange: "",
    services: {
      marketing: [] as string[],
      design: [] as string[],
      business: [] as string[]
    },
    otherServices: "",
    files: [] as File[]
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // 10MB limit
    
    if (validFiles.length !== files.length) {
      toast({
        title: "Warning",
        description: "Some files exceeded the 10MB size limit and were not added.",
        variant: "destructive",
      });
    }

    setNewProject(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles]
    }));
  };

  const handleRemoveFile = (index: number) => {
    setNewProject(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };
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
                  {/* A. Project Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="contactName" className="text-sm font-medium">
                          Primary Project Contact Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="contactName"
                          placeholder="Enter your full name"
                          value={newProject.contactName}
                          onChange={(e) => setNewProject(prev => ({ ...prev, contactName: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contactEmail" className="text-sm font-medium">
                          Project Contact Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="contactEmail"
                          type="email"
                          placeholder="your@email.com"
                          value={newProject.contactEmail}
                          onChange={(e) => setNewProject(prev => ({ ...prev, contactEmail: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contactPhone" className="text-sm font-medium">
                          Project Contact Phone
                        </label>
                        <Input
                          id="contactPhone"
                          placeholder="+1 (555) 555-5555"
                          value={newProject.contactPhone}
                          onChange={(e) => setNewProject(prev => ({ ...prev, contactPhone: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contactRole" className="text-sm font-medium">
                          Contact's Role/Title
                        </label>
                        <Input
                          id="contactRole"
                          placeholder="e.g., Marketing Manager"
                          value={newProject.contactRole}
                          onChange={(e) => setNewProject(prev => ({ ...prev, contactRole: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* B. Project Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Project Details</h3>
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Project Name or Title <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="title"
                        placeholder="e.g., Company Rebranding Project"
                        value={newProject.title}
                        onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                      <p className="text-sm text-gray-500">Give your project a short, descriptive name.</p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Brief Project Description / Key Goal(s) <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="description"
                        placeholder="Briefly describe what you want to achieve with this project..."
                        value={newProject.description}
                        onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="websiteUrl" className="text-sm font-medium">
                        Current Website URL
                      </label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        placeholder="https://"
                        value={newProject.websiteUrl}
                        onChange={(e) => setNewProject(prev => ({ ...prev, websiteUrl: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="startDate" className="text-sm font-medium">
                          Desired Start Date
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
                          Desired Completion Date
                        </label>
                        <Input
                          id="deadline"
                          type="date"
                          value={newProject.deadline}
                          onChange={(e) => setNewProject(prev => ({ ...prev, deadline: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Timeline Flexibility</label>
                      <RadioGroup
                        value={newProject.timelineFlexibility}
                        onValueChange={(value) => setNewProject(prev => ({ ...prev, timelineFlexibility: value }))}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <RadioGroupItem value="fixed" label="Fixed Deadline" />
                          <RadioGroupItem value="flexible" label="Target Date - Flexible" />
                          <RadioGroupItem value="ongoing" label="Open/Ongoing" />
                          <RadioGroupItem value="urgent" label="Urgent" />
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Estimated Budget Range</label>
                      <RadioGroup
                        value={newProject.budgetRange}
                        onValueChange={(value) => setNewProject(prev => ({ ...prev, budgetRange: value }))}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <RadioGroupItem value="under_1000" label="< $1,000" />
                          <RadioGroupItem value="1000_2500" label="$1,000 - $2,500" />
                          <RadioGroupItem value="2500_5000" label="$2,500 - $5,000" />
                          <RadioGroupItem value="5000_10000" label="$5,000 - $10,000" />
                          <RadioGroupItem value="over_10000" label="> $10,000" />
                          <RadioGroupItem value="tbd" label="To Be Discussed" />
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* C. Required Services */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Required Services <span className="text-red-500">*</span></h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Marketing & Promotion Services</h4>
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
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Corporate Identity & Branding Design</h4>
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
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Essential Business Setup & Compliance</h4>
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

                    <div className="space-y-2">
                      <label htmlFor="otherServices" className="text-sm font-medium">
                        Other / Unsure / More Details
                      </label>
                      <Textarea
                        id="otherServices"
                        placeholder="If your need isn't listed or you're unsure, please describe it here..."
                        value={newProject.otherServices}
                        onChange={(e) => setNewProject(prev => ({ ...prev, otherServices: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* D. Supporting Files */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Supporting Files</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Upload Relevant Files</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.docx,.jpg,.png,.ai,.psd"
                          onChange={handleFileUpload}
                          className="w-full"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Attach existing briefs, brand guides, logos, or other relevant documents.
                          Accepted formats: PDF, DOCX, JPG, PNG, AI, PSD (Max 10MB per file)
                        </p>
                      </div>
                      {newProject.files && newProject.files.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {newProject.files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                              <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFile(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
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
