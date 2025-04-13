import { Project } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileDown } from "lucide-react";

interface ProjectScopeProps {
  project: Project;
}

export default function ProjectScope({ project }: ProjectScopeProps) {
  // In a real app, the scope would be generated from the onboarding data
  // Here we'll show a sample scope based on the project data
  
  const hasScopeData = project.scope && Object.keys(project.scope).length > 0;
  
  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-playfair font-bold">Project Scope</h2>
            <p className="text-gray-500">
              This document outlines the deliverables, timeline, and specifications for your project.
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" /> Download PDF
          </Button>
        </div>
        
        {hasScopeData ? (
          <div>
            {/* Render the actual scope document based on project.scope data */}
            <div className="prose max-w-none">
              {/* This would be populated from the project.scope in a real app */}
              <p>The scope content would be displayed here.</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
            <FileDown className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium mb-2">Scope document is being prepared</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Our team is reviewing your brand discovery information and will generate a detailed project scope document soon.
            </p>
            <div className="flex justify-center">
              <div className="bg-gray-100 text-gray-600 text-sm px-3 py-2 rounded-md">
                Expected delivery: {new Date(new Date().setDate(new Date().getDate() + 3)).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-medium text-lg mb-4">Project Overview</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-sm text-gray-500">Project Title</dt>
              <dd className="font-medium">{project.title}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Status</dt>
              <dd>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  project.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : project.status === "in_progress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {project.status.replace("_", " ")}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Project Started</dt>
              <dd className="font-medium">{new Date(project.createdAt).toLocaleDateString()}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Last Updated</dt>
              <dd className="font-medium">{new Date(project.updatedAt).toLocaleDateString()}</dd>
            </div>
          </dl>
          
          {project.description && (
            <div className="mt-4">
              <h4 className="text-sm text-gray-500 mb-1">Description</h4>
              <p>{project.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
