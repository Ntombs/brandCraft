import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Upload, Plus } from "lucide-react";

interface FileUploadProps {
  projectId: number;
  onFileUploaded: () => void;
  compact?: boolean;
}

export default function FileUpload({ projectId, onFileUploaded, compact = false }: FileUploadProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState({
    fileName: "",
    fileType: "",
    fileUrl: "",
    isDeliverable: false
  });

  // In a real application, this would handle actual file uploads
  // For this demo, we're just simulating by manually entering file data
  const uploadMutation = useMutation({
    mutationFn: async (data: typeof fileInfo) => {
      const res = await apiRequest("POST", `/api/projects/${projectId}/files`, {
        ...data,
        projectId
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "File uploaded",
        description: "The file has been uploaded successfully.",
      });
      setOpen(false);
      setFileInfo({
        fileName: "",
        fileType: "",
        fileUrl: "",
        isDeliverable: false
      });
      onFileUploaded();
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInfo.fileName || !fileInfo.fileType || !fileInfo.fileUrl) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    uploadMutation.mutate(fileInfo);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {compact ? (
          <Button className="bg-black text-white hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" /> Add File
          </Button>
        ) : (
          <Button className="bg-black text-white hover:bg-gray-800">
            <Upload className="h-4 w-4 mr-2" /> Upload Project File
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Project File</DialogTitle>
          <DialogDescription>
            Add files to share with the client for review or as final deliverables.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="fileName">File Name</Label>
            <Input 
              id="fileName"
              placeholder="E.g., Logo_Final_v1.pdf"
              value={fileInfo.fileName}
              onChange={(e) => setFileInfo({...fileInfo, fileName: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fileType">File Type</Label>
            <Input 
              id="fileType"
              placeholder="E.g., PDF, JPG, AI, etc."
              value={fileInfo.fileType}
              onChange={(e) => setFileInfo({...fileInfo, fileType: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fileUrl">File URL</Label>
            <Input 
              id="fileUrl"
              placeholder="Enter a URL where the file can be accessed"
              value={fileInfo.fileUrl}
              onChange={(e) => setFileInfo({...fileInfo, fileUrl: e.target.value})}
              required
            />
            <p className="text-xs text-gray-500">
              Note: In a production app, this would be an actual file upload.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="isDeliverable"
              checked={fileInfo.isDeliverable}
              onCheckedChange={(checked) => setFileInfo({...fileInfo, isDeliverable: checked})}
            />
            <Label htmlFor="isDeliverable">Mark as final deliverable</Label>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={uploadMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-black text-white hover:bg-gray-800"
              disabled={uploadMutation.isPending}
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" /> Upload
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
