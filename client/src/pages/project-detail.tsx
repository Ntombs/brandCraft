import { useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import MainLayout from "@/components/layout/main-layout";
import ProjectWorkspace from "@/components/project/project-workspace";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Clock, Calendar } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  
  // Convert id from string to number
  const projectId = parseInt(id);
  
  // Fetch project details
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: [`/api/projects/${projectId}`],
    enabled: !isNaN(projectId),
  });
  
  // Handle invalid project ID
  useEffect(() => {
    if (isNaN(projectId)) {
      setLocation("/projects");
    }
  }, [projectId, setLocation]);
  
  // Handle loading and error states
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </MainLayout>
    );
  }
  
  if (error || !project) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 mb-6"
              onClick={() => setLocation("/projects")}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </Button>
          </div>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-xl font-medium mb-2">Project not found</h2>
              <p className="text-gray-500 mb-6">
                The project you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <Button 
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => setLocation("/projects")}
              >
                Return to Projects
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 mb-6"
            onClick={() => setLocation("/projects")}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <h1 className="font-playfair text-3xl font-bold mb-2">{project.title}</h1>
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className={`capitalize ${
                    project.status === "completed"
                      ? "text-green-600"
                      : project.status === "in_progress"
                      ? "text-blue-600"
                      : ""
                  }`}>
                    {project.status.replace("_", " ")}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            {user?.role === "admin" && (
              <div className="mt-4 md:mt-0">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Edit Project
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {project.description && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="font-medium mb-2">Project Description</h2>
              <p className="text-gray-600">{project.description}</p>
            </CardContent>
          </Card>
        )}
        
        <ProjectWorkspace project={project} />
      </div>
    </MainLayout>
  );
}
