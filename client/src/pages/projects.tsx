import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@shared/schema";
import { Link } from "wouter";
import { FolderOpen, FileText, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", description: "" });
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
        status: "draft",
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setNewProject({ title: "", description: "" });
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Start a new brand or design project. You can complete the full details later.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Project Title
                    </label>
                    <Input
                      id="title"
                      placeholder="e.g., Company Rebrand, Website Design"
                      value={newProject.title}
                      onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Project Description (Optional)
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your project goals"
                      value={newProject.description}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreatingProject(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-black text-white hover:bg-gray-800" 
                    onClick={handleCreateProject}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Project"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <a className="block">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{project.title}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.status === "completed" 
                            ? "bg-green-100 text-green-800" 
                            : project.status === "in_progress" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {project.status.replace("_", " ")}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {project.description || "No description provided."}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>0 files</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-black">
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FolderOpen className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                Start by creating a new project or complete the onboarding process to define your brand identity
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-black text-white hover:bg-gray-800"
                  onClick={() => setIsCreatingProject(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Create Project
                </Button>
                <Link href="/onboarding">
                  <a className="inline-flex items-center justify-center px-4 py-2 border border-black text-black rounded-md hover:bg-gray-100 transition-colors">
                    Start Onboarding <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
