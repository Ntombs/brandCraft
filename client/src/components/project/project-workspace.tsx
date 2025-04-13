import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Project, ProjectFile, Message } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Download, RefreshCw, FileText, MessageSquare, CheckCircle2 } from "lucide-react";
import FileUpload from "./file-upload";
import ProjectScope from "./project-scope";

interface ProjectWorkspaceProps {
  project: Project;
}

export default function ProjectWorkspace({ project }: ProjectWorkspaceProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("files");

  // Fetch project files
  const { 
    data: files, 
    isLoading: filesLoading,
    refetch: refetchFiles
  } = useQuery<ProjectFile[]>({
    queryKey: [`/api/projects/${project.id}/files`],
  });

  // Fetch project messages
  const { 
    data: messages, 
    isLoading: messagesLoading,
    refetch: refetchMessages
  } = useQuery<Message[]>({
    queryKey: [`/api/projects/${project.id}/messages`],
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await apiRequest("POST", `/api/projects/${project.id}/messages`, {
        content,
        projectId: project.id,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${project.id}/messages`] });
      setMessageText("");
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    sendMessageMutation.mutate(messageText);
  };

  // File upload successful callback
  const handleFileUploaded = () => {
    refetchFiles();
  };

  return (
    <Tabs defaultValue="files" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="files" className="flex items-center gap-2">
          <FileText className="h-4 w-4" /> Files & Deliverables
        </TabsTrigger>
        <TabsTrigger value="messages" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" /> Messages
          {messages && messages.filter(m => !m.isRead && m.senderId !== user?.id).length > 0 && (
            <span className="bg-black text-white text-xs px-1.5 py-0.5 rounded-full">
              {messages.filter(m => !m.isRead && m.senderId !== user?.id).length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="scope" className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Project Scope
        </TabsTrigger>
      </TabsList>

      <TabsContent value="files">
        <Card>
          <CardHeader>
            <CardTitle>Project Files</CardTitle>
            <CardDescription>
              Access drafts, deliverables, and other project files
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : !files || files.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-2">No files available yet</h3>
                <p className="text-gray-500 mb-6">
                  {user?.role === "admin" 
                    ? "Upload files for this project to share with the client." 
                    : "Your project files will appear here once they are ready."}
                </p>
                {user?.role === "admin" && (
                  <FileUpload 
                    projectId={project.id}
                    onFileUploaded={handleFileUploaded}
                  />
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{files.length} Files</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => refetchFiles()}
                      className="flex items-center gap-1"
                    >
                      <RefreshCw className="h-4 w-4" /> Refresh
                    </Button>
                    {user?.role === "admin" && (
                      <FileUpload 
                        projectId={project.id}
                        onFileUploaded={handleFileUploaded}
                        compact={true}
                      />
                    )}
                  </div>
                </div>
                
                <div className="border rounded-md divide-y">
                  {files.map((file) => (
                    <div key={file.id} className="p-4 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <span className="font-medium">{file.fileName}</span>
                          {file.isDeliverable && (
                            <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                              Final Deliverable
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Uploaded on {new Date(file.uploadedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        <Download className="h-4 w-4" /> Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="messages">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              Communicate with your project team
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messagesLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : !messages || messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <MessageSquare className="h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                  <p className="text-gray-500 text-center">
                    Start the conversation by sending a message to your project team.
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderId === user?.id 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">
                          {message.senderId === user?.id ? 'You' : 'Project Team'}
                        </span>
                        <span className="text-xs opacity-75">
                          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-2"
              >
                <Textarea 
                  placeholder="Type your message..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 min-h-[60px] max-h-[160px]"
                />
                <Button 
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800 h-[60px]"
                  disabled={!messageText.trim() || sendMessageMutation.isPending}
                >
                  {sendMessageMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="scope">
        <ProjectScope project={project} />
      </TabsContent>
    </Tabs>
  );
}
