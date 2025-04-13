import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@shared/schema";
import { Link } from "wouter";
import { FolderOpen, FileText, MessageSquare, Calendar } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (!user) return null;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold mb-2">Welcome, {user.firstName}!</h1>
            <p className="text-gray-600">Here's an overview of your brand journey with us.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/projects"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                View All Projects
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                <FolderOpen className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold">
                {projectsLoading ? <Skeleton className="h-8 w-16" /> : projects?.length || 0}
              </p>
              <p className="text-gray-500 text-sm">Active Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                <FileText className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold">2</p>
              <p className="text-gray-500 text-sm">Pending Reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                <MessageSquare className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold">3</p>
              <p className="text-gray-500 text-sm">Unread Messages</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                <Calendar className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold">1</p>
              <p className="text-gray-500 text-sm">Upcoming Meetings</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your latest brand and design projects</CardDescription>
          </CardHeader>
          <CardContent>
            {projectsLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : projects && projects.length > 0 ? (
              <div className="divide-y">
                {projects.slice(0, 3).map((project) => (
                  <Link 
                    key={project.id} 
                    href={`/projects/${project.id}`}
                    className="block py-4 px-2 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.status === "completed" 
                            ? "bg-green-100 text-green-800" 
                            : project.status === "in_progress" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {project.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No projects yet</p>
                <Link 
                  href="/onboarding"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                  Start Onboarding
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Getting Started Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Follow these steps to begin your brand journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Complete Brand Discovery</h3>
                  <p className="text-gray-500 text-sm">Answer key questions about your brand identity and goals</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Review Project Scope</h3>
                  <p className="text-gray-500 text-sm">We'll generate a tailored scope based on your responses</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Collaborate on Designs</h3>
                  <p className="text-gray-500 text-sm">Provide feedback on drafts and iterations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  4
                </div>
                <div>
                  <h3 className="font-medium">Receive Final Deliverables</h3>
                  <p className="text-gray-500 text-sm">Access your completed brand assets</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
